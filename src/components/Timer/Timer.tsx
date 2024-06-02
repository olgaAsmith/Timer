import { FC } from 'react';
import Button from '../Button/Button';
import './Timer.scss';
import formatTime from '../../hooks/formatTime';
import { useNavigate } from 'react-router-dom';
import { TimerType } from '../../types/types';

interface TimerProps {
  /**
   * Array of timers
   */
  timerList: TimerType[];
  /**
   * Function set new list of timers
   */
  setNewTimerList: (list: TimerType[]) => void;
  /**
   * Timer modification status
   */
  isMode: boolean;
  /**
   * Function starts or pause timer
   */
  handlePlay: (id: string) => void;
}

const Timer: FC<TimerProps> = (props) => {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    const newList = props.timerList.filter((timer) => timer.id !== id);
    props.setNewTimerList(newList);
  };

  const handleArrowClick = (id: string) => {
    navigate(`/view/${id}`);
  };

  return (
    <section className='timer'>
      <h1 className='timer__title'>Таймеры</h1>
      {props.timerList.map((timer) => (
        <div key={timer.id} className='timer__element'>
          <div className='timer__time'>
            <div
              className={`timer__delete-block ${
                props.isMode ? 'timer__delete-block--visible' : ''
              }`}
            >
              <Button
                buttonType='transparent'
                onClick={() => handleDelete(timer.id)}
              >
                <div className='timer__delete'></div>
              </Button>
            </div>
            <div>
              <p className='timer__clock'>{formatTime(timer)}</p>
              <span className='timer__description'>
                {timer.minutes ? `${timer.minutes} мин ` : ''}
                {timer.seconds ? `${timer.seconds} сек ` : ''}
              </span>
            </div>
          </div>
          {props.isMode ? (
            <Button
              buttonType='transparent'
              onClick={() => handleArrowClick(timer.id)}
            >
              <div className='timer__control timer__control--forward'></div>
            </Button>
          ) : (
            <Button
              buttonType='transparent'
              onClick={() => props.handlePlay(timer.id)}
            >
              <div
                className={`timer__control ${
                  timer.isPlaying
                    ? 'timer__control--pause'
                    : 'timer__control--play'
                }`}
              ></div>
            </Button>
          )}
        </div>
      ))}
    </section>
  );
};

export default Timer;
