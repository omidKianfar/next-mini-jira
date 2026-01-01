"use client";

import { useState, useCallback } from "react";

export const useImageCrop = () => {
  // states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState<any>(null);

  // functions
  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedPixels(croppedAreaPixels);
  }, []);

  const loadImageFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const closeCrop = () => {
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedPixels(null);
  };

  const cropImage = async (): Promise<File | null> => {
    if (!imageSrc || !croppedPixels) return null;

    const image = await new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => resolve(img);
    });

    const canvas = document.createElement("canvas");

    canvas.width = croppedPixels.width;
    canvas.height = croppedPixels.height;

    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(
      image,
      croppedPixels.x,
      croppedPixels.y,
      croppedPixels.width,
      croppedPixels.height,
      0,
      0,
      croppedPixels.width,
      croppedPixels.height,
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(new File([blob!], "avatar.png", { type: "image/png" }));
      }, "image/png");
    });
  };

  return {
    imageSrc,
    crop,
    zoom,
    setCrop,
    setZoom,
    onCropComplete,
    loadImageFile,
    cropImage,
    closeCrop,
  };
};
