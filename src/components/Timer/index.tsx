import { TimeElapsed, TimerContainer } from '../../style';

interface HorizontalTimerProps {
  duration: number; // Total duration of the timer in seconds
  timeRemaining: number; // Time remaining in seconds
}

const HorizontalTimer: React.FC<HorizontalTimerProps> = ({
  duration,
  timeRemaining
}: HorizontalTimerProps) => {
  const elapsedWidth = (timeRemaining / duration) * 100;

  return (
    <TimerContainer>
      <TimeElapsed width={elapsedWidth} />
    </TimerContainer>
  );
};

export default HorizontalTimer;
