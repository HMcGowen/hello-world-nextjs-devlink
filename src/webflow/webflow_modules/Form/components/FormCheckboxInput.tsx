"use client";
import React from "react";
import FormBooleanInput from "./FormBooleanInput";
import { FormInputProps } from "./FormTextInput";

const FormCheckboxInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormCheckboxInput({ className = "", ...props }, ref) {
    return (
      <FormBooleanInput
        {...props}
        ref={ref}
        type="checkbox"
        className={className + " w-checkbox-input"}
      />
    );
  }
);

export default FormCheckboxInput;
