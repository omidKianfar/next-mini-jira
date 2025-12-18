"use client";

import Cropper from "react-easy-crop";
import ButtonNext from "../../atom/button/button-next";
import { useImageCrop } from "@/src/hooks/image-crop";
import { CropProps } from "../type";

const AvatarCropModal = ({ file, onCancel, onSave }: CropProps) => {
  const {
    imageSrc,
    crop,
    zoom,
    setCrop,
    setZoom,
    onCropComplete,
    cropImage,
    loadImageFile,
  } = useImageCrop();

  if (file && !imageSrc) loadImageFile(file);

  const handleSave = async () => {
    const cropped = await cropImage();
    if (!cropped) return;
    onSave(cropped);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60">
      <div className="rounded-lg bg-white p-2 pb-3">
        <div className="relative h-[300px] w-[300px] rounded-lg border-4 border-gray-300 bg-black shadow-md">
          <Cropper
            image={imageSrc ?? undefined}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={false}
            style={{
              containerStyle: {
                borderRadius: "8px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              },
            }}
          />
        </div>

        <div className="mt-2 flex items-center justify-center gap-4">
          <ButtonNext onClick={onCancel} className="text-white">
            Cancel
          </ButtonNext>

          <ButtonNext className="w-[120px]" onClick={handleSave}>
            Save
          </ButtonNext>
        </div>
      </div>
    </div>
  );
};

export default AvatarCropModal;
