import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import './Header.scss';
import { TimerType } from '../../types/types';

interface HeaderProps {
  /**
   * Timer modification status
   */
  isMode: boolean;
  /**
   * Handle Timer modification status
   */
  handleMode: () => void;
  /**
   * Array of timers
   */
  timerList: TimerType[];
  /**
   * Function set new list of timers
   */
  setNewTimerList: (list: TimerType[]) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const location = useLocation();

  const handleResetAll = () => {
    const resetTimers = props.timerList.map((timer) => ({
      ...timer,
      minutes: timer.initMinutes,
      seconds: timer.initSeconds,
      isPlaying: false,
    }));
    props.setNewTimerList(resetTimers);
  };

  return (
    <header className='header'>
      <div className='header__container'>
        {location.pathname === '/' ? (
          <div className='header__button'>
            <Button buttonType='transparent' onClick={props.handleMode}>
              {props.isMode ? 'Готово' : 'Править'}
            </Button>
          </div>
        ) : location.pathname === '/add' ? (
          <Button buttonType='transparent'>
            <Link to='/'>Отменить</Link>
          </Button>
        ) : (
          <Button buttonType='transparent'>
            <Link to='/'>Таймеры</Link>
          </Button>
        )}

        {location.pathname === '/' ? (
          props.isMode ? (
            <Button buttonType='transparent' onClick={handleResetAll}>
              Сбросить все
            </Button>
          ) : (
            <Button buttonType='transparent'>
              <Link to='/add' className='header__add-button'></Link>
            </Button>
          )
        ) : null}
      </div>
    </header>
  );
};

export default Header;
