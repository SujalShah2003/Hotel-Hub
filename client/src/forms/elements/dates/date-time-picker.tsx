import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DateTimePicker as BaseDateTimePicker } from '@mantine/dates';
import type { DateTimePickerI } from '../../types/type.ts';

const DateTimePicker: React.FC<DateTimePickerI> = ({ name, label, props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <BaseDateTimePicker
            ref={ref}
            label={label}
            placeholder={`Select ${label ?? ''}`}
            error={error?.message}
            onBlur={onBlur}
            value={value as Date}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            data-test-id={
              props?.['data-test-id'] ? props['data-test-id'] : name
            }
            {...props}
          />
        );
      }}
    />
  );
};

export { DateTimePicker };
