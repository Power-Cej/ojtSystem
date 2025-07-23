import { Button } from "nq-component";
import UpsertUseCase from "../../../../usecases/object/UpsertUseCase";

const defaultProps = {
  keys: [],
};

const upsertUserCase = () => {
  return new UpsertUseCase();
};

const handleStatusClick = (object, refetch, collection) => async (update) => {
  try {
    const updateStatus = { ...object, status: update };
    await upsertUserCase().execute(collection.collection, updateStatus);
    refetch();
  } catch (error) {
    console.error("Error Status: ", error);
  }
};

function OutputString({ field, object, keys, refetch, collection }) {
  const value = object[field];
  if (value && typeof value !== "object") {
    const isActive = value === "active";
    const isInActive = value === "inactive";
    const isGood =
      value === "Good" ||
      value === "Done" ||
      value === "Approved" ||
      value === "Printed" ||
      value === "online";
    const isListed = value === "Enroll" || value === "Enrolled";
    const isBad =
      value === "Bad" || value === "Cancelled" || value === "Rejected";
    const newValue = value === "New";
    const ongoing =
      value === "Ongoing" ||
      value === "In-Progress" ||
      value === "Pending" ||
      value === "pending" ||
      value === "For Processing" ||
      value === "Ready to Print" ||
      value === "offline";

    const getStatusStyles = (isGood, isListed, isBad, ongoing, newValue) => {
      if (isGood) {
        return {
          border: "1px solid green",
          backgroundColor: "#d7e3d1",
          whiteSpace: "nowrap",
          color: "green",
        };
      }
      if (isListed) {
        return {
          border: "1px solid blue",
          backgroundColor: "#edf5fe",
          whiteSpace: "nowrap",
          color: "blue",
        };
      }
      if (isBad) {
        return {
          border: "1px solid red",
          whiteSpace: "nowrap",
          backgroundColor: "#eacccc",
          color: "red",
        };
      }
      if (ongoing) {
        return {
          border: "1px solid orange",
          whiteSpace: "nowrap",
          backgroundColor: "#fef4e8",
          color: "orange",
        };
      }
      if (newValue) {
        return {
          border: "1px solid black",
          whiteSpace: "nowrap",
          backgroundColor: "#e5e5e5",
          color: "black",
        };
      }
      return {};
    };

    if (field === "status" && (isActive || isInActive)) {
      return (
        <Button
          onClick={
            isActive
              ? () => handleStatusClick(object, refetch, collection)("inactive")
              : isInActive
              ? () => handleStatusClick(object, refetch, collection)("active")
              : null
          }
          className="btn btn-outline-primary btn-sm fs-xs shadow-none mybtn"
        >
          <i
            className={
              isActive
                ? "bi bi-toggle-on"
                : isInActive
                ? "bi bi-toggle-off"
                : null
            }
          />
        </Button>
      );
    } else if (
      (field === "type" || field === "stats") &&
      (isGood || isListed || isBad || newValue || ongoing)
    ) {
      return (
        <div className="d-flex">
          <span
            style={{
              ...getStatusStyles(isGood, isListed, isBad, ongoing, newValue),
              borderRadius: "5px",
              padding: "2px 10px",
            }}
          >
            {value}
          </span>
        </div>
      );
    }
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  const values = [];
  keys.forEach((key) => {
    const v = object[key];
    if (v && typeof v !== "object") {
      values.push(v);
    }
  });
  return values.join(" ");
}

OutputString.defaultProps = defaultProps;

export default OutputString;
