export interface IEmployee {
  id: number;
  fullName: string;
  position: string;
  DOB?: Date | null;
  gender?: string;
  fired?: boolean;
}
