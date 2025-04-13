import { ISelectOption } from "./type";

export const mapToSelectOptions = <T>(
  data: T[],
  getLabel: (item: T) => string,
  getValue: (item: T) => string | number,
  getOtherValues?: (item: T) => { [type: string]: { value: string | number } }
): ISelectOption[] => {
  return data?.map((item) => {
    const option: ISelectOption = {
      label: getLabel(item),
      value: getValue(item),
      otherValues: {},
    };

    if (getOtherValues) {
      option.otherValues = getOtherValues(item);
    }

    return option;
  });
};
