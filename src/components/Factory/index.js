import React from "react";
import InputRelation from "../InputRelation";
// import InputString from "../InputString";
// import InputPassword from "../InputPassword";
// import InputNumber from "../InputNumber";
// import InputText from "../InputText";
// import InputJson from "../InputJson";
// import InputImage from "../InputImage";
// import InputFile from "../InputFile";
// import InputSignature from "../InputSignature";
import InputPointer from "../InputPointer";
// import InputSelect from "../InputSelect";
// import InputIcon from "../InputIcon";
// import RelatedFactory from "../RelatedFactory";

import Input from "../Input";
import InputBoolean from "../InputBoolean";
import {
  InputString,
  InputPassword,
  InputNumber,
  InputText,
  InputJson,
  InputImage,
  InputFile,
  InputSignature,
  InputIcon,
} from "nq-component";
import RelatedFactory from "../RelatedFactory";
import InputSelect from "../InputSelect";

const defaultProps = {
  schemas: [],
};

function Factory({
  type,
  _type,
  field,
  object,
  schemas,
  onChange,
  required,
  _required,
  onProps,
  ...props
}) {
  const value = object && object[field];
  if (typeof onProps === "function") {
    props = onProps(props, object, field) || props;
  }
  const _onChange = (field, value) => {
    if (object) {
      object[field] = value;
    }
    onChange(value, field);
  };
  type = _type || type;
  switch (type) {
    case "Email":
    case "String":
      return (
        <InputString
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          type={type.toLowerCase()}
          required={_required || required}
          {...props}
        />
      );
    case "Password":
    case "InputPassword":
      return (
        <InputPassword
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "Number":
    case "Tel":
      return (
        <InputNumber
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "Text":
    case "InputText":
      return (
        <InputText
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "Relation":
      return (
        <InputRelation
          field={field}
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          schema={
            props.schema || schemas.find((s) => s.collection === props.target)
          }
          schemas={schemas}
          required={_required || required}
          {...props}
        />
      );
    case "Pointer":
      const schema =
        props.schema || schemas.find((s) => s.collection === props.target);
      if (!schema) return null;
      return (
        <InputPointer
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          schema={
            props.schema || schemas.find((s) => s.collection === props.target)
          }
          schemas={schemas}
          required={_required || required}
          {...props}
        />
      );
    case "Related":
    case "InputRelated":
      return (
        <RelatedFactory
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          schema={
            props.schema || schemas.find((s) => s.collection === props.target)
          }
          schemas={schemas}
          field={field}
          required={_required || required}
          {...props}
        />
      );
    case "Image":
    case "InputImage":
      return (
        <InputImage
          value={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "File":
    case "InputFile":
      return (
        <InputFile
          value={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "InputSignature":
    case "Signature":
      return (
        <InputSignature
          value={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "Boolean":
      return (
        <InputBoolean
          value={value}
          onChange={_onChange.bind(this, field)}
          field={field}
          required={_required || required}
          {...props}
        />
      );
    case "Object":
    case "Array":
      return (
        <InputJson
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "Enum":
    case "InputSelect":
      return (
        <InputSelect
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          placeholder={
            props.placeholder ||
            (props.dynamic ? "Select of type " : "Select ") +
              (props.label || field)
          }
          required={_required || required}
          {...props}
        />
      );
    case "Icon":
    case "InputIcon":
      return (
        <InputIcon
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "Date":
      return (
        <Input
          type={type.toLowerCase()}
          defaultValue={value && value.slice(0, 10)}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    case "Color":
      return (
        <Input
          className="form-control-color"
          type={type.toLowerCase()}
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
    default:
      return (
        <Input
          type={type.toLowerCase()}
          defaultValue={value}
          onChange={_onChange.bind(this, field)}
          required={_required || required}
          {...props}
        />
      );
  }
}

Factory.defaultProps = defaultProps;
export default Factory;
