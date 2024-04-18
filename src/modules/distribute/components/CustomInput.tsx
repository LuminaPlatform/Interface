import { Input, InputProps } from "@chakra-ui/react";
import React, { LegacyRef } from "react";

type CustomInputProps = InputProps;

export const CustomInput = React.forwardRef(
  ({ ...inputProps }: CustomInputProps, ref: LegacyRef<HTMLInputElement>) => {
    return <Input ref={ref} {...inputProps} />;
  }
);

CustomInput.displayName = "CustomInput";
