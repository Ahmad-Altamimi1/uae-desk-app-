export interface ISelectOption {
  label: string;
  value: string | number;
  otherValues?: { [type: string]: { value: string | number } };
}


