export default function ClockDisplay({ timeLeft, isBreak, onStart, onReset }) {
  return (
    <>
      <div
        id="clock-display"
        className="flex flex-col items-center border-4 border-teal-950 rounded-[32px] w-1/4 pt-2 pb-3 mt-2"
      >
        <div id="clock" className="flex flex-col items-center">
          <h2 id="timer-label" className="text-xl">
            {isBreak ? 'Break' : 'Session'}
          </h2>
          <div id="time-left" className="text-5xl">
            {timeLeft}
          </div>
        </div>
      </div>
      <div id="clock-controls" className="flex justify-center w-1/5">
        <div id="start_stop" className="mx-1" onClick={onStart}>
          play/pause
        </div>
        <div id="reset" className="mx-1" onClick={onReset}>
          reset
        </div>
      </div>
    </>
  );
}
