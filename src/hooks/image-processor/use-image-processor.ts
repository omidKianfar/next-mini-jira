import { useCallback } from "react";

// ./image-processor
import { loadBitmap } from "./load-bitmap";
import { drawProportional } from "./draw-proportional";
import { compress } from "./compress";

// type
import { useImageProcessorProps } from "../type";

export const useImageProcessor = ({ size }: useImageProcessorProps = {}) => {
  const processImage = useCallback(
    async (file: File): Promise<File> => {
      if (!file.type.startsWith("image/")) return file;

      // dow image for resize scale
      const bitmap = await loadBitmap(file);

      const targetSize = size ?? Math.max(bitmap.width, bitmap.height);

      const canvas = drawProportional({
        img: bitmap,
        size: targetSize,
      });

      // image type
      const format: "image/jpeg" | "image/webp" =
        targetSize <= 400 ? "image/jpeg" : "image/webp";
        
      // compress
      const blob = await compress(canvas, format, 0.9);

      return new File([blob], file.name, { type: format });
    },
    [size],
  );

  return { processImage };
};
