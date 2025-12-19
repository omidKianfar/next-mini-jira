// type
import { fileType } from "../type";

export const detectFileType = (file: File): fileType =>
  file.type.startsWith("image/")
    ? "image"
    : file.type.startsWith("video/")
      ? "video"
      : file.type.startsWith("audio/")
        ? "voice"
        : "file";

export const getFolderFromType = (type: fileType) =>
  type === "image"
    ? "images"
    : type === "video"
      ? "videos"
      : type === "voice"
        ? "voices"
        : "files";
