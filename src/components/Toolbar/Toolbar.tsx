import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStaff, removeFromTeam, save } from '../../store/reducers/staff/ActionCreators';
import { Reducer } from '../../const';
import useStyles from './styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import UpdateIcon from '@mui/icons-material/Update';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

interface IToolBarProps {
  handleOpen: () => void;
}

const ToolBar: React.FC<IToolBarProps> = ({
  handleOpen,
}): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [isUpdated, setUpdate] = React.useState<boolean>(false)
  const { staff, staffJson, employee } = useAppSelector((state) => state[Reducer.Staff]);

  React.useEffect(() => {
    const currentStaffJson = JSON.stringify(staff);

    if(staffJson === currentStaffJson) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  }, [staff, staffJson]);

  const onRemove = () => {
    if(employee) {
      dispatch(removeFromTeam(employee.id));
    }
  };

  const updateData = () => {

    if(!isUpdated) {
      dispatch(fetchStaff);
      return;
    }

    const isConfirmed = window.confirm("Все несохраненные изменения будут потерены");

    if(isConfirmed) {
      dispatch(fetchStaff);
    };
  };

  const onSave = () => dispatch(save);
  
  const isDisabledRemoveBtn: boolean = !employee ? true : false;
  
  return (
    <AppBar className={classes.header} position='static'>
      <Toolbar className={classes.toolBar}>
        <Button
          className={classes.toolBarBtn}
          variant='contained'
          startIcon={<SaveIcon />}
          disabled={!isUpdated}
          onClick={onSave}>
          Сохранить изменения
        </Button>
        <Button
          className={classes.toolBarBtn}
          variant='contained'
          startIcon={<UpdateIcon />}
          onClick={updateData}>
          Обновить данные
        </Button>
        <Button
          className={classes.toolBarBtn}
          variant='contained'
          startIcon={<PersonRemoveIcon />}
          onClick={onRemove}
          disabled={isDisabledRemoveBtn}>
          Удалить выбранного сотрудника
        </Button>
        <Button
          className={classes.toolBarBtn}
          variant='contained'
          startIcon={<PersonAddIcon />}
          onClick={handleOpen}>
          Добавить нового сотрудника
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
