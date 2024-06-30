const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getDay = (timestamp) => {
  let date = new Date(timestamp);

  return `${date.getDate()} ${months[date.getMonth()]}`;
};

export const getFullDay = (timestamp) => {
  let date = new Date(timestamp);

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
