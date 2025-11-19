import { Controller, useFormContext } from 'react-hook-form';

import { MultiSelect as BaseMultiSelect } from '@mantine/core';
import type { MultiSelectI } from '../../types/type.ts';
import React from 'react';

const MultiSelect: React.FC<MultiSelectI> = ({ label, name, data, props }) => {
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
          <BaseMultiSelect
            ref={ref}
            label={label}
            placeholder={`Select ${label ?? ''}`}
            error={error?.message}
            onBlur={onBlur}
            value={value as string[]}
            data={data}
            hidePickedOptions
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

export { MultiSelect };
