function OutputBoolean({ field, object }) {
  const value = object[field];
  if (value) {
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        Yes
      </div>
    );
  } else {
    return (
      <div
        style={{
          fontSize: "clamp(12px, 2vw, 1rem)",
        }}
      >
        No
      </div>
    );
  }
}

export default OutputBoolean;
