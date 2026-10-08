import { head } from "@vercel/blob";

export default async function handler(req, res) {

  try {

    const name =
      new URL(
        req.url,
        `https://${req.headers.host}`
      ).searchParams.get("name");

    if (!name) {
      return res
        .status(400)
        .send("Missing image name");
    }

    const valid =
      /^[a-z0-9]{6}\.(png|jpg|jpeg|webp|gif)$/i.test(
        name
      );

    if (!valid) {
      return res
        .status(400)
        .send("Invalid image name");
    }

    const blob = await head(name);

    if (!blob?.url) {
      return res
        .status(404)
        .send("Image not found");
    }

    res.setHeader(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );

    return res.redirect(
      302,
      blob.url
    );

  } catch (error) {

    console.error(
      "AZERST IMAGE ERROR:",
      error
    );

    return res
      .status(404)
      .send("Image not found");
  }
}
