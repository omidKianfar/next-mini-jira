'use client';

import { DragEvent, useRef, useState } from 'react';
import FileInputField from '../../molecule/RHF-controllers-components/file-input-field';
import LoadingCircle from '../../atom/loadings/loading-circle';

interface DragDropUploaderProps {
  uploadProcessHandler: (file: File) => Promise<void>;
  progress?: number;
  uploading?: boolean;
}

const DragDropUploader = ({
  uploadProcessHandler,
  progress,
  uploading,
}: DragDropUploaderProps) => {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const openFilePicker = () => {
    fileUploadRef.current?.click();
  };

  const dropFileHandler = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    await uploadProcessHandler(file);
  };

  const inputChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    await uploadProcessHandler(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="h-full w-full rounded-lg shadow-sm">
      <FileInputField
        name="fileUrl"
        label="FileUrl"
        ref={fileUploadRef}
        disabled={!!uploading || !!progress}
        onChange={inputChangeHandler}
      />

      <div
        onDrop={dropFileHandler}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={() => setIsDragging(false)}
        className={`flex h-full w-full ${!!uploading || !!progress ? 'cursor-not-allowed' : 'cursor-pointer'} items-center justify-center rounded-md border-2 border-dashed transition-all ${
          !uploading && !progress
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-gray-50'
        } `}
        onClick={openFilePicker}
      >
        <div className="text-center text-bodySm lg:text-body">
          {uploading && !progress ? (
            <LoadingCircle size={40} />
          ) : uploading && progress ? (
            <div>
              <p className="text-subtitle font-semibold text-primary-500">
                {progress}%
              </p>

              <span className="text-bodySm text-warning-400">
                Please wait for uploading...
              </span>
            </div>
          ) : isDragging ? (
            <p className="text-gray-400">Drop file here...</p>
          ) : (
            <p className="text-wrap px-2 text-gray-400">
              Drag & Drop file here or click to upload
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropUploader;
