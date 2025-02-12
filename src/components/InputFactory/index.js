import React from "react";

import { findObjectUseCase, saveObjectUseCase } from "../../usecases/object";
import { saveFileUseCase, saveImageUseCase } from "../../usecases/file";
import Context from "../../AppContext";
import InputJson from "../InputJson";
import RelatedFactory from "../RelatedFactory";
import Factory from "../Factory";

const defaultProps = {};

function InputFactory({
  type,
  _type,
  field,
  required,
  _required,
  object,
  onChange,
  onError,
  ...props
}) {
  const context = React.useContext(Context);
  const value = object && object[field];

  function _onChange(field, value) {
    if (object) {
      object[field] = value;
    }
    onChange(value, field);
  }

  switch (_type || type) {
    case "Related":
      return (
        <RelatedFactory
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          schema={
            props.schema ||
            context.schemas.find((s) => s.collection === props.target)
          }
          schemas={context.schemas}
          field={field}
          {...props}
        />
      );
    case "JsonEditor":
      return (
        <InputJson
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          onError={onError}
          required={_required || required}
          {...props}
        />
      );
    default:
      return (
        <Factory
          type={type}
          _type={_type}
          field={field}
          object={object}
          schemas={context.schemas}
          onChange={onChange}
          findObject={findObjectUseCase()}
          saveObject={saveObjectUseCase()}
          saveImage={saveImageUseCase()}
          saveFile={saveFileUseCase()}
          {...props}
        />
      );
  }
}

InputFactory.defaultProps = defaultProps;
export default InputFactory;
