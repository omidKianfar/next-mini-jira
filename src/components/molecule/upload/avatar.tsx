"use client";

import { useRef, useState } from "react";
import { UploadAvatarProps } from "../type";
import MyImage from "../../atom/image";
import FileInputField from "../controllers/RHF-fields/file-input-field";
import MyIcon from "../../atom/icon";
import LoadingCircle from "../../atom/loading-circle";
import AvatarCropModal from "../modals/avatar-crop";

const AvatarUpload = ({
  photo,
  uploadHandler,
  progress,
  uploading,
}: UploadAvatarProps) => {
  const photoRef = useRef<HTMLInputElement | null>(null);

  const [cropFile, setCropFile] = useState(null);

  const photoRefHandler = () => {
    photoRef.current?.click();
  };

  const onFileSelect = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCropFile(file);
  };

  const handleSave = async (file: File) => {
    setCropFile(null);

    await uploadHandler(file);

    if (photoRef.current) {
      photoRef.current.value = "";
    }
  };

  const isUploading = uploading && progress !== null && progress !== undefined;

  return (
    <div className="flex flex-col items-center justify-center">
      {cropFile && (
        <AvatarCropModal
          file={cropFile}
          onCancel={() => setCropFile(null)}
          onSave={handleSave}
        />
      )}

      <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-2 border-primary-500 bg-gray-200">
        {isUploading ? (
          progress < 100 ? (
            <p className="text-label text-primary-500">{progress}%</p>
          ) : (
            <LoadingCircle />
          )
        ) : photo ? (
          <MyImage
            src={photo}
            alt=""
            fill={true}
            className="object-cover"
            wrapperClass="relative w-full h-full"
          />
        ) : null}
      </div>

      <FileInputField
        name="photo"
        label="Photo"
        ref={photoRef}
        onChange={onFileSelect}
        accept="image/*"
      />

      <MyIcon
        icon="line-md:download"
        className="cursor-pointer text-h3 text-primary-500"
        onClick={photoRefHandler}
      />
    </div>
  );
};

export default AvatarUpload;
