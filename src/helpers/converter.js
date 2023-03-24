export const getDayfromDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "short" };
  const dayName = date.toLocaleDateString("en-US", options);
  //   console.log(dayName); // Output: Friday
  return dayName;
};
