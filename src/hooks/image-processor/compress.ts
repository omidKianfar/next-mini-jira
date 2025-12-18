export const compress = async (
  canvas: HTMLCanvasElement,
  format: "image/jpeg" | "image/webp",
  quality = 0.9,
): Promise<Blob> => {
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), format, quality),
  );
};
