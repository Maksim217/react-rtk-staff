import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchStaff,
  fetchEmployeeById,
} from '../../store/reducers/staff/ActionCreators';
import { EnhancedTableHead } from '../';
import { IData } from '../../models/IData';
import { tableSort, createData, getComparator } from '../../utils';
import { Order, Reducer } from '../../const';
import useStyles from './styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

const EnhancedTable: React.FC = (): React.ReactElement => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IData>('fullName');
  const [selected, setSelected] = React.useState<number | null>(null);

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { staff, requested, employee } = useAppSelector(
    (state) => state[Reducer.Staff],
  );

  React.useEffect(() => {
    if (!requested) {
      dispatch(fetchStaff);
    }
  }, []);

  React.useEffect(() => {
    if (employee) {
      setSelected(employee.id);
    } else {
      setSelected(null);
    }
  }, [employee]);

  const rows = staff.map((e) =>
    createData(e.id, e.fullName),
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    if (selected !== id) {
      setSelected(id);
      dispatch(fetchEmployeeById(id));
    } else {
      setSelected(null);
      dispatch(fetchEmployeeById(null));
    }
  };

  const isSelected = (id: number) => selected === id;

  return (
    <Box className={classes.box}>
      <Paper className={classes.box}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-labelledby='tableTitle'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {tableSort(rows, getComparator(order, orderBy))
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${row.id}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}>
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'>
                        {row.fullName}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
