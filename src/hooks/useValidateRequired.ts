import React from 'react';
import { validateTextField } from '../utils';
import { DefaultEventFunction, EventFunction, EventValueFunction } from '../types';

export const useValidateRequired = (inputType: string, initialError: any) => {
  const [error, setError] = React.useState<any>(initialError);
  const validateRequiredFocusRef = React.useRef<DefaultEventFunction | EventFunction>(); 
  const validateRequiredBlurRef = 
    React.useRef<DefaultEventFunction | EventFunction>(); 
  const validateRequiredBlurValRef = React.useRef<EventValueFunction>();

  const handleRequiredFocus =
    (e: React.FocusEvent<HTMLInputElement, Element>) =>
      setError(initialError);

  const handleInputRequiredBlur =
    (e: React.FocusEvent<HTMLInputElement, Element>) =>
      setError(validateTextField(e.target.value));

  const handleSelectRequiredBlur =
    (value: string) => (e: React.FocusEvent<HTMLDivElement, Element>) => {
      if (!value) {
        setError(true);
      } else {
        setError(false);
      }
    };

  React.useMemo(() => {
    switch(inputType) {
      case 'text':
        validateRequiredFocusRef.current = handleRequiredFocus;
        validateRequiredBlurRef.current =  handleInputRequiredBlur;
        validateRequiredBlurValRef.current = () => () => {};
        break;
      case 'select':
        validateRequiredFocusRef.current = handleRequiredFocus;
        validateRequiredBlurValRef.current =  handleSelectRequiredBlur;
        validateRequiredBlurRef.current =  () => {};
        break;
      default:
        validateRequiredFocusRef.current = () => {};
        validateRequiredBlurRef.current =  () => {};
        validateRequiredBlurValRef.current = () => () => {};
    }
  }, [initialError]);

  return {
    error,
    setError: setError,
    validateRequiredFocus: validateRequiredFocusRef.current,
    validateRequiredBlur: validateRequiredBlurRef.current, 
    validateRequiredValBlur: validateRequiredBlurValRef.current,
  };
}