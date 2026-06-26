const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";

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

async function recommendCrowdfundingItems(interest, apiKey) {
  const prompt = buildRecommendationPrompt(interest);
  const data = await requestOpenAI(prompt, apiKey);
  const text = extractOutputText(data);

  let items;
  try {
    items = parseItems(text).filter(isCrowdfundingProject);
  } catch (error) {
    throw new Error(
      `추천 결과를 정리하는 중 문제가 생겼습니다. 관심사를 조금 더 구체적으로 입력해 다시 검색해 주세요. (${error.message})`
    );
  }

  if (!items.length) {
    throw new Error("국내 크라우드펀딩 상세 페이지 후보를 찾지 못했습니다. 관심사를 더 구체적으로 입력해 다시 검색해 주세요.");
  }

  const enriched = await Promise.all(items.map(validateAndEnrichProject));
  const validItems = enriched.filter(Boolean);
  if (!validItems.length) {
    throw new Error("실제로 열리는 국내 크라우드펀딩 상세 페이지를 확인하지 못했습니다. 관심사를 더 구체적으로 입력해 다시 검색해 주세요.");
  }
  return validItems.slice(0, 5);
}

function buildRecommendationPrompt(interest) {
  return `
관심사: ${interest}

학생 창업 실습에서 경쟁 제품으로 분석할 국내 크라우드펀딩 제품/프로젝트 후보 5개를 찾아 주세요.

검색 범위:
- 반드시 국내 크라우드펀딩 플랫폼의 개별 제품/프로젝트 상세 페이지여야 합니다.
- 허용 플랫폼: 와디즈(wadiz.kr), 텀블벅(tumblbug.com), 오마이컴퍼니(ohmycompany.com), 펀딩포유(funding4u.co.kr)
- 브랜드 자사몰, 네이버 스마트스토어, 쿠팡, 아마존, 일반 기사, 블로그, 유튜브, 기업 홈페이지는 제외합니다.
- 해외 플랫폼(Indiegogo, Kickstarter, Makuake, CAMPFIRE 등)은 제외합니다.
- 가능하면 최근 또는 성공적으로 펀딩된 사례를 우선합니다.

반환 규칙:
- 설명은 짧게 작성합니다.
- 반드시 완성된 JSON 배열만 반환합니다.
- 마크다운 코드블록, 해설, 주석, 출처 목록은 쓰지 않습니다.
- JSON 배열에는 정확히 5개 후보를 넣습니다.
- URL은 실제로 접속 가능한 프로젝트 상세 페이지여야 합니다.
- 절대 URL을 추측하거나 만들지 마세요.
- 12345, 67890, example, sample, placeholder 같은 예시형 URL은 절대 쓰지 마세요.

각 객체에는 다음 키를 포함합니다:
- name: 아이템명
- platform: 플랫폼명
- category: 분야
- description: 핵심 기능과 고객 가치를 1문장으로 설명
- url: 실제 크라우드펀딩 개별 프로젝트 상세 페이지 URL
- imageUrl: 대표 상품 이미지 URL. 확인이 어려우면 빈 문자열
- searchKeyword: 학생이 다시 확인할 검색어
- reason: 경쟁 제품 분석에 적합한 이유 1문장
`.trim();
}

async function requestOpenAI(prompt, apiKey) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      tools: [{
        type: "web_search",
        search_context_size: "low",
        filters: {
          allowed_domains: ["wadiz.kr", "tumblbug.com", "ohmycompany.com", "funding4u.co.kr"]
        }
      }],
      tool_choice: "required",
      input: [
        {
          role: "system",
          content: "You are a careful startup education research assistant. Use web search results only. Never invent project names or URLs."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "crowdfunding_recommendations",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["items"],
            properties: {
              items: {
                type: "array",
                minItems: 5,
                maxItems: 5,
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["name", "platform", "category", "description", "url", "imageUrl", "searchKeyword", "reason"],
                  properties: {
                    name: { type: "string" },
                    platform: { type: "string" },
                    category: { type: "string" },
                    description: { type: "string" },
                    url: { type: "string" },
                    imageUrl: { type: "string" },
                    searchKeyword: { type: "string" },
                    reason: { type: "string" }
                  }
                }
              }
            }
          }
        }
      },
      temperature: 0.1,
      max_output_tokens: 4096
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(formatOpenAIError(data));
  }
  return data;
}

function formatOpenAIError(data) {
  const code = data.error?.code || data.error?.type || "";
  const message = data.error?.message || "OpenAI API 요청에 실패했습니다.";

  if (/quota|billing|credit|insufficient/i.test(`${code} ${message}`)) {
    return "OpenAI API 결제/크레딧 한도 문제로 검색하지 못했습니다. Billing과 Usage limit을 확인해 주세요.";
  }
  if (/rate/i.test(`${code} ${message}`)) {
    return "OpenAI API 요청이 잠시 많아 검색하지 못했습니다. 잠시 뒤 다시 시도해 주세요.";
  }
  if (/key|auth|permission/i.test(`${code} ${message}`)) {
    return "OpenAI API 키 인증에 실패했습니다. Vercel 환경변수 OPENAI_API_KEY를 확인해 주세요.";
  }
  return message;
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

  const jsonText = extractFirstJsonValue(cleaned);
  const parsed = JSON.parse(jsonText);
  const list = Array.isArray(parsed) ? parsed : parsed.items;
  if (!Array.isArray(list)) return [];

  return list.map((item) => ({
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

function extractFirstJsonValue(text) {
  const arrayStart = text.indexOf("[");
  const objectStart = text.indexOf("{");
  const starts = [arrayStart, objectStart].filter((index) => index >= 0);
  if (!starts.length) throw new Error("JSON 값을 찾지 못했습니다.");

  const start = Math.min(...starts);
  const openChar = text[start];
  const closeChar = openChar === "[" ? "]" : "}";

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i += 1) {
    const char = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      continue;
    }
    if (char === "\"") inString = true;
    else if (char === openChar) depth += 1;
    else if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }

  throw new Error("JSON 값이 끝까지 완성되지 않았습니다.");
}

async function validateAndEnrichProject(item) {
  if (looksLikePlaceholderUrl(item.url)) return null;

  try {
    const response = await fetch(item.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AI Data Startup Lab"
      }
    });
    if (!response.ok) return null;

    const html = await response.text();
    if (!html || html.length < 500) return null;

    if (item.imageUrl && isAllowedImageUrl(item.imageUrl)) return item;
    const imageUrl = extractRepresentativeImage(html, item.url);
    if (imageUrl) return { ...item, imageUrl };
    return item;
  } catch {
    return null;
  }
}

function looksLikePlaceholderUrl(value) {
  const url = String(value || "").toLowerCase();
  if (!url) return true;
  if (/example|sample|placeholder|test/.test(url)) return true;
  if (/(12345|67890|112233|445566|778899)/.test(url)) return true;
  return false;
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

function isCrowdfundingProject(item) {
  try {
    const url = new URL(item.url);
    const hostname = url.hostname.toLowerCase().replace(/^m\./, "");
    return CROWDFUNDING_DOMAINS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
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

module.exports = {
  CROWDFUNDING_DOMAINS,
  OPENAI_MODEL,
  isAllowedImageUrl,
  recommendCrowdfundingItems
};
