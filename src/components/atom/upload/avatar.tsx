"use client";

import { UploadAvatarProps } from "../type";
import { Button, FileInputField, Icon, Image, useRef } from "../imports";

const AvatarUpload = ({ photo, uploadHandler }: UploadAvatarProps) => {
  const photoRef = useRef<HTMLInputElement | null>(null);

  const photoRefHandler = () => {
    photoRef.current?.click();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {photo ? (
        <Image
          src={photo}
          width={120}
          height={120}
          alt=""
          className="rounded-full object-cover w-[100px] h-[100px]"
        />
      ) : (
        <div className="rounded-full  w-[100px] h-[100px] bg-gray-200 border-2 border-blue-500"></div>
      )}

      <FileInputField
        name="photo"
        label="Photo"
        ref={photoRef}
        onChange={uploadHandler}
      />

      <Button
        onClick={photoRefHandler}
        icon={
          <Icon icon={"line-md:download"} className="text-4xl text-blue-500" />
        }
      ></Button>
    </div>
  );
};

export default AvatarUpload;
