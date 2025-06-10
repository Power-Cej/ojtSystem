const defaultProps = {
  schemas: [],
};

function OutputPointer({ field, object }) {
  const pointer = object[field];
  if (
    (pointer && field === "employee") ||
    (pointer && field === "assignedEmployee")
  ) {
    return ` ${pointer?.surname || ""} ${pointer?.Firstname || ""} ${
      pointer?.Middlename || ""
    }`;
  } else if (
    pointer &&
    (field === "requestType" || field === "loanType" || field === "area")
  ) {
    return pointer.name;
  } else if (pointer && (field === "position" || field === "positionTitle")) {
    return pointer.position_title;
  } else if (pointer && field === "user") {
    return `${pointer?.employee?.Firstname || ""} ${
      pointer?.employee?.Middlename || ""
    } ${pointer?.employee?.surname || ""}`;
  }
  return null;
}

OutputPointer.defaultProps = defaultProps;
export default OutputPointer;
