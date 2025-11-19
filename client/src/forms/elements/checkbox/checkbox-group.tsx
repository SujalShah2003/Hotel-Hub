import {
  Checkbox as BaseCheckbox,
  CheckboxGroup as BaseCheckboxGroup,
  Flex,
} from '@mantine/core';
import type { CheckboxGroupI, ComboboxItem } from '../../types/type.ts';
import { Controller, useFormContext } from 'react-hook-form';

import React from 'react';

const CheckboxGroup: React.FC<CheckboxGroupI> = ({
  name,
  options,
  label,
  props,
  inline = false,
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
        return (
          <BaseCheckboxGroup
            ref={ref}
            onBlur={onBlur}
            label={label}
            value={value as string[]}
            onChange={(selectedValues) => {
              onChange(selectedValues);
            }}
            error={error?.message}
            {...props}
            data-test-id={
              props?.['data-test-id'] ? props['data-test-id'] : name
            }
          >
            <Flex direction={inline ? 'row' : 'column'} wrap="wrap" gap="xs">
              {options.map((option: ComboboxItem) => (
                <BaseCheckbox
                  key={option.value}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </Flex>
          </BaseCheckboxGroup>
        );
      }}
    />
  );
};

export { CheckboxGroup };
