import { DragEvent, useRef, useState } from "react";
import FileInputField from "../controllers/RHF-fields/file-input-field";
import { AddTaskUploadProps } from "../../organisms/type";
import LoadingCircle from "../../atom/loading-circle";

const DragDropUploader = ({
  uploadProcessHandler,
  progress,
  uploading,
}: Pick<
  AddTaskUploadProps,
  "uploadProcessHandler" | "progress" | "uploading"
>) => {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileUploadRef.current?.click();
  };

  const [isDragging, setIsDragging] = useState(false);

  const dropFileHandler = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await uploadProcessHandler(file);
  };

  const inputChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
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
    <div className="rounded-lg shadow-md">
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
        className={`flex h-[200px] w-full ${!!uploading || !!progress ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center rounded-lg border-2 border-dashed transition-all ${
          !uploading && !progress
            ? "border-primary-500 bg-primary-50"
            : "border-zinc-300 bg-zinc-50"
        } `}
        onClick={openFilePicker}
      >
        <div className="text-center text-bodySm lg:text-body">
          {uploading && !progress ? (
            <LoadingCircle size={40} />
          ) : uploading && progress ? (
            <p className="text-primary-500">{progress}%</p>
          ) : isDragging ? (
            <p className="text-gray-500">Drop file here...</p>
          ) : (
            <p className="text-gray-500">
              Drag & Drop file here or click to upload
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropUploader;
