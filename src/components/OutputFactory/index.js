import React from "react";
import OutputString from "./type/OutputString";
import OutputDate from "./type/OutputDate";
import OutputBoolean from "./type/OutputBoolean";
import OutputImage from "./type/OutputImage";
import OutputPointer from "./type/OutputPointer";
import OutputArray from "./type/OutputArray";

function OutputFactory({
  type,
  _type,
  field,
  object,
  refetch,
  collection,
  ...options
}) {
  // console.warn("oooooOOO: ", type);
  switch (_type || type) {
    case "Email":
    case "String":
    case "Text":
    case "Number":
    case "Tel":
    case "Enum":
    case "parseNumber":
    case "DecemalNum":
    case "time":
      return (
        <OutputString
          field={field}
          object={object}
          refetch={refetch}
          collection={collection}
          {...options}
        />
      );
    case "Boolean":
      return <OutputBoolean field={field} object={object} {...options} />;
    case "Date":
      return <OutputDate field={field} object={object} {...options} />;
    case "Image":
      return <OutputImage field={field} object={object} {...options} />;
    case "Pointer":
    case "inputPointer":
      return <OutputPointer field={field} object={object} {...options} />;
    case "Component":
      return (
        <div
          style={{
            fontSize: "clamp(12px, 2vw, 1rem)",
          }}
        >
          {object[field]}
        </div>
      );
    case "Array":
      return (
        <OutputArray
          field={field}
          object={object}
          {...options}
          collection={collection}
        />
      );
    default:
      return null;
  }
}

export default OutputFactory;
