// type
import { uploadWithProgressProps } from "../type";

export function uploadWithProgress({
  signedUrl,
  file,
  onProgress,
  xhrRef,
}: uploadWithProgressProps): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhrRef.current = xhr;

    let abortedByUser = false;

    // count upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);

        onProgress(percent);
      }
    };

    // set status
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);

        resolve();
      } else {
        reject(new Error("Upload failed"));
      }
    };

    // error
    xhr.onabort = () => {
      abortedByUser = true;

      resolve();
    };

    xhr.onerror = () => {
      if (abortedByUser || xhr.status === 0) {
        return resolve();
      }

      reject(new Error("Network error during upload"));
    };

    xhr.open("PUT", signedUrl);

    xhr.setRequestHeader("Content-Type", file.type);

    xhr.send(file);
  });
}
