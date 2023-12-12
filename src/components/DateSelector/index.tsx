import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

interface DateSelectorProps {
  onDateChange: (date: Date) => void;
  isLoading: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  onDateChange,
  isLoading
}) => {
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(null);

  return (
    <div>
      <DatePicker selected={highlightedDate} onChange={setHighlightedDate} />
      <button
        onClick={() => highlightedDate && onDateChange(highlightedDate)}
        disabled={isLoading || !highlightedDate}
      >
        Start
      </button>
    </div>
  );
};

export default DateSelector;
