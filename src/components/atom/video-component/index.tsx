interface MyVideoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}
const MyVideo = ({
  src,
  alt,
  width = 500,
  height = 300,
  className = '',
}: MyVideoProps) => {
  return (
    <video
      src={src}
      controls
      width={width}
      height={height}
      crossOrigin="anonymous"
      onError={() => console.error('Failed to load video:', src)}
      className={`border object-contain ${className}`}
    >
      {alt && <track kind="captions" label={alt} />}
    </video>
  );
};

export default MyVideo;
