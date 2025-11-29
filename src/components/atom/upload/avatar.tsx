import { useRef } from "react";
import InputField from "../controllers/RHF-fields/input-field";
import Image from "next/image";
import { UploadAvatarProps } from "./type";

const AvatarUpload = ({ photo, uploadHandler }: UploadAvatarProps) => {
  const photoRef = useRef<HTMLInputElement | null>(null);

  const photoRefHandler = () => {
    photoRef.current?.click();
  };

  return (
    <>
      {photo && (
        <Image
          src={photo!}
          width={120}
          height={120}
          alt="Selected photo"
          className="rounded-full object-cover w-[100px] h-[100px]"
        />
      )}

      <InputField
        name="photo"
        type="file"
        label="Photo"
        placeholder="Enter your email"
        ref={photoRef}
        onChange={uploadHandler}
        className="hidden"
      />

      <button type="button" onClick={photoRefHandler}>
        Upload
      </button>
    </>
  );
};

export default AvatarUpload;
