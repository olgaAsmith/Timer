import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import AddTimer from './pages/AddTimer/AddTimer';
import ViewTimer from './pages/ViewTimer/ViewTimer';
import { useEffect, useState } from 'react';
import { TimerType } from './types/types';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [timerList, setTimerList] = useState<TimerType[]>([]);
  const [isMode, setIsMode] = useState(false);

  const addTimerElement = (timer: TimerType) => {
    const newTimer = { ...timer };
    setTimerList((list: TimerType[]) => [...list, newTimer]);
    navigate(`/view/${newTimer.id}`);
  };

  const handlePlay = (id: string) => {
    setTimerList((list) =>
      list.map((timer) =>
        timer.id === id
          ? { ...timer, isPlaying: !timer.isPlaying }
          : { ...timer, isPlaying: false }
      )
    );
  };

  useEffect(() => {
    const runningTimer = timerList.find((timer) => timer.isPlaying);
    if (runningTimer) {
      const interval = setInterval(() => {
        setTimerList((list) =>
          list.map((timer) => {
            if (timer.id === runningTimer.id) {
              if (timer.seconds > 0) {
                return { ...timer, seconds: timer.seconds - 1 };
              } else if (timer.minutes > 0) {
                return {
                  ...timer,
                  minutes: timer.minutes - 1,
                  seconds: 59,
                };
              } else if (timer.minutes === 0 && timer.seconds === 0) {
                return { ...timer, isPlaying: false };
              }
            }
            return timer;
          })
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerList]);

  const handleMode = () => {
    setIsMode(!isMode);
  };

  const setNewTimerList = (list: TimerType[]) => {
    setTimerList(list);
  };

  return (
    <div className={`app ${location.pathname === '/add' ? 'app--dark' : ''}`}>
      <Header
        handleMode={handleMode}
        isMode={isMode}
        timerList={timerList}
        setNewTimerList={setNewTimerList}
      ></Header>
      <Routes>
        <Route
          path='/'
          element={
            <Main
              isMode={isMode}
              handlePlay={handlePlay}
              timerList={timerList}
              setNewTimerList={setNewTimerList}
            />
          }
        />
        <Route
          path='/add'
          element={
            <AddTimer timerList={timerList} addTimerElement={addTimerElement} />
          }
        />
        <Route
          path='/view/:id'
          element={
            <ViewTimer
              handlePlay={handlePlay}
              timerList={timerList}
              setNewTimerList={setNewTimerList}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
