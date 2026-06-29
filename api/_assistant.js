const ASSIST_MODEL = process.env.OPENAI_ASSIST_MODEL || process.env.OPENAI_MODEL || "gpt-4.1-mini";

async function generateFieldAdvice({ label, value, sessionTitle }, apiKey) {
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  let response;
  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: ASSIST_MODEL,
        input: [
          {
            role: "system",
            content: "You are a Korean startup education writing coach. Give concise, practical guidance. Do not complete the student's work; help them improve it."
          },
          {
            role: "user",
            content: [
              `차시: ${sessionTitle || "미정"}`,
              `항목: ${label || "미정"}`,
              `현재 작성 내용: ${value || "(비어 있음)"}`,
              "",
              "학생이 직접 고칠 수 있도록 다음 JSON만 반환하세요.",
              '{"title":"...","body":"...","items":["...","...","..."]}'
            ].join("\n")
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "field_advice",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["title", "body", "items"],
              properties: {
                title: { type: "string" },
                body: { type: "string" },
                items: {
                  type: "array",
                  minItems: 3,
                  maxItems: 5,
                  items: { type: "string" }
                }
              }
            }
          }
        },
        temperature: 0.2,
        max_output_tokens: 800
      })
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("AI 조언 응답 시간이 길어 중단했습니다.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "AI 조언 요청에 실패했습니다.");
  }

  const text = extractOutputText(data);
  return JSON.parse(extractFirstJsonValue(text));
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

function extractFirstJsonValue(text) {
  const objectStart = String(text || "").indexOf("{");
  if (objectStart < 0) throw new Error("AI 조언 결과를 읽지 못했습니다.");

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = objectStart; i < text.length; i += 1) {
    const char = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      continue;
    }
    if (char === "\"") inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return text.slice(objectStart, i + 1);
    }
  }
  throw new Error("AI 조언 JSON이 완성되지 않았습니다.");
}

module.exports = {
  ASSIST_MODEL,
  generateFieldAdvice
};
