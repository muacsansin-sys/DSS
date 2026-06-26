const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 5173);
const ROOT = __dirname;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const CROWDFUNDING_DOMAINS = [
  "wadiz.kr",
  "www.wadiz.kr",
  "tumblbug.com",
  "www.tumblbug.com",
  "ohmycompany.com",
  "www.ohmycompany.com",
  "funding4u.co.kr",
  "www.funding4u.co.kr"
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".JPG": "image/jpeg",
  ".zip": "application/zip"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/api/status") {
      return sendJson(res, 200, {
        ok: true,
        searchReady: Boolean(OPENAI_API_KEY),
        model: OPENAI_MODEL
      });
    }

    if (req.method === "POST" && url.pathname === "/api/recommend") {
      const body = await readJson(req);
      const interest = String(body.interest || "").trim();
      if (!interest) return sendJson(res, 400, { error: "관심사를 입력하세요." });
      if (!OPENAI_API_KEY) {
        return sendJson(res, 500, {
          error: "서버에 OPENAI_API_KEY가 설정되어 있지 않습니다. run_app.ps1에서 키를 설정한 뒤 다시 실행하세요."
        });
      }
      const items = await recommendCrowdfundingItems(interest);
      return sendJson(res, 200, { items });
    }

    if (req.method === "GET" && url.pathname === "/api/image") {
      const imageUrl = url.searchParams.get("url") || "";
      return proxyImage(imageUrl, res);
    }

    if (req.method === "GET") {
      return serveStatic(url.pathname, res);
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`AI Data Startup Lab running at http://127.0.0.1:${PORT}`);
});

async function recommendCrowdfundingItems(interest) {
  const prompt = `관심사: ${interest}

학생 창업 실습용 경쟁제품 후보를 찾아라.
와디즈, 텀블벅, 오마이컴퍼니, 펀딩포유 같은 한국 크라우드펀딩 플랫폼 안의 개별 프로젝트/제품 페이지만 추천한다.
브랜드 공식몰, 자체 쇼핑몰, 네이버 스마트스토어, 쿠팡, 아마존, 언론 기사, 블로그, 유튜브, 앱스토어, 기업 홈페이지는 절대 추천하지 않는다.
해외 플랫폼(킥스타터, 인디고고, 마쿠아케, CAMPFIRE 등)은 절대 추천하지 않는다.
url은 반드시 크라우드펀딩 플랫폼의 프로젝트 상세페이지여야 한다.
검색할 때는 site:wadiz.kr, site:tumblbug.com, site:ohmycompany.com, site:funding4u.co.kr 등을 우선 사용한다.
가능하면 최근 사례를 우선하되, 프로젝트 상세페이지 URL을 확인할 수 있는 후보를 고른다.

반드시 JSON 배열만 출력한다. 후보는 정확히 5개다.
각 객체의 키:
- name: 아이템명
- platform: 플랫폼명
- category: 분야
- description: 핵심 기능과 고객 가치를 한국어 1-2문장으로 설명
- url: 크라우드펀딩 플랫폼 내부의 실제 프로젝트 상세페이지 URL
- imageUrl: 상세페이지의 대표 상품 이미지 URL. 확인이 어렵다면 빈 문자열
- searchKeyword: 학생이 다시 찾을 검색 키워드
- reason: 이 아이템이 경쟁제품 분석에 적합한 이유`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      tools: [{ type: "web_search" }],
      tool_choice: "required",
      input: [
        {
          role: "system",
          content: "You are a careful startup education research assistant. Use web search and return only valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI API request failed");
  }

  const text = extractOutputText(data);
  const items = parseItems(text).filter(isCrowdfundingProject);
  if (!items.length) {
    throw new Error("한국 크라우드펀딩 플랫폼 내부 제품을 찾지 못했습니다. 관심사를 더 구체적으로 입력해 다시 검색해주세요.");
  }
  return Promise.all(items.slice(0, 5).map(enrichProjectImage));
}

function extractOutputText(data) {
  if (data.output_text) return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) parts.push(content.text);
      if (content.text && typeof content.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n");
}

function parseItems(text) {
  const cleaned = String(text || "")
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const jsonText = extractFirstJsonArray(cleaned);
  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed)) return [];

  return parsed.map((item) => ({
    name: String(item.name || "").trim(),
    platform: String(item.platform || "").trim(),
    category: String(item.category || "").trim(),
    description: String(item.description || "").trim(),
    url: String(item.url || "").trim(),
    imageUrl: String(item.imageUrl || item.image || "").trim(),
    searchKeyword: String(item.searchKeyword || item.name || "").trim(),
    reason: String(item.reason || "").trim()
  })).filter((item) => item.name && item.url);
}

async function enrichProjectImage(item) {
  if (item.imageUrl && isAllowedImageUrl(item.imageUrl)) return item;

  try {
    const response = await fetch(item.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AI Data Startup Lab"
      }
    });
    const html = await response.text();
    const imageUrl = extractRepresentativeImage(html, item.url);
    if (imageUrl) return { ...item, imageUrl };
  } catch {
    // Some project pages block server-side fetching. The app can still make a text card.
  }

  return item;
}

function extractRepresentativeImage(html, baseUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i,
    /"image"\s*:\s*"([^"]+)"/i,
    /"imageUrl"\s*:\s*"([^"]+)"/i,
    /"thumbnail"\s*:\s*"([^"]+)"/i,
    /"thumbnailUrl"\s*:\s*"([^"]+)"/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const resolved = resolveImageCandidate(match?.[1], baseUrl);
    if (resolved) return resolved;
  }

  const imgMatches = [...html.matchAll(/<img[^>]+(?:src|data-src|data-original)=["']([^"']+)["'][^>]*>/gi)];
  for (const match of imgMatches) {
    const resolved = resolveImageCandidate(match[1], baseUrl);
    if (resolved) return resolved;
  }

  return "";
}

function isAllowedImageUrl(imageUrl) {
  try {
    const url = new URL(imageUrl);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function resolveImageCandidate(candidate, baseUrl) {
  if (!candidate) return "";
  let value = decodeHtml(String(candidate).trim());
  value = value.replace(/\\u002F/g, "/").replace(/\\\//g, "/");

  if (!value || value.startsWith("data:") || value.endsWith(".svg")) return "";

  try {
    const resolved = new URL(value, baseUrl).toString();
    if (!isAllowedImageUrl(resolved)) return "";
    if (!/\.(jpe?g|png|webp|gif)(\?|$)/i.test(resolved) && !/image|thumbnail|cdn|wadiz|tumblbug/i.test(resolved)) {
      return "";
    }
    return resolved;
  } catch {
    return "";
  }
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function isCrowdfundingProject(item) {
  try {
    const url = new URL(item.url);
    const hostname = url.hostname.toLowerCase().replace(/^m\./, "");
    return CROWDFUNDING_DOMAINS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

async function proxyImage(imageUrl, res) {
  if (!isAllowedImageUrl(imageUrl)) {
    res.writeHead(400);
    return res.end("Invalid image URL");
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AI Data Startup Lab"
      }
    });
    if (!response.ok) {
      res.writeHead(response.status);
      return res.end("Image fetch failed");
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(Buffer.from(arrayBuffer));
  } catch (error) {
    res.writeHead(500);
    res.end(error.message || "Image proxy error");
  }
}

function extractFirstJsonArray(text) {
  const start = text.indexOf("[");
  if (start === -1) {
    throw new Error("추천 결과에 JSON 배열이 없습니다.");
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i += 1) {
    const char = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
    } else if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  throw new Error("추천 결과 JSON 배열이 완성되지 않았습니다.");
}

function serveStatic(requestPath, res) {
  const safePath = decodeURIComponent(requestPath === "/" ? "/index.html" : requestPath);
  const resolved = path.resolve(ROOT, `.${safePath}`);
  if (!resolved.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(resolved, (error, data) => {
    if (error) {
      res.writeHead(404);
      return res.end("Not found");
    }
    const ext = path.extname(resolved);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(data);
  });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}
