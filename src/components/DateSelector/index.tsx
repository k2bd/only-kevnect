import { useState } from 'react';

import {
  DatePickerContainer,
  StyledButton,
  StyledDatePicker
} from '../../style';

interface DateSelectorProps {
  onDateChange: (date: Date) => void;
  isLoading: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  onDateChange,
  isLoading
}: DateSelectorProps) => {
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);

  return (
    <DatePickerContainer>
      <StyledDatePicker
        selected={highlightedDate}
        onChange={setHighlightedDate}
      />
      <StyledButton
        onClick={() => highlightedDate && onDateChange(highlightedDate)}
        disabled={isLoading || !highlightedDate}
      >
        Start
      </StyledButton>
    </DatePickerContainer>
  );
};

export default DateSelector;
