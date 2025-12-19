"use client";

import { useState, useCallback, useRef } from "react";

// config
import { supabase } from "@/config/supabase";

// type
import { fileType, FileUploaderOptions, uploadProps } from "../type";

// upload
import { validateFile } from "./validate-file";
import { deleteFile } from "./delete-file";
import { uploadWithProgress } from "./upload-with-progress";
import { detectFileType, getFolderFromType } from "./helpers";

export function useFileUploader(options: FileUploaderOptions = {}) {
  const {
    accept = null,
    except = null,
    signedUrlExpiresIn = 60 * 60 * 24 * 7,
    maxSizeMB = 100,
  } = options;

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [realPath, setRealPath] = useState<string | null>(null);
  const [fileTypeState, setFileType] = useState<fileType | null>(null);

  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const upload = useCallback(
    async ({ file, avatar, userId }: uploadProps) => {
      setError(null);
      setProgress(0);
      setUrl(null);

      const type = detectFileType(file);
      setFileType(type);

      const validationError = validateFile(file, accept, except, maxSizeMB);
      if (validationError) {
        setError(validationError);
        return null;
      }

      if (realPath) await deleteFile({ path: realPath });

      let folder: string | fileType;
      let finalPath: string;

      if (avatar && userId) {
        folder = "avatars";

        const nameExt = file.name.split(".").pop()?.toLowerCase();
        const mimeExt = file.type.split("/").pop()?.toLowerCase();
        const ext = nameExt || mimeExt || "png";

        finalPath = `${folder}/${userId}.${ext}`;

        try {
          const { data: listData } = await supabase.storage
            .from("uploads")
            .list(folder, { limit: 100 });

          const oldAvatar = listData?.find((obj) =>
            obj.name.startsWith(userId + "."),
          );

          if (oldAvatar) {
            await deleteFile({ path: `${folder}/${oldAvatar.name}` });
          }
        } catch (listErr) {
          console.warn("Avatar cleanup failed:", listErr);
        }
      } else {
        folder = getFolderFromType(type);

        finalPath = `${folder}/${crypto.randomUUID()}-${file.name}`;
      }

      setUploading(true);

      try {
        const { data, error: signedErr } = await supabase.storage
          .from("uploads")
          .createSignedUploadUrl(finalPath);

        if (signedErr) throw signedErr;

        const rp = data.path;
        setRealPath(rp);

        await uploadWithProgress({
          signedUrl: data.signedUrl,
          file: file,
          onProgress: setProgress,
          xhrRef: xhrRef,
        });

        const { data: signedUrlData, error: urlErr } = await supabase.storage
          .from("uploads")
          .createSignedUrl(rp, signedUrlExpiresIn);

        if (urlErr) throw urlErr;

        setUrl(signedUrlData.signedUrl);
        return signedUrlData.signedUrl;
      } catch (err: any) {
        await deleteFile({ path: realPath });
        setRealPath(null);
        setError(err.message ?? "Upload failed");
        return null;
      } finally {
        setUploading(false);
        xhrRef.current = null;
      }
    },
    [accept, except, maxSizeMB, realPath, signedUrlExpiresIn],
  );

  const cancel = useCallback(async () => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setUrl(null);
    setFileType(null);

    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }

    if (realPath) {
      await deleteFile({ path: realPath });
      setRealPath(null);
    }

    setRealPath(null);
  }, [realPath]);

  const reset = useCallback(() => {
    setProgress(0);
    setUploading(false);
    setUrl(null);
    setError(null);
    setFileType(null);
    setRealPath(null);
  }, []);

  return {
    upload,
    cancel,
    reset,
    progress,
    uploading,
    url,
    error,
    fileType: fileTypeState,
    realPath,
  };
}
