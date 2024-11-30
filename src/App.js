import { useState, useRef, useEffect } from 'react';
import ClockDisplay from './component/ClockDisplay';

function App() {
  const timerRef = useRef(null);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  function decreaseTimer(event) {
    if (timerRunning) return; // Avoid multiple intervals if already running

    const { id } = event.target;

    if (id === 'break-decrement') {
      setBreakLength((prev) => Math.max(1, prev - 1));
    } else {
      setSessionLength((prev) => {
        const newLength = Math.max(1, prev - 1);
        setTimeLeft(newLength * 60);
        return newLength;
      });
    }
  }
  function increaseTimer(event) {
    if (timerRunning) return; // Avoid multiple intervals if already running

    const { id } = event.target;

    if (id === 'break-increment') {
      setBreakLength((prev) => Math.min(60, prev + 1));
    } else {
      setSessionLength((prev) => {
        const newLength = Math.min(60, prev + 1);
        setTimeLeft(newLength * 60);
        return newLength;
      });
    }
  }

  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     setTimerRunning((prev) => !prev);
  //     setIsBreak((prev) => !prev);
  //   }
  // }, [timeLeft]);
  // useEffect(() => {
  //   if (isBreak) {
  //     setTimeLeft(sessionLength);
  //   } else {
  //     setTimeLeft(breakLength);
  //   }
  // }, [isBreak, sessionLength, breakLength]);

  function playPause() {
    if (timerRunning) {
      //This handles the pause functionality
      clearInterval(timerRef.current);
      setTimerRunning(false);
    } else {
      //This handles play functionality
      if (!timerRunning) {
        setTimerRunning(true);
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev > 0) {
              return prev - 1;
            } else {
              return timeLeft;
            }
          });
        }, 1000);
      }
    }
  }

  function onReset() {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setIsBreak(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">25 + 5 Clock</h1>
      <div id="controls" className="flex">
        <div id="break" className="flex flex-col">
          <h2 id="break-label">Break Length</h2>
          <div id="break-controls" className="flex">
            <div id="break-decrement" onClick={decreaseTimer}>
              Down
            </div>
            <div id="break-length">{breakLength}</div>
            <div id="break-increment" onClick={increaseTimer}>
              Up
            </div>
          </div>
        </div>
        <div id="session" className="flex flex-col">
          <h2 id="session-label">Session Length</h2>
          <div id="session-controls" className="flex">
            <div id="session-decrement" onClick={decreaseTimer}>
              Down
            </div>
            <div id="session-length">{sessionLength}</div>
            <div id="session-increment" onClick={increaseTimer}>
              Up
            </div>
          </div>
        </div>
      </div>
      <ClockDisplay
        timeLeft={formatTime(timeLeft)}
        isBreak={isBreak}
        onStart={playPause}
        onReset={onReset}
      />
    </div>
  );
}

export default App;
