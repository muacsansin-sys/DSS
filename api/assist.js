const { generateFieldAdvice } = require("./_assistant");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) {
    res.status(500).json({ error: "Vercel 환경변수 OPENAI_API_KEY가 설정되어 있지 않습니다." });
    return;
  }

  try {
    const advice = await generateFieldAdvice({
      label: String(req.body?.label || ""),
      value: String(req.body?.value || ""),
      sessionTitle: String(req.body?.sessionTitle || "")
    }, apiKey);
    res.status(200).json(advice);
  } catch (error) {
    res.status(500).json({ error: error.message || "AI 조언 요청에 실패했습니다." });
  }
};
