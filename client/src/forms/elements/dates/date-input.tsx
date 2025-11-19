import React from 'react';
import { DateInput as BaseDateInput } from '@mantine/dates';
import { Controller, useFormContext } from 'react-hook-form';
import type { DateInputI } from '../../types/type.ts';

const DateInput: React.FC<DateInputI> = ({ name, label, props }) => {
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
          <BaseDateInput
            ref={ref}
            label={label}
            clearable
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
            autoComplete="off"
            {...props}
          />
        );
      }}
    />
  );
};

export { DateInput };
