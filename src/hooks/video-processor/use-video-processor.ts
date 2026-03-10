import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const useVideoProcessor = () => {
  const ffmpegRef = useRef(new FFmpeg());

  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const compressVideo = async (file: File): Promise<File> => {
    const ffmpeg = ffmpegRef.current;

    setIsCompressing(true);
    setCompressionProgress(0);

    try {
      if (!ffmpeg.loaded) {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            'text/javascript'
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            'application/wasm'
          ),
        });
      }

      ffmpeg.on('log', ({ message }) => {
        console.log('FFmpeg Log:', message);
      });

      ffmpeg.on('progress', ({ progress }) => {
        setCompressionProgress(Math.round(progress * 100));
      });

      const inputName = 'input.mp4';
      const outputName = 'output.mp4';

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      await ffmpeg.exec([
        '-i',
        inputName,
        '-vcodec',
        'libx264',
        '-crf',
        '28',
        outputName,
      ]);

      const data = await ffmpeg.readFile(outputName);

      const compressedBlob = new Blob([data], { type: 'video/mp4' });

      return new File([compressedBlob], file.name, { type: 'video/mp4' });
    } catch (err) {
      return file;
    } finally {
      setIsCompressing(false);
      setCompressionProgress(100);
    }
  };

  return { compressVideo, isCompressing, compressionProgress };
};
