"use client";

import { lazy, Suspense, useRef, useState } from "react";

// type
import { UploadAvatarProps } from "../type";

// ui
import MyImage from "../../atom/image-components";
import FileInputField from "../RHF-controllers-components/RHF-fields/file-input-field";
import MyIcon from "../../atom/icon-components";
import LoadingCircle from "../../atom/loadings/loading-circle";
import PageLoading from "../../common/page-loading";

const AvatarCropModal = lazy(() => import("../../common/avatar-crop"));

const AvatarUpload = ({
  photo,
  uploadHandler,
  progress,
  uploading,
}: UploadAvatarProps) => {
  // ref
  const photoRef = useRef<HTMLInputElement | null>(null);

  // states
  const [cropFile, setCropFile] = useState(null);

  // functions
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

  // conditions
  const isUploading = uploading && progress !== null && progress !== undefined;

  return (
    <Suspense fallback={<PageLoading />}>
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
    </Suspense>
  );
};

export default AvatarUpload;
