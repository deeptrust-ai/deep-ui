export interface IDateRangePickerProps {
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly onChange?: (fromDate: Date | null, toDate: Date | null) => void;
  readonly disabled?: boolean;
}
