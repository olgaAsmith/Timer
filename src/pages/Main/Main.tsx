import { FC } from 'react';
import Timer from '../../components/Timer/Timer';
import { TimerType } from '../../types/types';

interface Main {
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

const Main: FC<Main> = (props) => {
  return (
    <div className='container'>
      <Timer
        isMode={props.isMode}
        setNewTimerList={props.setNewTimerList}
        timerList={props.timerList}
        handlePlay={props.handlePlay}
      ></Timer>
    </div>
  );
};

export default Main;
