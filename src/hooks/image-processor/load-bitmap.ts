export const loadBitmap = async (file: File): Promise<ImageBitmap> => {
  if (typeof createImageBitmap === "function") {
    return await createImageBitmap(file);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject();

      ctx.drawImage(img, 0, 0);

      createImageBitmap(canvas).then(resolve, reject);
    };

    img.onerror = reject;

    img.src = URL.createObjectURL(file);
  });
};
