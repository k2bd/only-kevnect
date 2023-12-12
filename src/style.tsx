import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import styled from 'styled-components';

export const WallContainer = styled.div`
  background-color: #0c3c60;
  padding: 10px; // Reduced padding
  width: 100%; // Use percentage for responsiveness
  max-width: 800px;
  margin: 20px auto; // Reduced margin
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; // Smaller gap

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr); // 2 columns for smaller screens
  }

  @media (max-width: 800px) {
    max-width: 95%;
  }
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
  padding: 15px 20px;
  font-family: 'Times New Roman', serif;
  font-size: 16px;
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
  margin-top: 10px; // Space between the puzzle and the completed groups
`;

export const GroupTitle = styled.h2`
  color: #333;
  text-align: center;
  font-size: 1rem; // Reduced font size for conciseness
  margin-top: 5px;
  margin-bottom: 0px;
`;

export const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px; // Adjust as needed
`;

export const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  // Additional styles for react-datepicker
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

export const StyledModal = styled(Modal)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  width: 90%; // More responsive
  max-width: 500px;
  max-height: 90vh; // Prevents overflow on small screens
  overflow-y: auto; // Allows scrolling within the modal

  @media (max-width: 600px) {
    max-width: 95%;
  }
`;

export const ModalContent = styled.div`
  padding: 20px; // Padding inside the modal
  display: flex;
  flex-direction: column; // Stack children vertically
  align-items: center; // Align children in the center
  justify-content: center; // Center content vertically
`;

export const ModalHeader = styled.h2`
  font-size: 1.5em; // Adjust size as needed
  text-align: center;
  color: #333; // Dark text color for contrast
  margin-bottom: 20px; // Space between header and body
`;

export const ModalBody = styled.div`
  font-size: 1em; // Standard text size
  color: #555; // Slightly lighter text color for the body
  line-height: 1.6; // Space between lines for better readability
  text-align: center; // Center align the content
`;

export const BackgroundBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px); // Adjust the blur effect as needed
`;

export const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #2c3e50; // Dark color for the title
  margin-bottom: 20px; // Space between title and instructions
`;

export const Instructions = styled.p`
  font-size: 1em;
  text-align: center;
  color: #34495e; // Slightly lighter color for instructions
  margin-bottom: 30px; // Space between instructions and date selector
`;

export const PipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  @media (max-width: 600px) {
    padding: 5px;
  }
`;

export const Pip = styled.div<{ $alive: boolean; $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $alive }) => ($alive ? '#4caf50' : '#ddd')};
  margin: 0 5px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const TimerContainer = styled.div`
  width: 100%; // Full width of the container
  height: 10px; // Height of the timer bar
  border-radius: 5px;
  overflow: hidden;
`;

export const TimeElapsed = styled.div<{ width: number }>`
  height: 100%;
  background-color: #4caf50; // Color of the elapsed time
  width: ${({ width }) => width}%;
  transition: width 0.2s linear; // Smooth transition for the timer
`;

export const HeaderContainer = styled.div`
  position: sticky; // Use sticky positioning
  top: 0; // Stick to the top of the viewport
  left: 0;
  height: 30px;
  background-color: #fff;
  z-index: 1; // Ensure the header is above the puzzle
`;

export const PuzzleContainer = styled.div`
  max-width: 800px; // Adjust this width to match your puzzle board width
  margin: auto; // Center align the container
  display: flex;
  justify-content: center; // Ensures content inside is also centered
  align-items: center; // Vertical alignment if needed

  @media (max-width: 800px) {
    max-width: 95%;
  }
`;
