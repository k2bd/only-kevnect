import React, { useState } from 'react';
import Modal from 'react-modal';

import copyToClipboard from '../../clipboard';
import { PUZZLE_TIME_LIMIT_SECONDS } from '../../constants';
import { usePuzzle } from '../../contexts/Puzzle';

interface GameSummaryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  timeRemaining: number;
}

const GameSummaryModal: React.FC<GameSummaryModalProps> = ({
  isOpen,
  onRequestClose,
  timeRemaining
}) => {
  const { puzzle, guesses, completedGroups } = usePuzzle();
  const [activeTab, setActiveTab] = useState<'summary' | 'details'>('summary');

  const levelToEmoji = (level: number): string => {
    switch (level) {
      case 0:
        return '🟨';
      case 1:
        return '🟩';
      case 2:
        return '🟦';
      case 3:
        return '🟪';
      default:
        return '⬜';
    }
  };

  // Function to find the level of a group
  const findGroupLevel = (groupName: string): number => {
    return puzzle?.groups[groupName]?.level ?? -1;
  };

  // Function to find the level of a guess
  const findGuessLevel = (guess: string): number => {
    return Object.keys(puzzle?.groups ?? {}).findIndex(
      (groupName) => puzzle?.groups[groupName].members.includes(guess)
    );
  };

  const summaryContent = (
    <div>
      <p>Time taken: {PUZZLE_TIME_LIMIT_SECONDS - timeRemaining} seconds</p>
      <p>Number of guesses: {guesses.length}</p>
      <div>
        {completedGroups.map((group) => (
          <span key={group}>{levelToEmoji(findGroupLevel(group))}</span>
        ))}
      </div>
    </div>
  );

  const summaryToCopy = `Puzzle #${puzzle?.id}
${completedGroups.map((group) => levelToEmoji(findGroupLevel(group))).join('')}
⏱️${PUZZLE_TIME_LIMIT_SECONDS - timeRemaining}s
${guesses.length} guesses`;

  const detailedContent = (
    <div>
      {guesses.map((guess, index) => (
        <div key={index}>
          {guess.map((tile) => (
            <span key={tile}>{levelToEmoji(findGuessLevel(tile))}</span>
          ))}{' '}
        </div>
      ))}
      <p>Time taken: {PUZZLE_TIME_LIMIT_SECONDS - timeRemaining} seconds</p>
    </div>
  );

  const detailedToCopy = `Puzzle #${puzzle?.id}
${guesses
  .map((guess) =>
    guess.map((tile) => levelToEmoji(findGuessLevel(tile))).join('')
  )
  .join('\n')}
⏱️${PUZZLE_TIME_LIMIT_SECONDS - timeRemaining}s`;

  const modalContent =
    activeTab === 'summary' ? (
      <div>
        {summaryContent}
        <button onClick={() => copyToClipboard(summaryToCopy)}>
          Share My Results
        </button>
      </div>
    ) : (
      <div>
        {detailedContent}
        <button onClick={() => copyToClipboard(detailedToCopy)}>
          Share My Results
        </button>
      </div>
    );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <button onClick={() => setActiveTab('summary')}>Summary</button>
      <button onClick={() => setActiveTab('details')}>Details</button>
      {modalContent}
    </Modal>
  );
};

export default GameSummaryModal;
