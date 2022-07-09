import { IData } from './models/IData';
import { IError } from './models/IError';
import { Order } from './const';

export function createData(
  id: number,
  fullName: string,
): IData {
  return { id, fullName };
}

export function tableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function validateTextField(text: string): IError {
  const error: IError = { state: false, message: '' };
  if (text === '') {
    error.state = true;
    error.message = 'Поле обязательно для заполнения!';
    return error;
  }

  return error;
}

export function validate(
  value: string,
  errorData: IError,
  setError: React.Dispatch<React.SetStateAction<IError>>,
): boolean {
  let error = false;

  if (errorData.state) {
    error = true;
  } else {
    const result = validateTextField(value);
    setError(result);
    if (result.state) {
      error = true;
    }
  }

  return error;
}

export function validateSelect(
  value: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
): boolean {
  let error: boolean = false;

  if (!value) {
    setError(true);
    error = true;
  } else {
    setError(false);
  }

  return error;
}
