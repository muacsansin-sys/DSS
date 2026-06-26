const { OPENAI_MODEL } = require("./_crowdfunding");

module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    searchReady: Boolean(process.env.OPENAI_API_KEY),
    model: OPENAI_MODEL
  });
};
