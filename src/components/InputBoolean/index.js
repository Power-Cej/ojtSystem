import React from "react";
import Checkbox from "../Checkbox";
import toDisplayCase from "../../toDisplayCase";

const noop = () => {};
const defaultProps = {
  onChange: noop,
};

function InputBoolean({ id, field, label, value, defaultValue, ...props }) {
  return (
    <Checkbox
      id={id || field}
      label={label || toDisplayCase(field)}
      checked={value}
      defaultChecked={defaultValue}
      {...props}
    />
  );
}

InputBoolean.defaultProps = defaultProps;
export default InputBoolean;
