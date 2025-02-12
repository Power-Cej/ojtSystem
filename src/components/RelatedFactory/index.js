import React from "react";
import InputFactory from "../InputFactory";
import toDisplayCase from "../../toDisplayCase";

function randomString(length = 30) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function RelatedFactory({
  schema,
  object,
  onChange,
  field,
  defaultValue,
  disabled,
  ...props
}) {
  const [relations, setRelations] = React.useState([]);
  // set default value
  React.useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setRelations(defaultValue);
    } else {
      setRelations([{ id: randomString() }]);
    }
  }, [defaultValue]);

  function onClickAdd() {
    setRelations([...relations, { id: randomString() }]);
  }

  const onClickRemove = (index) => {
    const objects = [...relations];
    objects.splice(index, 1);
    setRelations(objects);
    onChange(objects);
  };

  function onChangeValue(index, value, field) {
    relations[index][field] = value;
    onChange(relations);
  }

  return (
    <div className="col-12">
      <hr />
      {relations.map((relation, index) => {
        return (
          <div key={relation.index} className="row g-3">
            {Object.keys(schema.fields).map((key) => {
              const { type, label, col, ...options } = schema.fields[key];
              if (options.hasOwnProperty("write") && !options.write)
                return null;

              const isRelatedType = options._type === "Related";

              const inputProps = {
                object: isRelatedType ? object : relation,
                field: key,
                onChange: onChangeValue.bind(this, index),
                type,
                className: "fs-sm",
                disabled: disabled,
                ...options,
              };

              return (
                <div
                  className={isRelatedType ? "" : col || "col-md-4"}
                  key={key}
                >
                  {!isRelatedType && (
                    <label className="form-label fs-sm mt-2">
                      {label || toDisplayCase(key)}
                    </label>
                  )}
                  {props.componentFactory ? (
                    React.createElement(props.componentFactory, inputProps)
                  ) : (
                    <InputFactory {...inputProps} />
                  )}
                </div>
              );
            })}

            <div className="pb-1 col mt-auto">
              <button
                disabled={disabled}
                onClick={onClickRemove.bind(this, index)}
                type="button"
                className="btn btn-link text-danger btn-sm fs-xs"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        );
      })}
      <button
        disabled={disabled}
        onClick={onClickAdd}
        type="button"
        className="btn btn-light btn-sm fs-xs mt-3 text-uppercase"
      >
        <i className="bi bi-plus me-2"></i>ADD MORE {toDisplayCase(field)}
      </button>
    </div>
  );
}

export default RelatedFactory;
