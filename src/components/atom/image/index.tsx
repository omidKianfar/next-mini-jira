import Image from "next/image";
import { MyImageProps } from "../type";

const MyImage = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
  wrapperClass,
  onClick
}: MyImageProps) => {
  return (
    <div className={wrapperClass}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={className}
        onClick={onClick}
      />
    </div>
  );
};

export default MyImage;
