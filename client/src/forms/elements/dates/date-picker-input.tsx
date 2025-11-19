import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { DatePickerInputProps, DatePickerType } from '@mantine/dates';
import { DatePickerInput as BaseDatePickerInput } from '@mantine/dates';

interface DatePickerInputI<T extends DatePickerType> {
  name: string;
  label: string;
  props?: Partial<DatePickerInputProps<T>>;
}

const DatePickerInput: React.FC<DatePickerInputI<DatePickerType>> = ({
  name,
  label,
  props,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        // Initialize value based on type
        let formattedValue: DatePickerInputProps<DatePickerType>['value'];
        if (props?.type === 'multiple') {
          formattedValue = value || [];
        } else if (props?.type === 'range') {
          formattedValue = value || [null, null];
        } else {
          formattedValue = value ? new Date(value) : null;
        }

        return (
          <BaseDatePickerInput
            ref={ref}
            label={label}
            placeholder={
              props?.placeholder
                ? props.placeholder
                : label
                  ? `Enter ${label}`
                  : ''
            }
            error={error?.message}
            onBlur={onBlur}
            value={formattedValue}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            {...props}
          />
        );
      }}
    />
  );
};

export { DatePickerInput };
