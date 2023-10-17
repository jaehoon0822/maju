import sharp from "sharp";

interface ResizeImageCreatorParams {
  content: Uint8Array | undefined;
  width: number;
}

export const resizeImageCreator = async ({
  content,
  width,
}: ResizeImageCreatorParams) => {
  try {
    return await sharp(content, { animated: true })
      .rotate()
      .resize(width)
      .webp({
        lossless: true,
        quality: 60,
        alphaQuality: 80,
        force: false,
      })
      .toBuffer();
  } catch (error) {
    console.log(error);
  }
};
