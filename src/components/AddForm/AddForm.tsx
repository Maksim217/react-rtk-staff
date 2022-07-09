import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addToStaff } from '../../store/reducers/staff/ActionCreators';
import { IEmployee } from '../../models/IEmployee';
import { IError } from '../../models/IError';

import { useControl } from '../../hooks/useControl';
import { useValidateRequired } from '../../hooks/useValidateRequired';
import { Input, Select, Radio, Checkbox, DatePicker } from '../UI';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { positions, sex } from '../../mock';
import { validate, validateSelect } from '../../utils';

interface IAddFormProps {
  open: boolean;
  handleClose: () => void;
}

const initError: IError = { state: false, message: '' };

const AddForm: React.FC<IAddFormProps> = ({
  open,
  handleClose,
}): React.ReactElement => {
  const dispatch = useAppDispatch();

  const fullName = useControl('text', '');
  const fullnameValidate = useValidateRequired('text', initError);

  const position = useControl('text', '');
  const positionValidate = useValidateRequired('select', false);

  const date = useControl('date', null);
  const gender = useControl('text', 'male');
  const fired = useControl('checkbox', false);

  const onSelectBlur = () => {
    if(typeof positionValidate.validateRequiredValBlur === 'function') {
      return positionValidate.validateRequiredValBlur(position.value);
    } else {
      return () => {};
    };
  };

  const clearForm = () => {
    fullName.clear();
    position.clear();
    date.clear();
    gender.clear();
    fired.clear();
  };

  const clearError = () => {
    fullnameValidate.setError(initError);
    positionValidate.setError(false);
  };

  const onClose = () => {
    handleClose();
    clearForm();
    clearError();
  };

  const validateForm = (): boolean => {
    let error: boolean[] = [];

    error.push(validate(fullName.value, fullnameValidate.error, fullnameValidate.setError));
    error.push(validateSelect(position.value, positionValidate.setError));

    if (error.includes(true)) return false;
    return true;
  }

  const submit = (event: any) => {
    event.preventDefault();

    if(!validateForm()) return;

    const newEmployee: IEmployee = {
      id: Date.now(),
      fullName: fullName.value,
      position: position.value,
      DOB: date.value,
      gender: gender.value,
      fired: fired.value,
    };

    dispatch(addToStaff(newEmployee));
    handleClose();
    clearForm();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавление нового сотрудника</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Заполните поля, чтобы добавить нового сотрудника
        </DialogContentText>
        <Input 
          label='ФИО'
          name='fullName'
          type='text'
          required
          value={fullName.value}
          handleChange={fullName.handleChange}
          handleFocus={fullnameValidate.validateRequiredFocus}
          handleBlur={fullnameValidate.validateRequiredBlur}
          error={fullnameValidate.error.state}
          helpText={fullnameValidate.error.message}
        />
        <Select 
          title='Должность' 
          list={positions} 
          name='position'
          value={position.value}
          onChange={position.handleChange}
          error={positionValidate.error}
          onBlur={onSelectBlur()}
        />
        <DatePicker 
          label='Дата рождения' 
          value={date.value} 
          onChange={date.handleChange} 
        />
        <Radio 
          label='Пол' 
          name='gender'
          value={gender.value} 
          list={sex} 
          onChange={gender.handleChange} 
        />
        <Checkbox 
          label='Уволен' 
          checked={fired.value} 
          onChange={fired.handleChange} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} type='submit'>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddForm;
