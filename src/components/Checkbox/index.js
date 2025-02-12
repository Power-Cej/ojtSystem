import React from "react";
import classNames from "../../classNames";

function noop() {}

const defaultProps = {
  onChange: noop,
  type: "checkbox",
};

function Checkbox({ className, onChange, label, type, ...props }) {
  const classes = classNames("form-check", className);
  const _onChange = (event) => {
    onChange(event.target.checked);
  };
  return (
    <div className={classes}>
      <input
        type={type}
        className="form-check-input"
        onChange={_onChange}
        {...props}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {label}
      </label>
    </div>
  );
}

Checkbox.defaultProps = defaultProps;
export default Checkbox;
