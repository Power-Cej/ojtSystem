import React from "react";
import classNames from "../../classNames";

const defaultProps = {};

function Input({ className, onChange, ...props }) {
  function onInput(e) {
    const value = e.target.value;
    onChange(value);
  }

  return (
    <input
      className={classNames("form-control", className)}
      onInput={onInput}
      {...props}
    />
  );
}

Input.defaultProps = defaultProps;

export default Input;
