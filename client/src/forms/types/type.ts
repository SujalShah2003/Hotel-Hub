import type {
  CheckboxGroupProps,
  CheckboxProps,
  ComboboxData,
  MultiSelectProps,
  NativeSelectProps,
  NumberInputProps,
  PasswordInputProps,
  RadioGroupProps,
  SelectProps,
  SwitchGroupProps,
  SwitchProps,
  TextareaProps,
  TextInputProps,
} from '@mantine/core';
import type { DateInputProps, DateTimePickerProps } from '@mantine/dates';
import type { ReactNode } from 'react';

type WithDataTestId<T> = T & { 'data-test-id'?: string };

export interface BaseFormI {
  name: string;
  label?: string | ReactNode;
}
export interface ComboboxItem {
  value: string;
  label: string;
}
export interface TextInputI extends BaseFormI {
  props?: Partial<WithDataTestId<TextInputProps>>;
}
export interface CheckboxI extends BaseFormI {
  props?: Partial<WithDataTestId<CheckboxProps>>;
}
export interface NumberInputI extends BaseFormI {
  props?: Partial<WithDataTestId<NumberInputProps>>;
}
export interface PasswordI extends BaseFormI {
  props?: Partial<WithDataTestId<PasswordInputProps>>;
}
export interface RadioGroupI extends BaseFormI {
  props?: Partial<WithDataTestId<RadioGroupProps>>;
  inline?: boolean;
  options: ComboboxItem[];
}
export interface CheckboxGroupI extends BaseFormI {
  props?: Partial<WithDataTestId<CheckboxGroupProps>>;
  options: ComboboxItem[];
  inline?: boolean;
}
export interface SelectI extends BaseFormI {
  data?: ComboboxData;
  props?: Partial<WithDataTestId<SelectProps>>;
}
export interface MultiSelectI extends BaseFormI {
  data?: ComboboxData;
  props?: Partial<WithDataTestId<MultiSelectProps>>;
}
export interface NativeSelectI extends BaseFormI {
  data?: ComboboxData;
  props?: Partial<WithDataTestId<NativeSelectProps>>;
}
export interface TextAreaI extends BaseFormI {
  props?: Partial<WithDataTestId<TextareaProps>>;
  placeholder?: string;
  disabled?: boolean;
}
export interface SwitchI extends BaseFormI {
  props?: Partial<WithDataTestId<SwitchProps>>;
}
export interface SwitchGroupI extends BaseFormI {
  data: { label: string; value: string }[];
  inline?: boolean;
  props?: Partial<WithDataTestId<SwitchGroupProps>>;
}
export interface DateInputI extends BaseFormI {
  props?: Partial<WithDataTestId<DateInputProps>>;
}
export interface DateTimePickerI extends BaseFormI {
  props?: Partial<WithDataTestId<DateTimePickerProps>>;
}
