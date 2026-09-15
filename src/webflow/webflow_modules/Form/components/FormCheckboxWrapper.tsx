"use client";
import React from "react";

const FormCheckboxWrapper = React.forwardRef(function FormCheckboxWrapper(
  { className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>,
  ref
) {
  return React.createElement("label", {
    className: className + " w-checkbox",
    ...props,
    ref,
  });
});

export default FormCheckboxWrapper;
