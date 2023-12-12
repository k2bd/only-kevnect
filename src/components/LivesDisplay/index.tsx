import { PUZZLE_LAST_GROUP_LIVES } from '../../constants';
import { usePuzzle } from '../../contexts/Puzzle';
import { Pip, PipContainer } from '../../style';

interface LivesDisplayProps {}

const LivesDisplay: React.FC<LivesDisplayProps> = () => {
  const { lives, completedGroups } = usePuzzle();
  const livesActive = completedGroups.length >= 2;
  return (
    <PipContainer>
      {Array.from({ length: PUZZLE_LAST_GROUP_LIVES }).map((_, index) => (
        <Pip key={index} $alive={index < lives} $active={livesActive} />
      ))}
    </PipContainer>
  );
};

export default LivesDisplay;
