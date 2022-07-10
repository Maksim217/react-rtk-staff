import React from 'react';
import { useControl } from '../../hooks/useControl';
import { useValidateRequired } from '../../hooks/useValidateRequired';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateEmployee,  } from '../../store/reducers/staff/ActionCreators';
import { imgSrc, Reducer } from '../../const';
import { validateTextField } from '../../utils';
import { IError } from '../../models/IError';
import { positions, sex } from '../../mock';
import useStyles from './styles';

import { Input, Select, Radio, Checkbox, DatePicker } from '../UI';

import Paper from '@mui/material/Paper';
import { SelectChangeEvent } from '@mui/material/Select';
import { IUseControl } from '../../hooks/contracts/IUseControl';

const initError: IError = { state: false, message: '' };

const UpdateForm: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { employee, backupEmployee } = useAppSelector((state) => state[Reducer.Staff]);

  const fullName = useControl('text', '');
  const fullnameValidate = useValidateRequired('text', initError);

  const position = useControl('text', '');

  const date = useControl('date', null);
  const gender = useControl('text', 'male');
  const fired = useControl('checkbox', false);

  React.useEffect(() => {
    if (employee) {
      fullName.setValue(employee.fullName);
      position.setValue(employee.position);
      date.setValue(employee.DOB);
      gender.setValue(employee.gender);
      fired.setValue(employee.fired);
    }
  }, [employee]);

  React.useEffect(() => {}, [fullnameValidate.error.state])

  const onChange = (control: IUseControl) => (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    control.handleChange(event);
    if(employee) {
      dispatch(updateEmployee(employee.id, event.target.name, event.target.value));
    }
  };

  const onChangeDate = (control: IUseControl, name: string) => (
    newDate: Date | null
  ) => {
    control.handleChange(newDate);
    if(employee) {
      dispatch(updateEmployee(employee.id, name, newDate));
    }
  }

  const onChangeCheckbox = (control: IUseControl, name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    control.handleChange(event);
    if(employee) {
      dispatch(updateEmployee(employee.id, name, event.target.checked));
    }
  }

  const onBlurInputRequired = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if(typeof fullnameValidate.validateRequiredBlur === 'function') {
      fullnameValidate.setError(() => {
        const error = validateTextField(event.target.value);

        if(error.state && employee && backupEmployee) {
          fullName.setValue(backupEmployee.fullName);
          dispatch(updateEmployee(employee.id, event.target.name, backupEmployee.fullName));
        }

        return error;
      });
    }
  }

  return (
    <>
      {!employee ? (
        <img
          className={classes.emptyCard}
          src={imgSrc}
        />
      ) : (
        <Paper className={classes.updateForm}>
          <Input 
            label='ФИО'
            name='fullName'
            type='text'
            required
            value={fullName.value}
            handleChange={onChange(fullName)}
            handleBlur={onBlurInputRequired}
          />
          <Select 
            title='Должность' 
            list={positions} 
            name='position'
            value={position.value}
            onChange={onChange(position)}
          />
          <DatePicker 
            label='Дата рождения' 
            value={date.value} 
            onChange={onChangeDate(date, 'DOB')} 
          />
          <Radio 
            label='Пол' 
            name='gender'
            value={gender.value} 
            list={sex} 
            onChange={onChange(gender)} 
          />
          <Checkbox 
            label='Уволен' 
            checked={fired.value} 
            onChange={onChangeCheckbox(fired, 'fired')} 
          />
        </Paper>
      )}
    </>
  );
};

export default UpdateForm;
