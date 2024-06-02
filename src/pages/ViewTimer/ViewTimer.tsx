import { FC, useEffect, useState } from 'react';
import './ViewTimer.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CircleTimer from '../../components/CircleTimer/CircleTimer';
import { TimerType } from '../../types/types';

interface ViewTimer {
  /**
   * Array of timers
   */
  timerList: TimerType[];
  /**
   * Function starts or pause timer
   */
  handlePlay: (id: string) => void;
  /**
   * Function set new list of timers
   */
  setNewTimerList: (list: TimerType[]) => void;
}

const ViewTimer: FC<ViewTimer> = (props) => {
  const { id } = useParams<{ id: string }>();
  const timer = props.timerList.find((timer) => timer.id === id);
  const navigate = useNavigate();
  const [circleTimeMinutes, setCircleTimeMinutes] = useState(0);
  const [circleTimeSeconds, setCircleTimeSeconds] = useState(0);

  const backTo = () => {
    navigate('/');
  };

  const handleReset = (id: string) => {
    if (timer) {
      if (timer.id === id) {
        timer.minutes = timer.initMinutes;
        timer.seconds = timer.initSeconds;
        setCircleTimeMinutes(timer.initMinutes);
        setCircleTimeSeconds(timer.initSeconds);
      }
    }
  };

  useEffect(() => {
    if (timer) {
      setCircleTimeMinutes(timer.minutes);
      setCircleTimeSeconds(timer.seconds);
    }
  }, [timer]);

  if (!timer) {
    return (
      <div className='container'>
        <div className='view-end__text'>
          <p>Что-то пошло не так...</p>
          <div className='view-end__button'>
            <Button buttonType='colored' color='green' onClick={backTo}>
              Вернуться
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='container'>
      <section className='view'>
        <div className='view__timer'>
          <CircleTimer
            minutes={circleTimeMinutes}
            seconds={circleTimeSeconds}
            initMinutes={timer.initMinutes}
            initSeconds={timer.initSeconds}
          ></CircleTimer>
        </div>
        <div className='view__buttons'>
          <div className='view__button'>
            <Button
              buttonType='colored'
              color='orange'
              onClick={() => props.handlePlay(timer.id)}
            >
              {timer.isPlaying ? 'Пауза' : 'Возобновить'}
            </Button>
          </div>
          <div className='view__button'>
            <Button
              buttonType='colored'
              color='grey'
              onClick={() => handleReset(timer.id)}
            >
              Отмена
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTimer;
