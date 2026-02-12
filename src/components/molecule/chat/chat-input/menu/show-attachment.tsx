import { lazy } from 'react';

// type
import { ShowAttachmentProps } from '../../type';

// components
import MyImage from '@/src/components/atom/image-components';

// lazy
const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);
const MyVideo = lazy(() => import('@/src/components/atom/video-component'));

const ShowAttachment = ({ url, fileType }: ShowAttachmentProps) => {
  return (
    <div className="flex h-full w-full items-center justify-start rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-2">
      <div className="mr-4">
        {fileType! === 'image' && (
          <LightBoxComponent url={url as string}>
            <MyImage
              src={url as string}
              alt="preview"
              fill
              wrapperClass="relative cursor-pointer w-[190px] h-[190px] overflow-hidden rounded-lg p-1 shadow-md border-2 border-warning-400"
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
        <p className="mb-1">
          <span className="mr-1 font-semibold text-primary-500">
            File Type:
          </span>
          {fileType}
        </p>

        <div>
          <span className="mr-1 font-semibold text-primary-500">File URL</span>

          <p className="mt-1 w-full break-all rounded-sm border-2 border-dashed border-warning-400 bg-white p-2 text-primary-400">
            {url}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowAttachment;
