import { lazy } from 'react';
import copy from 'clipboard-copy';
import { enqueueSnackbar } from 'notistack';

// type
import { ShowAttachmentProps } from '../../type';

// ui
import MyImage from '@/src/components/atom/image-components';
import MyIcon from '@/src/components/atom/icon-components';

// utils
import { stringSlicer } from '@/src/utils/string-slicer';

// hooks
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';

// lazy
const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);
const MyVideo = lazy(() => import('@/src/components/atom/video-component'));

const ShowAttachment = ({ url, fileType }: ShowAttachmentProps) => {
  // hook
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full w-full flex-row items-center justify-start rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-2 lg:flex-row">
      <div className="mr-4">
        {fileType! === 'image' && (
          <LightBoxComponent url={url as string}>
            <MyImage
              src={url as string}
              alt="preview"
              fill
              wrapperClass="relative cursor-pointer w-[150px] h-[150px] lg:w-[190px] lg:h-[190px] overflow-hidden rounded-lg p-1 shadow-md border-2 border-warning-400"
              className="object-cover"
            />
          </LightBoxComponent>
        )}

        {fileType! === 'video' && (
          <MyVideo
            src={url! as string}
            alt="preview"
            className="w-[330px] rounded-lg border-2 border-warning-400 shadow-md"
          />
        )}
      </div>

      <div className="h-full w-full">
        <p className="mb-2 capitalize">
          <span className="mr-1 font-semibold text-primary-500">
            File Type:
          </span>

          {fileType}
        </p>

        <div title={url as string}>
          <span className="mr-1 font-semibold text-primary-500">File URL</span>

          <div className="relative mt-1 rounded-sm border-2 border-dashed border-warning-400 bg-white p-2 pr-[32px]">
            <p className="w-full cursor-default break-all text-gray-500">
              {stringSlicer({
                string: url as string,
                slice: isMobile ? 20 : 100,
              })}
            </p>

            <MyIcon
              icon="solar:copy-bold-duotone"
              className="text-primary-400"
              iconClass="absolute right-[8px] top-[6px] text-h4 cursor-pointer"
              onClick={() => {
                copy(url as string);

                enqueueSnackbar('Copied', { variant: 'success' });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAttachment;
