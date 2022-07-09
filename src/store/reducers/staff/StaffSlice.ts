import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../../../models/IEmployee';
import { IStaff } from '../../../models/IStaff';

const initialState: IStaff = {
  staff: [],
  staffJson: '',
  employee: null,
  requested: false,
};

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<IEmployee[]>) => {
      state.staff = action.payload;
    },
    setRequested: (state, action: PayloadAction<boolean>) => {
      state.requested = action.payload;
    },
    setEmployee: (state, action: PayloadAction<IEmployee | undefined | null>) => {
      state.employee = action.payload;
      state.backupEmployee = action.payload;
    },
    setStaffJson: (state, action: PayloadAction<string>) => {
      state.staffJson = action.payload;
    },
  },
});

export default staffSlice.reducer;
