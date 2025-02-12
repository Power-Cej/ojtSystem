import { OutputFactory } from "nq-component";
import React from "react";
// import OutputFactory from "../OutputFactory";

function CollapseView(
  index,
  object,
  excludeFields,
  fields,
  actions,
  onClickItem,
  fieldImage
) {
  return (
    <>
      <div className="d-flex">
        {fieldImage && (
          <div
            className="mb-3"
            style={{
              width: "100px",
              height: "100px",
            }}
          >
            <img
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              src={object[fieldImage]}
            />
          </div>
        )}
        <ul className="list-unstyled ms-1">
          {Object.keys(fields).map((field) => {
            const options = fields[field];
            if (options._type === "Image") return null;
            if (options.detail !== true && excludeFields.includes(field))
              return null;
            const output = (
              <OutputFactory field={field} object={object} {...options} />
            );
            if (!output) return null;
            return (
              <li key={field}>
                <span className="ms-2 fw-light">
                  {options.label || field}:{" "}
                </span>
                <span className="fs-sm text-nowrap">{output}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {actions.length > 0 ? (
        actions.map((action) => (
          <button
            className={
              action.className
                ? action.className
                : "btn btn-primary btn-sm ms-2"
            }
            onClick={() => action.onClick(index)}
          >
            {action.label}
          </button>
        ))
      ) : (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onClickItem(index)}
        >
          EDIT
        </button>
      )}
    </>
  );
}

export default CollapseView;
