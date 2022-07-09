import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ICheckboxProps {
    label: string;
    checked: boolean | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EnhancedCheckbox: React.FC<ICheckboxProps> = (
    { label, checked, onChange }
): React.ReactElement => {
  return (
    <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={label}
        />
  );
};

export default EnhancedCheckbox;