function OutputDate({ field, object }) {
  const value = object[field];
  if (value) {
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        {new Date(value).toLocaleDateString("en-US", { dateStyle: "medium" })}
      </div>
    );
  }
  return null;
}

export default OutputDate;
