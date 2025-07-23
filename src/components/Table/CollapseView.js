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
  onClickView,
  fieldImage
) {
  return (
    <>
      <div className="d-flex" style={{ fontFamily: "sans-serif" }}>
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
                <span className="ms-2 fw-light fw-bold">
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
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm text-primary"
            style={{ backgroundColor: "#D1D1D1E7" }}
            onClick={() => onClickItem(index)}
          >
            <i className="bi bi-pen-fill" /> EDIT
          </button>
          <button
            className="btn btn-sm text-white bg-primary"
            onClick={() => onClickView(index)}
          >
            <i className="bi bi-eye-fill" /> View
          </button>
        </div>
      )}
    </>
  );
}

export default CollapseView;
