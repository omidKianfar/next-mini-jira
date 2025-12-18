import { useCallback } from "react";
import { useImageProcessorProps } from "../type";
import { loadBitmap } from "./load-bitmap";
import { drawProportional } from "./draw-proportional";
import { compress } from "./compress";

export const useImageProcessor = ({ size }: useImageProcessorProps = {}) => {
  const processImage = useCallback(
    async (file: File): Promise<File> => {
      if (!file.type.startsWith("image/")) return file;

      const bitmap = await loadBitmap(file);

      const targetSize = size ?? Math.max(bitmap.width, bitmap.height);

      const canvas = drawProportional({
        img: bitmap,
        size: targetSize,
      });

      const format: "image/jpeg" | "image/webp" =
        targetSize <= 400 ? "image/jpeg" : "image/webp";

      const blob = await compress(canvas, format, 0.9);

      return new File([blob], file.name, { type: format });
    },
    [size],
  );

  return { processImage };
};
