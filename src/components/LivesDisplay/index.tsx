import styled from 'styled-components';

import { PUZZLE_LAST_GROUP_LIVES } from '../../constants';
import { usePuzzle } from '../../contexts/Puzzle';

const PipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Pip = styled.div<{ $alive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $alive }) => ($alive ? '#4caf50' : '#ddd')};
  margin: 0 5px;
`;

interface LivesDisplayProps {}

const LivesDisplay: React.FC<LivesDisplayProps> = () => {
  const { lives } = usePuzzle();
  return (
    <PipContainer>
      {Array.from({ length: PUZZLE_LAST_GROUP_LIVES }).map((_, index) => (
        <Pip key={index} $alive={index < lives} />
      ))}
    </PipContainer>
  );
};

export default LivesDisplay;
