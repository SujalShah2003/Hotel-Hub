import { Controller, useFormContext } from "react-hook-form";

import { TextInput as BaseInput } from "@mantine/core";
import React from "react";
import type { TextInputI } from "../../types/type";

const TextInput: React.FC<TextInputI> = ({ name, label, props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <BaseInput
            autoComplete="off"
            error={error?.message}
            label={label}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            placeholder={
              props?.placeholder ? props.placeholder : label ? `${label}` : ""
            }
            ref={ref} 
            value={value as string}
            data-test-id={
              props?.["data-test-id"] ? props["data-test-id"] : name
            }
            {...props}
          />
        );
      }}
    />
  );
};

export { TextInput };
