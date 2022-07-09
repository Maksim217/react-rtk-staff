import React from 'react';
import { useValidateInput } from '../../../hooks/useValidateInput';
import { DefaultEventFunction, EventFunction, EventValueFunction } from '../../../types';

import TextField from '@mui/material/TextField';

interface IInputProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: DefaultEventFunction | EventFunction;
  handleBlur?: DefaultEventFunction | EventFunction;
  error?: boolean;
  helpText?: string;
}

const Input: React.FC<IInputProps> = (props): React.ReactElement => {
  const { validate } = useValidateInput(props.type);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleChange(event);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (validate) {
      validate(event);
    }
  };

  return (
    <TextField
      required={props.required}
      margin='dense'
      id={props.name}
      name={props.name}
      label={props.label}
      type='text'
      fullWidth
      variant='outlined'
      value={props.value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      error={props.error}
      helperText={props.helpText}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
    />
  );
};

export default Input;
