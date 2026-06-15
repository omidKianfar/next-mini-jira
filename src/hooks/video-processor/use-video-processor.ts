'use client';

import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const useVideoProcessor = () => {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionProgress, setCompressionProgress] = useState<number>(0);

  const cancelCompression = () => {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate();
      ffmpegRef.current = null;
    }

    setIsCompressing(false);
    setCompressionProgress(0);
  };

  const compressVideo = async (file: File): Promise<File> => {
    ffmpegRef.current = new FFmpeg();
    const ffmpeg = ffmpegRef.current;

    setIsCompressing(true);
    setCompressionProgress(0);

    try {
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

      ffmpeg.on('progress', ({ progress }) => {
        setCompressionProgress(Math.round(progress * 100));
      });

      await ffmpeg.writeFile('input.mp4', await fetchFile(file));

      await ffmpeg.exec([
        '-i',
        'input.mp4',
        '-vcodec',
        'libx264',
        '-crf',
        '28',
        'output.mp4',
      ]);

      const data = await ffmpeg.readFile('output.mp4');
      const compressedBlob = new Blob([new Uint8Array(data as any)], {
        type: 'video/mp4',
      });

      return new File([compressedBlob], file.name, { type: 'video/mp4' });
    } catch (err) {
      console.log('Compression was cancelled or failed:', err);
      return file;
    } finally {
      setIsCompressing(false);
      setCompressionProgress(100);
      if (ffmpegRef.current) {
        ffmpegRef.current.terminate();
        ffmpegRef.current = null;
      }
    }
  };

  return {
    compressVideo,
    cancelCompression,
    isCompressing,
    compressionProgress,
  };
};
