'use client';

import RecordRTC from 'recordrtc';
import {
  ButtonFreeClass,
  MyIcon,
  useEffect,
  useRef,
  useState,
} from '../imports';
import { RecorderProps } from '../type';

const Recorder = ({ fileUploader }: RecorderProps) => {
  const recorderRef = useRef<RecordRTC | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [recording, setRecording] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const startRecording = async (): Promise<void> => {
    if (typeof window === 'undefined' || !navigator.mediaDevices) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: (RecordRTC as any).StereoAudioRecorder,
        numberOfAudioChannels: 1,
      });

      recorder.startRecording();

      recorderRef.current = recorder;

      setTime(0);
      setDuration(0);
      setRecording(true);

      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {}
  };

  const stopRecording = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setDuration(time);

    if (recorderRef.current) {
      recorderRef.current.stopRecording(async () => {
        const blob = recorderRef.current!.getBlob();

        const file = new File([blob], 'voice-recording.wav', {
          type: 'audio/wav',
        });

        try {
          await fileUploader.upload({ file: file });
        } catch (error) {}

        setRecording(false);
        setTime(0);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[300px] items-center justify-center">
        {!recording ? (
          <ButtonFreeClass
            onClick={startRecording}
            isLoading={fileUploader?.uploading}
            disable={fileUploader?.uploading}
            className="text-subtitle font-semibold"
            icon={
              <MyIcon icon="microphone" className="text-h1 text-error-500" />
            }
          >
            <MyIcon icon="record" />
            Start Record
          </ButtonFreeClass>
        ) : (
          <div>
            <ButtonFreeClass
              isLoading={fileUploader?.uploading}
              disable={fileUploader?.uploading}
              onClick={stopRecording}
              className="text-subtitle font-semibold"
              icon={<MyIcon icon="stop" className="text-h1 text-error-500" />}
            >
              Stop Record
            </ButtonFreeClass>

            <div className="flex items-center justify-center p-2 text-title font-semibold text-warning-500">
              {formatTime(time > 0 ? time : duration)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recorder;
