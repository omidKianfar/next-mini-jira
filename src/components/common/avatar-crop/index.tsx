'use client';

import Cropper from 'react-easy-crop';
import { useImageCrop } from '@/src/hooks/image-crop/use-image-crop';
import ButtonNext from '../../atom/buttons-component/button-next';
import ButtonFreeClass from '../../atom/buttons-component/button-free-class';

interface CropProps {
  file: File;
  onCancel: () => void;
  onSave: (file: File) => void | Promise<void>;
}

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
        <div className="relative mb-4 h-[300px] w-[300px] rounded-lg border-4 border-gray-300 bg-black shadow-md lg:h-[400px] lg:w-[400px]">
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
                borderRadius: '8px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              },
            }}
          />
        </div>

        <div className="flex flex-wrap-reverse items-center justify-end gap-3 lg:justify-center lg:gap-8">
          <ButtonFreeClass
            onClick={onCancel}
            className="w-full rounded-sm border border-gray-200 bg-white py-2 text-label font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-50 lg:w-[120px]"
          >
            Cancel
          </ButtonFreeClass>

          <ButtonFreeClass
            className={`hover:text-warning-500' w-full rounded-sm border border-warning-500 bg-warning-500 py-2 text-label font-semibold text-white shadow-sm transition-all duration-200 hover:bg-white hover:text-warning-500 lg:w-[120px]`}
            onClick={handleSave}
          >
            Save
          </ButtonFreeClass>
        </div>
      </div>
    </div>
  );
};

export default AvatarCropModal;
