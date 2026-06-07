'use client';

import { Suspense, useRef, useState } from 'react';
import FileInputField from '../RHF-controllers-components/file-input-field';
import AvatarCropModal from '../../common/avatar-crop';
import LoadingCircle from '../../atom/loadings/loading-circle';
import MyImage from '../../atom/image-components';
import MyIcon from '../../atom/icon-components';

interface UploadAvatarProps {
  photo: string | undefined;
  uploadHandler: (event: any) => void;
  uploading?: boolean;
  progress?: number;
}

const AvatarUpload = ({
  photo,
  uploadHandler,
  progress,
  uploading,
}: UploadAvatarProps) => {
  const photoRef = useRef<HTMLInputElement | null>(null);
  const [cropFile, setCropFile] = useState<File | null>(null);

  const photoRefHandler = () => {
    photoRef.current?.click();
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setCropFile(file);
  };

  const resetInput = () => {
    if (photoRef.current) {
      photoRef.current.value = '';
    }
  };

  const handleSave = async (file: File) => {
    setCropFile(null);
    await uploadHandler(file);
    resetInput();
  };

  const handleCancel = () => {
    setCropFile(null);
    resetInput();
  };

  const isUploading = uploading && progress !== null && progress !== undefined;

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <LoadingCircle size={40} />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center">
        {cropFile && (
          <AvatarCropModal
            file={cropFile}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        )}

        <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-200">
          {isUploading ? (
            progress! < 100 ? (
              <p className="text-font-semibold text-label text-primary-500">
                {progress}%
              </p>
            ) : (
              <LoadingCircle />
            )
          ) : photo ? (
            <MyImage
              src={photo}
              alt="Avatar"
              fill={true}
              className="object-cover"
              wrapperClass="relative w-full h-full"
            />
          ) : null}
        </div>

        <div className="hidden">
          <FileInputField
            name="photo"
            label="Photo"
            ref={photoRef}
            onChange={onFileSelect}
            accept="image/*"
          />
        </div>

        <MyIcon
          icon="upload"
          className="mt-4 cursor-pointer text-h3 text-primary-500"
          onClick={photoRefHandler}
        />
      </div>
    </Suspense>
  );
};

export default AvatarUpload;
