import { IEmployee } from './IEmployee';

export interface IStaff {
  staff: IEmployee[];
  staffJson?: string;
  employee?: IEmployee | null;
  backupEmployee?: IEmployee | null;
  requested: boolean;
}
