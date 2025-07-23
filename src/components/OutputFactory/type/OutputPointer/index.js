const defaultProps = {
  schemas: [],
};

function OutputPointer({ field, object }) {
  const pointer = object[field];
  if (
    (pointer && field === "employee") ||
    (pointer && field === "assignedEmployee")
  ) {
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        ` ${pointer?.surname || ""} ${pointer?.Firstname || ""} $
        {pointer?.Middlename || ""}`;
      </div>
    );
  } else if (
    pointer &&
    (field === "requestType" || field === "loanType" || field === "area")
  ) {
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        {pointer.name}
      </div>
    );
  } else if (pointer && (field === "position" || field === "positionTitle")) {
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        {pointer.position_title}
      </div>
    );
  } else if (pointer && field === "user") {
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        `${pointer?.employee?.Firstname || ""} $
        {pointer?.employee?.Middlename || ""} $
        {pointer?.employee?.surname || ""}`;
      </div>
    );
  }
  return null;
}

OutputPointer.defaultProps = defaultProps;
export default OutputPointer;
