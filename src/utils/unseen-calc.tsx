import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import { UnSeenMessageCalcProps } from './type';

dayjs.extend(durationPlugin);

const UnSeenMessageCalc = ({ date }: UnSeenMessageCalcProps) => {
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    const calculateTimeDiff = () => {
      const now = dayjs();
      const givenDate = dayjs(date, 'DD-MM-YYYY');
      const diff = now.diff(givenDate);
      const duration = dayjs.duration(diff);

      const formattedDiff = `${String(Math.floor(duration.asHours())).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;

      setTimeDiff(formattedDiff);
    };

    calculateTimeDiff();

    const interval = setInterval(calculateTimeDiff, 1000);
    return () => clearInterval(interval);
  }, [date]);

  const date1 = dayjs(date);
  const date2 = dayjs();
  const hours = date2.diff(date1, 'hours');
  const days = Math.floor(hours / 24);

  return (
    <>
      {days == 0 ? (
        <p className="rounded-sm bg-warning-500 px-2 text-label text-white">
          {timeDiff}
        </p>
      ) : days == 1 ? (
        <p className="rounded-sm bg-warning-500 px-2 text-label text-white">
          Yesterday
        </p>
      ) : (
        <p className="rounded-sm bg-warning-500 px-2 text-label text-white">
          {dayjs(date).format('MM-DD-YYYY')}
        </p>
      )}
    </>
  );
};

export default UnSeenMessageCalc;
