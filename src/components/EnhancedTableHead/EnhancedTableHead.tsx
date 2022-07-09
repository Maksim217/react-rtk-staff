import React from 'react';
import { Order } from '../../const';
import { IData } from '../../models/IData';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

interface IHeadCell {
  id: keyof IData;
  label: string;
}

interface IEnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IData,
  ) => void;
  order: Order;
  orderBy: string;
}

const EnhancedTableHead: React.FC<IEnhancedTableProps> = (
  props,
): React.ReactElement => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const headCells: readonly IHeadCell[] = [
    {
      id: 'fullName',
      label: 'ФИО',
    }
  ];

  const renderTableCells = (): React.ReactElement[] => {
    return headCells.map((headCell) => (
      <TableCell
        key={headCell.id}
        sortDirection={orderBy === headCell.id ? order : false}>
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : 'asc'}
          onClick={createSortHandler(headCell.id)}>
          {headCell.label}
          {orderBy === headCell.id ? (
            <Box component='span' sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>
    ));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox' />
        {renderTableCells()}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
