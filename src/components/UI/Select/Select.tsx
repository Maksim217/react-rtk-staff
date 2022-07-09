import React from 'react';
import { IControlItem } from '../../../models/IControlItem';

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectProps {
  title: string;
  list: IControlItem[];
  value: string;
  name: string;
  onChange: (event: SelectChangeEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: boolean;  
}

const EnhancedSelect: React.FC<ISelectProps> = (
  { title, list, value, name, onChange, error, onBlur }
): React.ReactElement => {
  return (
   <FormControl
      required
      fullWidth
      margin='dense'
      variant='outlined'
      error={error}
      onBlur={onBlur}
    >
      <InputLabel id='demo-simple-select-standard-label'>
        { title }
      </InputLabel>
      <Select
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standard'
        value={value}
        onChange={onChange}
        label={title}
        name={name}>
          {
            list.map((item, idx) => (
              <MenuItem key={`${item.value}-${idx}`} value={item.value}>
                {item.label}
              </MenuItem>
            ))
          }
      </Select>
    </FormControl>
  );
};

export default EnhancedSelect;