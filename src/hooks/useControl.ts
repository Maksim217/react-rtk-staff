import React from 'react';
import { IUseControl } from './contracts/IUseControl';
import { SelectChangeEvent } from '@mui/material/Select';

export const useControl = (type: string, initialState: any) => {
  const [state, setState] = React.useState<any>(initialState);
  const handleFunction = React.useRef<any>();
  const clearFunction = React.useRef<any>();

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    setState(event.target.value);
  };

  const handleChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(event.target.checked);
  };

  const handleChangeDate = (newDate: Date | null) => {
    setState(newDate);
  };

  const clear = () => {
    setState(initialState);
  }

  React.useMemo(() => {
    switch(type) {
      case 'text': 
        handleFunction.current = handleChangeValue;
        clearFunction.current = clear;
        break;
      case 'date':
        handleFunction.current = handleChangeDate;
        clearFunction.current = clear;
        break;
      case 'checkbox':
        handleFunction.current = handleChangeCheckbox;
        clearFunction.current = clear;
        break;
      default:
        handleFunction.current = () => {};
    }
  }, [initialState]);

  return {
    value: state,
    setValue: setState,
    handleChange: handleFunction.current,
    clear: clearFunction.current,
  };
};
