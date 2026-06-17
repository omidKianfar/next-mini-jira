'use client';

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import ButtonFreeClass from '../../atom/buttons-component/button-free-class';
import MyIcon from '../../atom/icon-components';

interface WaveformPlayerProps {
  audioUrl: string | null;
}

const WaveformPlayer = ({ audioUrl }: WaveformPlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [stopRecorder, setStopRecorder] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [duration, setDuration] = useState<string>('00:00');

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!containerRef.current || wavesurferRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#fff',
      progressColor: '#3b82f6 ',
      cursorColor: '#3b82f6 ',
      height: 64,
    });

    wavesurferRef.current.on('ready', () => {
      if (wavesurferRef.current) {
        setDuration(formatTime(wavesurferRef.current.getDuration()));
      }
    });

    wavesurferRef.current.on('audioprocess', () => {
      if (wavesurferRef.current) {
        setCurrentTime(formatTime(wavesurferRef.current.getCurrentTime()));
      }
    });

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioUrl && wavesurferRef.current) {
      wavesurferRef.current.load(audioUrl).catch(() => {});
    }
  }, [audioUrl]);

  const playPause = (): void => {
    setStopRecorder(!stopRecorder);
    wavesurferRef.current?.playPause();
  };

  return (
    <div className="relative z-0 flex h-full w-full items-center">
      <div className="flex w-[50px] items-center">
        {audioUrl && (
          <ButtonFreeClass
            onClick={playPause}
            icon={
              stopRecorder ? (
                <MyIcon
                  icon="pause"
                  className="text-h4 text-primary-500 hover:text-warning-500"
                />
              ) : (
                <MyIcon
                  icon="play"
                  className="text-h4 text-primary-500 hover:text-warning-500"
                />
              )
            }
          />
        )}
      </div>

      <div className="w-full">
        <div ref={containerRef}></div>

        <div className="absolute bottom-[-14px] right-0 flex w-full justify-between px-1 text-caption font-semibold">
          <span className="flex items-center justify-center rounded-sm border border-gray-200 bg-white px-1 shadow-sm">
            {duration}
          </span>

          <span className="flex items-center justify-center rounded-sm border-gray-200 bg-warning-400 px-1 shadow-sm">
            {currentTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WaveformPlayer;
