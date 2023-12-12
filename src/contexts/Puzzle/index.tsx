// PuzzleContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

import { Puzzle } from '../../type';

interface PuzzleContextProps {
  puzzle?: Puzzle;
  completedGroups: string[];
  guesses: string[][];
  submitGuess: (guess: string[]) => boolean;
  fetchPuzzle: (date: string) => Promise<void>;
}

const defaultState: PuzzleContextProps = {
  puzzle: undefined,
  completedGroups: [],
  guesses: [],
  submitGuess: () => false,
  fetchPuzzle: async () => {}
};

const PuzzleContext = createContext<PuzzleContextProps>(defaultState);

interface PuzzleProviderProps {
  children: ReactNode;
}

export const PuzzleProvider = ({ children }: PuzzleProviderProps) => {
  const [puzzle, setPuzzle] = useState<Puzzle | undefined>();
  const [completedGroups, setCompletedGroups] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[][]>([]);

  const fetchPuzzle = async (date: string) => {
    // Check if in development mode
    if (process.env.REACT_APP_DEV_MODE === 'true') {
      // Hard-coded puzzle data for local development
      const devPuzzle = {
        id: 188,
        groups: {
          'MURKY CONDITION': {
            level: 0,
            members: ['CLOUD', 'FOG', 'HAZE', 'MIST']
          },
          FOLLOW: { level: 1, members: ['SHADOW', 'TAIL', 'TRACK', 'TRAIL'] },
          'PINBALL MACHINE COMPONENTS': {
            level: 2,
            members: ['BALL', 'BUMPER', 'FLIPPER', 'PLUNGER']
          },
          '___LAND COUNTRIES': {
            level: 3,
            members: ['ICE', 'IRE', 'FIN', 'NETHER']
          }
        },
        startingGroups: [
          ['BALL', 'TAIL', 'CLOUD', 'FIN'],
          ['SHADOW', 'ICE', 'FLIPPER', 'FOG'],
          ['BUMPER', 'TRACK', 'HAZE', 'IRE'],
          ['NETHER', 'PLUNGER', 'TRAIL', 'MIST']
        ]
      };
      setPuzzle(devPuzzle);
      return;
    }

    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/k2db/only-kevnect/main/puzzles/${date}.json`
      );
      const data = await response.json();
      setPuzzle(data);
    } catch (error) {
      console.error('Failed to fetch puzzle', error);
    }
  };

  const markGroupAsCompleted = (groupName: string) => {
    if (!completedGroups.includes(groupName)) {
      setCompletedGroups([...completedGroups, groupName]);
    }
  };

  const submitGuess = (guess: string[]) => {
    if (!puzzle) return false;

    setGuesses((prevGuesses) => [...prevGuesses, guess]);

    const groupName = Object.keys(puzzle.groups).find((key) => {
      const group = puzzle.groups[key];
      return (
        guess.every((guessedTile) => group.members.includes(guessedTile)) &&
        guess.length === group.members.length
      );
    });

    // If a matching group is found and it's not already completed, mark it as completed
    if (groupName && !completedGroups.includes(groupName)) {
      markGroupAsCompleted(groupName);
      return true; // The guess is correct
    }

    return false; // The guess is incorrect
  };

  return (
    <PuzzleContext.Provider
      value={{ puzzle, completedGroups, guesses, submitGuess, fetchPuzzle }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  return context;
};
