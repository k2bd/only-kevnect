import { useState } from 'react';

import { MINIMUM_SELECTABLE_DATE } from '../../constants';
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
  const today = new Date();
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(today);

  return (
    <DatePickerContainer>
      <StyledDatePicker
        selected={highlightedDate}
        onChange={setHighlightedDate}
        minDate={MINIMUM_SELECTABLE_DATE}
        maxDate={today}
        disabled={isLoading}
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
