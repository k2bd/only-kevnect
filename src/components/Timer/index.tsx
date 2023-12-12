import React from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  width: 100%; // Full width of the container
  height: 10px; // Height of the timer bar
  background-color: #ddd; // Background color of the timer
  border-radius: 5px;
  overflow: hidden;
`;

const TimeElapsed = styled.div<{ width: number }>`
  height: 100%;
  background-color: #4caf50; // Color of the elapsed time
  width: ${({ width }) => width}%;
  transition: width 0.2s linear; // Smooth transition for the timer
`;

interface HorizontalTimerProps {
  duration: number; // Total duration of the timer in seconds
  timeRemaining: number; // Time remaining in seconds
}

const HorizontalTimer: React.FC<HorizontalTimerProps> = ({
  duration,
  timeRemaining
}) => {
  const elapsedWidth = (timeRemaining / duration) * 100; // Calculate the width of the elapsed time

  return (
    <TimerContainer>
      <TimeElapsed width={elapsedWidth} />
    </TimerContainer>
  );
};

export default HorizontalTimer;
