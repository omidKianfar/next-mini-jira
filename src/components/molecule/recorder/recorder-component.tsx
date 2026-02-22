import WaveFormPlayer from './wave-form-player';
import Recorder from './recorder';
import copy from 'clipboard-copy';
import { enqueueSnackbar } from 'notistack';

// type
import { RecorderComponentProps } from '../type';

// utils
import { stringSlicer } from '@/src/utils/string-slicer';

// ui
import MyIcon from '../../atom/icon-components';

// hooks
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';

const RecorderComponent = ({ fileUploader }: RecorderComponentProps) => {
  // hooks
  const isMobile = useIsMobile();

  return (
    <div className="my-[8px] flex h-[160px] w-full items-start justify-start lg:h-full">
      {fileUploader.url ? (
        <div className="h-full w-full">
          <div className="mb-2 h-[64px] w-full rounded-sm bg-primary-100 p-2">
            <WaveFormPlayer audioUrl={fileUploader.url} />
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
                  icon="solar:copy-bold-duotone"
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
          <Recorder fileUploader={fileUploader} />
        </div>
      )}
    </div>
  );
};

export default RecorderComponent;
