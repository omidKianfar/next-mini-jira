import {
  copy,
  enqueueSnackbar,
  LightBoxComponent,
  MyIcon,
  MyImage,
  MyVideo,
  stringSlicer,
  useIsMobile,
} from '../../../imports';
import { ShowAttachmentProps } from '../../type';

const ShowAttachment = ({ url, fileType }: ShowAttachmentProps) => {
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
        <p className="mb-2 text-bodySm capitalize lg:text-body">
          <span className="mr-1 font-semibold text-primary-500">
            File Type:
          </span>

          {fileType}
        </p>

        <div title={url as string}>
          <span className="mr-1 text-bodySm font-semibold text-primary-500 lg:text-body">
            File URL
          </span>

          <div className="relative mt-1 rounded-sm border-2 border-dashed border-warning-400 bg-white p-2 pr-[32px]">
            <p className="w-full cursor-default break-all text-bodySm text-gray-500 lg:text-body">
              {stringSlicer({
                string: url as string,
                slice: isMobile ? 20 : 100,
              })}
            </p>

            <MyIcon
              icon="copy"
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
