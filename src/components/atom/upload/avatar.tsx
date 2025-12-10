"use client";

import { UploadAvatarProps } from "../type";
import { FileInputField, MyIcon, MyImage, useRef } from "../imports";

const AvatarUpload = ({ photo, uploadHandler }: UploadAvatarProps) => {
  const photoRef = useRef<HTMLInputElement | null>(null);

  const photoRefHandler = () => {
    photoRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {photo ? (
        <MyImage
          src={photo}
          width={120}
          height={120}
          alt=""
          className="rounded-full object-cover"
        />
      ) : (
        <div className="h-[100px] w-[100px] rounded-full border-2 border-primary-500 bg-gray-200"></div>
      )}

      <FileInputField
        name="photo"
        label="Photo"
        ref={photoRef}
        onChange={uploadHandler}
      />

      <MyIcon
        icon="line-md:download"
        className="text-4xl text-primary-500"
        onClick={photoRefHandler}
      />
    </div>
  );
};

export default AvatarUpload;
