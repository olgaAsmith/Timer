import { FC, useState } from 'react';
import { useDrag } from '@use-gesture/react';
import './AddTimer.scss';
import Button from '../../components/Button/Button';
import { TimerType } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

interface AddTimer {
  /**
   * Array of timers
   */
  timerList: TimerType[];
  /**
   * Function adds timer
   */
  addTimerElement: (timer: TimerType) => void;
}

const AddTimer: FC<AddTimer> = (props) => {
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const timerLength = 61;
  const numbers = Array.from({ length: timerLength }, (_, i) => i);

  const handleNextMinutes = () => {
    setCurrentMinutes((prevMinutes) => {
      if (prevMinutes === 0) return prevMinutes;
      return prevMinutes - 1;
    });
  };

  const handlePrevMinutes = () => {
    setCurrentMinutes((prevMinutes) => {
      if (prevMinutes === timerLength - 1) return prevMinutes;
      return prevMinutes + 1;
    });
  };

  const handleNextSeconds = () => {
    setCurrentSeconds((prevSeconds) => {
      if (prevSeconds === 0) return prevSeconds;
      return prevSeconds - 1;
    });
  };

  const handlePrevSeconds = () => {
    setCurrentSeconds((prevSeconds) => {
      if (prevSeconds === timerLength - 1) return prevSeconds;
      return prevSeconds + 1;
    });
  };

  const bindMinutes = useDrag(
    ({ movement: [, my], memo }) => {
      if (!memo) memo = my;
      if (my - memo > 10) {
        handleNextMinutes();
        memo = my;
      } else if (my - memo < -10) {
        handlePrevMinutes();
        memo = my;
      }
      return memo;
    },
    {
      axis: 'y',
      filterTaps: true,
      threshold: 10,
    }
  );

  const bindSeconds = useDrag(
    ({ movement: [, my], memo }) => {
      if (!memo) memo = my;
      if (my - memo > 10) {
        handleNextSeconds();
        memo = my;
      } else if (my - memo < -10) {
        handlePrevSeconds();
        memo = my;
      }
      return memo;
    },
    {
      axis: 'y',
      filterTaps: true,
      threshold: 10,
    }
  );

  const prevMinutes = currentMinutes === 0 ? '' : currentMinutes - 1;

  const nextMinutes =
    currentMinutes === numbers.length - 1
      ? ''
      : (currentMinutes + 1) % numbers.length;

  const prevSeconds = currentSeconds === 0 ? '' : currentSeconds - 1;

  const nextSeconds =
    currentSeconds === numbers.length - 1
      ? ''
      : (currentSeconds + 1) % numbers.length;

  const handleAddTimer = () => {
    if (!currentMinutes && !currentSeconds) {
      alert('Выберите хотя бы 1 секунду');
      return;
    } else {
      props.addTimerElement({
        id: uuidv4(),
        minutes: currentMinutes,
        seconds: currentSeconds,
        isPlaying: true,
        initMinutes: currentMinutes,
        initSeconds: currentSeconds,
      });
    }
  };

  return (
    <div className='container'>
      <section className='add'>
        <h2 className='add__title'>Таймер</h2>
        <div className='add__timer'>
          <div className='add__minutes-block'>
            <div className='add__minutes-container' {...bindMinutes()}>
              <div className='add__minutes add__minutes--prev'>
                {prevMinutes}
              </div>
              <div className='add__minutes add__minutes--current'>
                {currentMinutes}
              </div>
              <div className='add__minutes add__minutes--next'>
                {nextMinutes}
              </div>
            </div>
            <span className='add__minutes-span'>мин</span>
          </div>
          <div className='add__minutes-block add__minutes-block--seconds'>
            <div className='add__minutes-container' {...bindSeconds()}>
              <div className='add__minutes add__minutes--prev'>
                {prevSeconds}
              </div>
              <div className='add__minutes add__minutes--current'>
                {currentSeconds}
              </div>
              <div className='add__minutes add__minutes--next'>
                {nextSeconds}
              </div>
            </div>
            <span className='add__minutes-span'>сек</span>
          </div>
        </div>
        <div className='add__button'>
          <Button
            buttonType='colored'
            color='green'
            onClick={() => handleAddTimer()}
          >
            Старт
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AddTimer;
