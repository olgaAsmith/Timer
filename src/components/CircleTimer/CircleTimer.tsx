import { FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import formatTime from '../../hooks/formatTime';

interface CircleTimer {
  /**
   * Timer total minutes
   */
  minutes: number;
  /**
   * Timer total seconds
   */
  seconds: number;
  /**
   * Initial minutes
   */
  initMinutes: number;
  /**
   * Initial seconds
   */
  initSeconds: number;
}

const CircleTimer: FC<CircleTimer> = ({
  minutes,
  seconds,
  initMinutes,
  initSeconds,
}) => {
  const initialTotalSeconds = initMinutes * 60 + initSeconds;
  const totalSeconds = minutes * 60 + seconds;

  const percentage = initialTotalSeconds
    ? ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100
    : 0;

  return (
    <CircularProgressbar
      value={percentage}
      text={formatTime({ minutes, seconds })}
      strokeWidth={2}
      styles={buildStyles({
        pathColor: `#29a354`,
        textColor: '#fff',
        trailColor: 'transparent',
        pathTransition: 'none',
        textSize: '16px',
      })}
    />
  );
};

export default CircleTimer;
