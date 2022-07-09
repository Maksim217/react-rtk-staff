import React from 'react';
import { IControlItem } from '../../../models/IControlItem';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

interface IRadioProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    list: IControlItem[];
}

const EnhancedRadio: React.FC<IRadioProps> = (
    { label, name, value, onChange, list }
): React.ReactElement => {
  return (
    <FormControl fullWidth margin='dense'>
      <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='gender'
        value={value}
        onChange={onChange}>
        {
          list.map((item, idx) =>(
            <FormControlLabel
              key={`${item.value}-${idx}`}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
};

export default EnhancedRadio;