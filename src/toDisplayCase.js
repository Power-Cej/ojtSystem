function toDisplayCase(str) {
  // First, insert a space before all capital letters (for camelCase)
  str = str?.replace(/([A-Z])/g, " $1");
  // Replace underscores with spaces (for snake_case)
  str = str?.replace(/_/g, " ");
  // Split the string into words
  let words = str?.split(" ");
  // Capitalize the first letter of each word
  return words
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase())
    .join(" ");
}

export default toDisplayCase;
