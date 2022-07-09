import React from 'react'

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface IDatePickerProps {
    label: string;
    value: Date | null;
    onChange: (newDate: Date | null) => void;
}

const EnhancedDatePicker: React.FC<IDatePickerProps> = 
  ({ label, value, onChange }): React.ReactElement => {

  return (
    <FormControl fullWidth margin='dense'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default EnhancedDatePicker