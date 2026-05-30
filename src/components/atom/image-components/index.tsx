import Image from 'next/image';
interface MyImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  wrapperClass?: string;
  onClick?: () => void;
}

const MyImage = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
  wrapperClass,
  onClick,
}: MyImageProps) => {
  return (
    <div className={wrapperClass}>
      <Image
        src={src}
        alt={alt || ''}
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
