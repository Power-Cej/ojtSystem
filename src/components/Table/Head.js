import React from "react";
// import Checkbox from "../Checkbox";
// import toDisplayCase from "../toDisplayCase";
import { Checkbox, toDisplayCase } from "nq-component";

function Head({
  selectable,
  fields,
  excludeFields,
  actionsList,
  selected,
  onSelectAll,
  objects,
}) {
  return (
    <tr style={{ backgroundColor: "#006BAC" }}>
      {selectable && (
        <th
          style={{
            backgroundColor: "#006BAC",
            color: "white",
            borderRadius: "10px 0 0 0",
          }}
        >
          <Checkbox
            className="align-middle"
            id="check_all"
            checked={objects.length === selected.length && objects.length !== 0}
            onChange={(checked) => onSelectAll(checked)}
          />
        </th>
      )}
      {Object.keys(fields).map((field, index) => {
        const { type, ...options } = fields[field];
        if (excludeFields.includes(field)) return null;
        const label = options.label || toDisplayCase(field);
        return (
          <th
            style={{
              backgroundColor: "#006BAC",
              color: "white",
              borderRadius: "0",
              fontSize: "clamp(12px, 2vw, 1rem)",
            }}
            key={field}
            className="fs-xs align-middle text-nowrap"
          >
            {label}
          </th>
        );
      })}
      {actionsList.length > 0 && (
        <>
          <th
            style={{
              backgroundColor: "#006BAC",
              borderRadius: "10px",
            }}
          >
            <div style={{ width: "50px" }}></div>
          </th>
          <th
            className="fs-xs align-middle text-nowrap"
            colSpan={actionsList.length}
            style={{
              borderRadius: "10px",
              fontSize: "clamp(12px, 2vw, 1rem)",
            }}
          >
            ACTIONS
          </th>
        </>
      )}

      <>
        {/* <th>
          <div style={{ width: "50px" }}></div>
        </th> */}
        <th
          className="fs-xs align-middle text-nowrap"
          style={{
            backgroundColor: "#006BAC",
            color: "white",
            borderRadius: "0px 10px 0px 0px",
          }}
          colSpan={actionsList.length}
        >
          {objects[0]?.roles?.[0]?.name ? "Role" : null}
        </th>
      </>
    </tr>
  );
}

export default Head;
