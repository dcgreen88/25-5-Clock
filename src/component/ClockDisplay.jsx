export default function ClockDisplay({
  timeLeft,
  isBreak,
  onStart,
  onReset,
}) {
  return (
    <div id="clock-display" className="flex flex-col items-center">
      <div id="clock" className="flex flex-col items-center">
        <h2 id="timer-label">{isBreak ? 'Break' : 'Session'}</h2>
        <div id="time-left">{timeLeft}</div>
      </div>
      <div id="clock-controls" className="flex justify-around w-[200px]">
        <div id="start_stop" onClick={onStart}>
          play/pause
        </div>
        <div id="reset" onClick={onReset}>
          reset
        </div>
      </div>
    </div>
  );
}
