// PuzzleContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import { PUZZLE_LAST_GROUP_LIVES } from '../../constants';
import { Puzzle } from '../../type';

interface PuzzleContextProps {
  puzzle?: Puzzle;
  error: string | undefined;
  lives: number;
  completedGroups: string[];
  guesses: string[][];
  submitGuess: (guess: string[]) => boolean;
  fetchPuzzle: (date: string) => Promise<void>;
}

const defaultState: PuzzleContextProps = {
  puzzle: undefined,
  error: undefined,
  lives: 0,
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
  const [lives, setLives] = useState(PUZZLE_LAST_GROUP_LIVES);
  const [error, setError] = useState<string | undefined>();

  const loseLife = () => {
    setLives((prevLives) => prevLives - 1);
  };

  const fetchPuzzle = async (date: string) => {
    setError(undefined);
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/k2bd/only-kevnect/main/puzzles/${date}.json`
      );
      if (!response.ok) throw new Error('Failed to fetch puzzle');
      const data = await response.json();
      setPuzzle(data);
    } catch (error) {
      console.error('Failed to fetch puzzle', error);
      setError(`Could not get puzzle ${date}. Please try again later.`);
    }
  };

  useEffect(() => {
    if (!puzzle) return;

    // Auto-complete the puzzle if all groups are completed
    if (completedGroups.length === 3) {
      const groupNames = Object.keys(puzzle.groups);
      const remainingGroup = groupNames.find(
        (groupName) => !completedGroups.includes(groupName)
      );
      if (remainingGroup) {
        markGroupAsCompleted(remainingGroup);
      }
    }
  }, [completedGroups, puzzle]);

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

    if (completedGroups.length === 2) {
      loseLife();
    }

    return false; // The guess is incorrect
  };

  return (
    <PuzzleContext.Provider
      value={{
        puzzle,
        error,
        completedGroups,
        guesses,
        lives,
        submitGuess,
        fetchPuzzle
      }}
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
