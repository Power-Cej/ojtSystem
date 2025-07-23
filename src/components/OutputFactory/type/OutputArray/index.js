function OutputArray({ field, object, collection }) {
  const value = object[field];
  const collectionType = collection.collection;
  if (!value) {
    return null; // Return null instead of an empty string to avoid rendering issues
  }

  return (
    <>
      {/* {collectionType === "daily_time_record" ? (
        <div className="d-flex gap-2 p-0">
          {value.map((item, index) => (
            <span
              key={index}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid orange",
                backgroundColor: "#fef4e8",
                color: "orange",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      ) : ( */}
      <div
        className="d-flex p-0"
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        {value.map((item, index) => (
          <span
            key={index}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid orange",
              backgroundColor: "#fef4e8",
              color: "orange",
            }}
          >
            {item}
          </span>
        ))}
      </div>
      {/* )} */}
    </>
  );
}

export default OutputArray;
