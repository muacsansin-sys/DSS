const http = require("http");
const fs = require("fs");
const path = require("path");
const { OPENAI_MODEL, isAllowedImageUrl, recommendCrowdfundingItems } = require("./api/_crowdfunding");

const PORT = Number(process.env.PORT || 5173);
const ROOT = __dirname;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

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
      const items = await recommendCrowdfundingItems(interest, OPENAI_API_KEY);
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
