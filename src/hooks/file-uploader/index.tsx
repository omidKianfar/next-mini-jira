"use client";

import { supabase } from "@/config/supabase";
import { useState, useCallback, useRef } from "react";
import { fileType } from "../type";

import { detectFileType, getFolderFromType } from "./helpers";
import { validateFile } from "./validate-file";
import { deleteFile } from "./delete-file";
import { uploadWithProgress } from "./upload-with-progress";

type FileUploaderOptions = {
  accept?: string[];
  except?: string[];
  signedUrlExpiresIn?: number;
  maxSizeMB?: number;
};

export function useFileUploader(options: FileUploaderOptions = {}) {
  const {
    accept = null,
    except = null,
    signedUrlExpiresIn = 3600,
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
    async (file: File) => {
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

      if (realPath) await deleteFile(realPath);

      const folder = getFolderFromType(type);
      const finalPath = `${folder}/${crypto.randomUUID()}-${file.name}`;

      setUploading(true);

      try {
        const { data, error: signedErr } = await supabase.storage
          .from("uploads")
          .createSignedUploadUrl(finalPath);

        if (signedErr) throw signedErr;

        const rp = data.path;
        setRealPath(rp);

        await uploadWithProgress(data.signedUrl, file, setProgress, xhrRef);

        const { data: signedUrlData, error: urlErr } = await supabase.storage
          .from("uploads")
          .createSignedUrl(rp, signedUrlExpiresIn);

        if (urlErr) throw urlErr;

        setUrl(signedUrlData.signedUrl);
        return signedUrlData.signedUrl;
      } catch (err: any) {
        await deleteFile(realPath);
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
      await deleteFile(realPath);
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
