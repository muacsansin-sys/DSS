const { fetchImageBuffer, isAllowedImageUrl } = require("./_crowdfunding");

module.exports = async function handler(req, res) {
  const imageUrl = String(req.query?.url || "");
  if (!isAllowedImageUrl(imageUrl)) {
    res.status(400).send("Invalid image URL");
    return;
  }

  try {
    const { contentType, buffer } = await fetchImageBuffer(imageUrl);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(buffer);
  } catch (error) {
    res.status(error.status || 500).send(error.message || "Image proxy error");
  }
};
