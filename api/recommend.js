const { recommendCrowdfundingItems } = require("./_crowdfunding");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const interest = String(req.body?.interest || "").trim();
  if (!interest) {
    res.status(400).json({ error: "관심사를 입력하세요." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) {
    res.status(500).json({ error: "Vercel 환경변수 OPENAI_API_KEY가 설정되어 있지 않습니다." });
    return;
  }

  try {
    const items = await recommendCrowdfundingItems(interest, apiKey);
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message || "검색에 실패했습니다." });
  }
};
