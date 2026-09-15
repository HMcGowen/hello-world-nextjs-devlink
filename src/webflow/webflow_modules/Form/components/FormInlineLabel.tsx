"use client";
import React from "react";
import type { Props } from "../../types";

const FormInlineLabel = React.forwardRef(function FormInlineLabel(
  { className = "", ...props }: Props<"span">,
  ref
) {
  return React.createElement("span", {
    className: className + " w-form-label",
    ...props,
    ref,
  });
});

export default FormInlineLabel;
