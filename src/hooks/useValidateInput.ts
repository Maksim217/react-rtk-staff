import React from 'react';

export const useValidateInput = (inputType: string) => {
  const validateInputFunctionRef =
    React.useRef<(e: React.KeyboardEvent) => void>();

  const validateText = (e: React.KeyboardEvent) => {
    if (e.key.match(/[^\sA-zА-я]|[\\_]/g)) {
      e.preventDefault();
    }
  };

  React.useMemo(() => {
    switch (inputType) {
      case 'text':
        validateInputFunctionRef.current = validateText;
        break;
      default:
        validateInputFunctionRef.current = () => {};
        break;
    }
  }, [inputType]);

  return {
    validate: validateInputFunctionRef.current,
  };
};

export default useValidateInput;
