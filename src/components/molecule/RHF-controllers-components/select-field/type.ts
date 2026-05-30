import { BaseControllerProps } from '@/src/types/global';
import { FieldValues } from 'react-hook-form';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectControllerProps<
  T extends FieldValues,
> extends BaseControllerProps<T> {
  options: SelectOption[];
}

export type { SelectControllerProps };
