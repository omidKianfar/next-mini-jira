import Image from "next/image";
import { MyImageProps } from "../type";

const MyImage = ({
  src,
  alt,
  width,
  height,
  className,
  wrapperClass,
}: MyImageProps) => {
  return (
    <div className={wrapperClass}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </div>
  );
};

export default MyImage;
