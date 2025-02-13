import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

export interface InputFieldProps {
  handleChange?: (e: string | React.ChangeEvent<any>) => void;
  handleBlur?: (e: React.FocusEvent<any>) => void;
  defaultValue?: string;
  value: string | number | undefined;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export const InputField = ({
  handleChange,
  handleBlur,
  name,
  placeholder,
  required = false,
}: InputFieldProps) => {
  const [, meta] = useField(name);

  const onChange = (e: React.ChangeEvent<any>) => {
    handleChange?.(e);
  };

  const onBlur = (e: React.FocusEvent<any>) => {
    handleBlur?.(e);
  };

  return (
    <div>
      <TextField
        placeholder={placeholder}
        fullWidth
        required={required}
        type="text"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={meta.value}
        error={!!(meta?.touched && meta?.error)}
        helperText={!!(meta?.touched && meta?.error) ? meta?.error : ""}
      />
    </div>
  );
};
