import React from 'react';
import Grid from '@mui/material/Grid';
import { Toolbar, AddForm, UpdateForm } from '../../components';
import { EnhancedTable } from '../../components';
import useStyles from './styles';

const Staff: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = React.useCallback(() => setOpen(true), []);
  const handleClickClose = React.useCallback(() => setOpen(false), []);

  return (
    <>
      <AddForm open={open} handleClose={handleClickClose} />
      <Toolbar handleOpen={handleClickOpen} />
      <Grid container>
        <Grid xs={8} item>
          <EnhancedTable />
        </Grid>
        <Grid xs={4} item className={classes.updateForm}>
          <UpdateForm />
        </Grid>
      </Grid>
    </>
  );
};

export default Staff;
