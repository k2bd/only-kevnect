import { useEffect, useState } from 'react';

import { MINIMUM_SELECTABLE_DATE } from '../../constants';
import {
  DatePickerContainer,
  StyledButton,
  StyledDatePicker
} from '../../style';

interface DateSelectorProps {
  onDateChange: (date: Date) => void;
  onDateSelect: (date: Date) => void;
  isLoading: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  onDateChange,
  onDateSelect,
  isLoading
}: DateSelectorProps) => {
  const today = new Date();
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (highlightedDate === null) {
      onChange(today);
    }
  }, [highlightedDate, today]);

  const onChange = (date: Date | null) => {
    setHighlightedDate(date);
    if (date) {
      onDateChange(date);
    }
  };

  return (
    <DatePickerContainer>
      <StyledDatePicker
        selected={highlightedDate}
        onChange={onChange}
        minDate={MINIMUM_SELECTABLE_DATE}
        maxDate={today}
        disabled={isLoading}
      />
      <StyledButton
        onClick={() => highlightedDate && onDateSelect(highlightedDate)}
        disabled={isLoading || !highlightedDate}
      >
        Start
      </StyledButton>
    </DatePickerContainer>
  );
};

export default DateSelector;
