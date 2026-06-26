const { isAllowedImageUrl } = require("./_crowdfunding");

module.exports = async function handler(req, res) {
  const imageUrl = String(req.query?.url || "");
  if (!isAllowedImageUrl(imageUrl)) {
    res.status(400).send("Invalid image URL");
    return;
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AI Data Startup Lab"
      }
    });
    if (!response.ok) {
      res.status(response.status).send("Image fetch failed");
      return;
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).send(error.message || "Image proxy error");
  }
};
