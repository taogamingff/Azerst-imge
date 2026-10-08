import { handleUpload } from "@vercel/blob/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const result = await handleUpload({
      body,
      request: req,

      onBeforeGenerateToken: async (
        pathname,
        clientPayload
      ) => {
        const allowedContentTypes = [
          "image/png",
          "image/jpeg",
          "image/webp",
          "image/gif"
        ];

        return {
          allowedContentTypes,

          addRandomSuffix: false,

          tokenPayload: JSON.stringify({
            pathname,
            clientPayload
          })
        };
      },

      onUploadCompleted: async ({ blob }) => {
        console.log(
          "AZERST UPLOAD:",
          blob.url
        );
      }
    });

    return res.status(200).json(result);

  } catch (error) {

    console.error(
      "AZERST UPLOAD ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Upload ảnh thất bại."
    });
  }
}
