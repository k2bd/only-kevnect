import { useEffect, useState } from 'react';

import { usePuzzle } from '../../contexts/Puzzle';
import {
  CompletedGroupsContainer,
  CompletedTile,
  GroupTitle,
  Tile,
  WallContainer
} from '../../style';

const Wall = () => {
  const { puzzle, submitGuess, completedGroups } = usePuzzle();
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  useEffect(() => {
    if (selectedTiles.length === 4) {
      setSelectedTiles([]);
      const isCorrect = submitGuess(selectedTiles);
      if (isCorrect) {
        // Correct guess, the tiles will move to the completed section by the useEffect below
      } else {
        // Incorrect guess, flash tiles red and then reset selection
        setIncorrectGuesses(selectedTiles);
        setTimeout(() => {
          setIncorrectGuesses([]);
        }, 100);
      }
    }
  }, [selectedTiles, submitGuess]);

  // Calculate completed and remaining tiles for rendering
  const completedTiles =
    completedGroups.flatMap((groupName) => puzzle?.groups[groupName].members) ??
    [];
  const remainingTiles =
    puzzle?.startingGroups
      .flat()
      .filter((tile) => !completedTiles.includes(tile)) ?? [];

  const handleTileClick = (tile: string) => {
    if (incorrectGuesses.length) return; // Prevent interaction during incorrect guess animation

    setSelectedTiles((prevSelectedTiles) => {
      if (prevSelectedTiles.includes(tile)) {
        return prevSelectedTiles.filter((t) => t !== tile); // Deselect tile
      } else {
        return [...prevSelectedTiles, tile]; // Select tile
      }
    });
  };

  if (!puzzle) {
    return <div>Loading puzzle...</div>;
  }

  // Get group difficulty rating
  const getDifficultyColor = (tile?: string): string => {
    const groupName = tile
      ? Object.keys(puzzle.groups).find((group) =>
          puzzle.groups[group].members.includes(tile)
        )
      : undefined;
    return groupName ? puzzle.groups[groupName].level.toString() : '0';
  };

  return (
    <div>
      <WallContainer>
        {remainingTiles.map((tile, index) => (
          <Tile
            key={index}
            $isSelected={selectedTiles.includes(tile)}
            $incorrect={incorrectGuesses.includes(tile)}
            onClick={() => handleTileClick(tile)}
          >
            {tile}
          </Tile>
        ))}
      </WallContainer>
      <CompletedGroupsContainer>
        {completedGroups.map((groupName) => (
          <div key={groupName}>
            <GroupTitle>{groupName}</GroupTitle>
            <WallContainer>
              {puzzle.groups[groupName].members.map((tile, index) => (
                <CompletedTile key={index} color={getDifficultyColor(tile)}>
                  {tile}
                </CompletedTile>
              ))}
            </WallContainer>
          </div>
        ))}
      </CompletedGroupsContainer>
    </div>
  );
};

export default Wall;
