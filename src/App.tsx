import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import DateSelector from './components/DateSelector';
import GameSummaryModal from './components/GameSummaryModal';
import LivesDisplay from './components/LivesDisplay';
import Timer from './components/Timer';
import Wall from './components/Wall';
import { PUZZLE_TIME_LIMIT_SECONDS } from './constants';
import { PuzzleProvider, usePuzzle } from './contexts/Puzzle';
import { Instructions, Title } from './style';

const PuzzleContainer = styled.div`
  max-width: 800px; // Adjust this width to match your puzzle board width
  margin: auto; // Center align the container
`;

const AppContent: React.FC = () => {
  const { fetchPuzzle, completedGroups, puzzle, lives } = usePuzzle();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPuzzle, setShowPuzzle] = useState<boolean>(false);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(PUZZLE_TIME_LIMIT_SECONDS);

  const handleDateChange = (date: Date) => {
    setIsLoading(true);
    setShowPuzzle(false);
    fetchPuzzle(date.toISOString().split('T')[0]).finally(() => {
      setIsLoading(false);
      setShowPuzzle(true);
      setIsTimerActive(true);
    });
  };

  useEffect(() => {
    // Check if all groups are completed or timer ends
    if (
      (puzzle &&
        completedGroups.length === Object.keys(puzzle?.groups ?? {}).length) ||
      countdown === 0 ||
      (puzzle && lives === 0)
    ) {
      setShowModal(true);
      setIsTimerActive(false); // Stop the timer
    }
  }, [completedGroups, puzzle, countdown]);

  // Timer countdown logic
  useEffect(() => {
    if (isTimerActive && countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [isTimerActive, countdown]);

  const instructionText =
    "Press start and you'll have one minute to solve the wall. When you're down to two groups, you have three lives.";

  return (
    <div>
      {!showPuzzle && (
        <>
          <Title>Only Kevnect</Title>
          <Instructions>{instructionText}</Instructions>
          <DateSelector onDateChange={handleDateChange} isLoading={isLoading} />
        </>
      )}
      {showPuzzle && (
        <PuzzleContainer>
          <Timer
            duration={PUZZLE_TIME_LIMIT_SECONDS}
            timeRemaining={countdown}
          />
          <LivesDisplay />
          <Wall />
        </PuzzleContainer>
      )}
      <GameSummaryModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        timeRemaining={countdown}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PuzzleProvider>
      <AppContent />
    </PuzzleProvider>
  );
};

export default App;
