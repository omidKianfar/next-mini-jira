// components/media/MyVideo.tsx
import React from "react";
import { MyVideoProps } from "../type";

const MyVideo: React.FC<MyVideoProps> = ({
  src,
  alt,
  width = 500,
  height = 300,
  className = "",
}) => {
  return (
    <video
      src={src}
      controls
      width={width}
      height={height}
      className={`rounded-lg border object-contain ${className}`}
      onError={() => console.error("Failed to load video:", src)}
    >
      {alt && <track kind="captions" label={alt} />}
    </video>
  );
};

export default MyVideo;
