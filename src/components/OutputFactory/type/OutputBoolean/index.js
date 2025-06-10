function OutputBoolean({ field, object }) {
  const value = object[field];
  if (value) {
    return "Yes";
  } else {
    return "No";
  }
}

export default OutputBoolean;
