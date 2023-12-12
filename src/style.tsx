import styled from 'styled-components';

export const WallContainer = styled.div`
  background-color: #0c3c60; // A dark blue background
  padding: 20px;
  max-width: 800px;
  margin: 30px auto;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

export const Tile = styled.button<{
  $isSelected: boolean;
  $incorrect: boolean;
}>`
  background: ${(props) =>
    props.$isSelected
      ? 'linear-gradient(to bottom, #FFD700, #FFA500)'
      : 'linear-gradient(to bottom, #6db3f2, #1e69de)'};
  border: 2px solid ${(props) => (props.$isSelected ? '#FFD700' : '#0a2558')};
  color: #ffffff;
  padding: 15px;
  font-family: 'Times New Roman', serif;
  font-size: 20px;
  cursor: pointer;
  transition:
    transform 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.$isSelected ? '0 0 10px #ffa700' : '0 4px 8px 0 rgba(0,0,0,0.2)'};

  &:hover {
    background: ${(props) =>
      props.$isSelected
        ? 'linear-gradient(to bottom, #FFD700, #FFA500)'
        : 'linear-gradient(to bottom, #6991c7, #1e69de)'};
    transform: ${(props) => !props.$isSelected && 'translateY(-2px)'};
    box-shadow: ${(props) =>
      !props.$isSelected && '0 6px 12px 0 rgba(0,0,0,0.3)'};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  animation: ${(props) => (props.$incorrect ? 'flashRed 1s' : 'none')};

  @keyframes flashRed {
    50% {
      background-color: red;
    }
  }
`;

export const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #218838;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  }
`;

// A utility function to determine color based on difficulty level
const colorForDifficulty = (level: string | undefined) => {
  switch (level) {
    case '0':
      return '#F9DF6D';
    case '1':
      return '#A0C35A';
    case '2':
      return '#B0C4EF';
    case '3':
      return '#BA81C5';
    default:
      return '#9E9E9E';
  }
};

export const CompletedTile = styled.div`
  background-color: ${({ color }) => colorForDifficulty(color)};
  color: white; // Assuming white text for better contrast
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem; // Adds space around each tile
  padding: 1rem; // Inner spacing
  font-size: 1rem; // Text size
  font-weight: bold; // Makes the text bold
  border-radius: 8px; // Rounded corners
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // A subtle shadow for depth
  cursor: default; // Default cursor to indicate non-interactivity
  user-select: none; // Prevents text selection

  // Optionally, add a transition for when tiles move to the completed section
  transition: background-color 0.3s ease;

  &:hover {
    // A slight effect on hover, could be a scale or a brighter/darker background color
    background-color: ${({ color }) =>
      colorForDifficulty(color)}CC; // Adding transparency for hover effect
  }
`;

export const CompletedGroupsContainer = styled.div`
  margin-top: 20px; // Space between the puzzle and the completed groups
`;

export const GroupTitle = styled.h2`
  color: #333;
  text-align: center;
  font-size: 1rem; // Reduced font size for conciseness
  margin: 10px 0; // Reduced margin for a more concise layout
`;
