import { AppDispatch, RootState } from '../../../store/store';
import { staffSlice } from '../staff/StaffSlice';
import { IEmployee } from '../../../models/IEmployee';
import { LocalStorage } from '../../../services/storage';
import { Reducer, Storage } from '../../../const';

const localStorage: LocalStorage = new LocalStorage(window);

export const fetchStaff = (dispatch: AppDispatch) => {
  const staff: IEmployee[] = JSON.parse(localStorage.get(Storage.Staff)) || [];
  const staffJson = JSON.stringify(staff);
  dispatch(staffSlice.actions.setStaff(staff));
  dispatch(staffSlice.actions.setStaffJson(staffJson));
  dispatch(staffSlice.actions.setEmployee(null));
  dispatch(staffSlice.actions.setRequested(true));
};

export const fetchEmployeeById =
  (id: number | null) => (dispatch: AppDispatch, getState: () => RootState) => {
    const staff: IEmployee[] = [...getState()[Reducer.Staff].staff];
    const employee = staff.find((e) => e.id === id);
    dispatch(staffSlice.actions.setEmployee(employee));
  };

export const addToStaff =
  (employee: IEmployee) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const staff: IEmployee[] = [...getState()[Reducer.Staff].staff];
    staff.push(employee);
    dispatch(staffSlice.actions.setStaff(staff));
    dispatch(staffSlice.actions.setEmployee(employee));
  };

export const removeFromTeam =
  (id: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    const currentStaff = [...getState()[Reducer.Staff].staff];
    const staff: IEmployee[] = [...currentStaff.filter((e) => e.id !== id)];
    dispatch(staffSlice.actions.setStaff(staff));
    dispatch(staffSlice.actions.setEmployee(null));
  };

export const updateEmployee =
  (id: number, attribute: string, value: any) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const staff: IEmployee[] = [...getState()[Reducer.Staff].staff];
    const idx = staff.findIndex((e) => e.id === id);
    const employee = staff[idx];
    staff[idx] = { ...employee, [attribute]: value };
    dispatch(staffSlice.actions.setStaff(staff));
  };

export const save = (dispatch: AppDispatch, getState: () => RootState) => {
  const staff: IEmployee[] = [...getState()[Reducer.Staff].staff];
  const staffJson = JSON.stringify(staff);
  dispatch(staffSlice.actions.setStaffJson(staffJson));
  localStorage.set(Storage.Staff, staffJson);
};
