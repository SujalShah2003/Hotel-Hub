import { Controller, useFormContext } from 'react-hook-form';

import { Select as BaseSelect } from '@mantine/core';
import React from 'react';
import type { SelectI } from '../../types/type.ts';

const Select: React.FC<SelectI> = ({ label, name, data, props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ref, onBlur },
        fieldState: { error },
      }) => (
        <BaseSelect
          ref={ref}
          label={label}
          data={data}
          value={value as string}
          onBlur={onBlur}
          placeholder={
            props?.placeholder
              ? props.placeholder
              : label
                ? `Select ${label}`
                : ''
          }
          onChange={(newValue) => {
            onChange(newValue);
          }}
          data-test-id={props?.['data-test-id'] ? props['data-test-id'] : name}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
};

export { Select };
