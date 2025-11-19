import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox as BaseCheckbox } from '@mantine/core';
import type { CheckboxI } from '../../types/type.ts';

const Checkbox: React.FC<CheckboxI> = ({ name, label, props }) => {
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
          <BaseCheckbox
            ref={ref}
            onBlur={onBlur}
            label={label}
            checked={value as boolean}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            data-test-id={
              props?.['data-test-id'] ? props['data-test-id'] : name
            }
            error={error?.message}
            {...props}
          />
        );
      }}
    />
  );
};

export { Checkbox };
