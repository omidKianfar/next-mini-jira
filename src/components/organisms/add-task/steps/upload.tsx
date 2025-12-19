import ButtonNext from "@/src/components/atom/button/button-next";
import { AddTaskUploadProps } from "../../type";
import LoadingCircle from "@/src/components/atom/loading-circle";
import MyImage from "@/src/components/atom/image";
import { lazy, Suspense } from "react";
import PageLoading from "../../page-loading";

const LightBoxComponent = lazy(
  () => import("@/src/components/organisms/light-box"),
);
const MyVideo = lazy(() => import("@/src/components/atom/video"));
const DragDropUploader = lazy(
  () => import("@/src/components/organisms/upload/drag-drop"),
);

const AddTaskUploadComponent = ({
  uploadProcessHandler,
  handleCancel,
  handleSave,
  progress,
  error,
  uploading,
  fileType,
  url,
}: AddTaskUploadProps) => {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className="h-full w-full">
        <div>
          <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
            Upload
          </h1>
        </div>

        {!url! && progress! < 100 && (
          <DragDropUploader
            uploadProcessHandler={uploadProcessHandler}
            progress={progress}
            uploading={uploading}
          />
        )}

        {!url! && progress! === 100 && (
          <div
            className={`flex h-[200px] w-full cursor-not-allowed items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 transition-all`}
          >
            <LoadingCircle size={40} />
          </div>
        )}

        {url && (
          <div className="mt-4 flex items-center justify-center">
            {fileType! === "image" && (
              <LightBoxComponent url={url as string}>
                <MyImage
                  src={url as string}
                  alt="preview"
                  fill
                  wrapperClass="relative cursor-pointer w-[500px] h-[500px] overflow-hidden rounded-lg p-1 shadow-md border-2 border-gray-100 p-1"
                  className="object-cover"
                />
              </LightBoxComponent>
            )}
            {fileType! === "video" && (
              <MyVideo
                src={url! as string}
                alt="preview"
                className="w-full max-w-[500px] rounded-lg border-2 border-gray-100 p-1 shadow-md"
              />
            )}
          </div>
        )}

        <div>
          <div className="mt-4 flex items-center justify-center lg:justify-end">
            <ButtonNext onClick={handleCancel} className="mr-4">
              Cancel
            </ButtonNext>

            <ButtonNext onClick={handleSave} className="w-[130px]">
              Save
            </ButtonNext>

            {error! && <p className="mt-1 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AddTaskUploadComponent;
