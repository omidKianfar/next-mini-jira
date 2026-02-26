import { lazy, Suspense } from 'react';

// ui
import ButtonNext from '@/src/components/atom/buttons-component/button-next';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';
import MyImage from '@/src/components/atom/image-components';
import PageLoading from '@/src/components/common/page-loading';

// type
import { AddTaskUploadProps } from '../../../type';

// lazy
const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);
const MyVideo = lazy(() => import('@/src/components/atom/video-component'));
const DragDropUploader = lazy(
  () => import('@/src/components/organisms/uploads/drag-drop')
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
  isCompressing,
  compressionProgress,
}: AddTaskUploadProps) => {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className="h-full w-full">
        <div>
          <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
            Upload
          </h1>
        </div>

        {isCompressing ? (
          <div className="flex h-[223px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-300 bg-primary-50 lg:h-[200px]">
            <p className="mb-2 mt-2 text-label font-semibold text-warning-500">
              Optimizing Video:
              <span className="ml-1 animate-pulse text-subtitle text-primary-500">
                {compressionProgress} %
              </span>
            </p>

            <p className="text-caption text-gray-400">
              Please wait, this happens in your browser...
            </p>
          </div>
        ) : (
          !url &&
          progress! < 100 && (
            <div className="h-[200px] w-full">
              <DragDropUploader
                uploadProcessHandler={uploadProcessHandler}
                progress={progress}
                uploading={uploading}
              />
            </div>
          )
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
            {fileType! === 'image' && (
              <LightBoxComponent url={url as string}>
                <MyImage
                  src={url as string}
                  alt="preview"
                  fill
                  wrapperClass="relative cursor-pointer w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] overflow-hidden rounded-lg p-1 shadow-md border-2 border-warning-400"
                  className="object-cover"
                />
              </LightBoxComponent>
            )}

            {fileType! === 'video' && (
              <MyVideo
                src={url! as string}
                alt="preview"
                className="h-full max-h-[300px] w-full max-w-[300px] rounded-lg border-2 border-warning-400 shadow-md lg:max-h-[500px] lg:max-w-[500px]"
              />
            )}
          </div>
        )}

        <div>
          <div className="mt-4 flex items-center justify-center lg:justify-end">
            <ButtonNext
              onClick={handleCancel}
              className="mr-4"
              disable={uploading || !!!url}
            >
              Cancel
            </ButtonNext>

            <ButtonNext
              onClick={handleSave}
              className="w-[130px]"
              disable={!!!url}
            >
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
