import { lazy, Suspense } from 'react';
import copy from 'clipboard-copy';
import { enqueueSnackbar } from 'notistack';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { stringSlicer } from '@/src/utils/string-slicer';
import MyIcon from '../../atom/icon-components';
import LoadingCircle from '../../atom/loadings/loading-circle';
import { FileUploaderType } from '@/src/types/global';

const WaveFormPlayer = lazy(() => import('./wave-form-player'));
const Recorder = lazy(() => import('./recorder'));

interface RecorderComponentProps {
  fileUploader: FileUploaderType;
}

const RecorderComponent = ({ fileUploader }: RecorderComponentProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="my-[8px] flex h-[160px] w-full items-start justify-start lg:h-full">
      {fileUploader.url ? (
        <div className="h-full w-full">
          <div className="mb-2 h-[64px] w-full rounded-sm bg-primary-100 p-2">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingCircle size={40} />
                </div>
              }
            >
              <WaveFormPlayer audioUrl={fileUploader.url} />
            </Suspense>
          </div>

          <div className="h-full w-full">
            <p className="mb-2 text-bodySm capitalize lg:text-body">
              <span className="mr-1 font-semibold text-primary-500">
                File Type:
              </span>

              {fileUploader.fileType}
            </p>

            <div title={fileUploader.url as string}>
              <span className="mr-1 text-bodySm font-semibold text-primary-500 lg:text-body">
                File URL
              </span>

              <div className="relative mt-1 rounded-sm border-2 border-dashed border-warning-400 bg-white p-2 pr-[32px]">
                <p className="w-full cursor-default break-all text-bodySm text-gray-500 lg:text-body">
                  {stringSlicer({
                    string: fileUploader.url as string,
                    slice: isMobile ? 20 : 100,
                  })}
                </p>

                <MyIcon
                  icon="copy"
                  className="text-primary-400"
                  iconClass="absolute right-[8px] top-[6px] text-h4 cursor-pointer"
                  onClick={() => {
                    copy(fileUploader.url as string);

                    enqueueSnackbar('Copied', { variant: 'success' });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <LoadingCircle size={40} />
              </div>
            }
          >
            <Recorder fileUploader={fileUploader} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default RecorderComponent;
