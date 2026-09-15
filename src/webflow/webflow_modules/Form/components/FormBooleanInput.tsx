"use client";
import React from "react";
import { onKeyDownInputHandlers } from "../helpers/formUtils";
import { FormInputProps } from "./FormTextInput";

const HIDE_DEFAULT_INPUT_STYLES = {
  opacity: 0,
  position: "absolute",
  zIndex: -1,
} as React.CSSProperties;
const CHECKED_CLASS = "w--redirected-checked";
const FOCUSED_CLASS = "w--redirected-focus";
const FOCUSED_VISIBLE_CLASS = "w--redirected-focus-visible";

const FormBooleanInput = React.forwardRef(function FormBooleanInput(
  {
    className = "",
    checked = false,
    type = "checkbox",
    inputType,
    customClassName,
    form: _form,
    ...props
  }: FormInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [isChecked, setIsChecked] = React.useState(checked);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFocusedVisible, setIsFocusedVisible] = React.useState(false);
  const wasClicked = React.useRef(false);

  const inputProps = {
    checked: isChecked,
    type,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) props.onChange(e);
      setIsChecked((prevIsChecked) => !prevIsChecked);
    },
    onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      if (props.onClick) props.onClick(e);
      wasClicked.current = true;
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.onFocus) props.onFocus(e);
      setIsFocused(true);
      if (!wasClicked.current) {
        setIsFocusedVisible(true);
      }
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.onBlur) props.onBlur(e);
      setIsFocused(false);
      setIsFocusedVisible(false);
      wasClicked.current = false;
    },
    onKeyDown: onKeyDownInputHandlers,
  };

  if (inputType === "custom") {
    const pseudoModeClasses = `${isChecked ? ` ${CHECKED_CLASS}` : ""}${
      isFocused ? ` ${FOCUSED_CLASS}` : ""
    }${isFocusedVisible ? ` ${FOCUSED_CLASS} ${FOCUSED_VISIBLE_CLASS}` : ""} ${
      customClassName ?? ""
    }`;

    const currentClassName = `${className}${pseudoModeClasses}`;
    return (
      <>
        <div className={currentClassName} />
        <input
          ref={ref}
          {...props}
          {...inputProps}
          style={HIDE_DEFAULT_INPUT_STYLES}
        />
      </>
    );
  }

  return <input ref={ref} className={className} {...props} {...inputProps} />;
});

export default FormBooleanInput;
