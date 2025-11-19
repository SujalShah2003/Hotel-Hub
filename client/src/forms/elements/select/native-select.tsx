import { Controller, useFormContext } from 'react-hook-form';

import { NativeSelect as BaseNativeSelect } from '@mantine/core';
import type { NativeSelectI } from '../../types/type.ts';
import React from 'react';

const NativeSelect: React.FC<NativeSelectI> = ({
  label,
  name,
  data,
  props,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ref, onBlur },
        fieldState: { error },
      }) => (
        <BaseNativeSelect
          ref={ref}
          onBlur={onBlur}
          label={label}
          data={data}
          value={value as string}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          error={error?.message}
          data-test-id={props?.['data-test-id'] ? props['data-test-id'] : name}
          {...props}
        />
      )}
    />
  );
};

export { NativeSelect };
