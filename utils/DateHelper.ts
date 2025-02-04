export const conbertDateTo12HourFormat = (date: Date) => {
  const currentHour = new Date().getHours();
  let hours = date.getHours();

  if (hours === currentHour) return "Now";

  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours === 0 && 24 ? 12 : hours % 12;

  return `${hours} ${amPm}`;
};

export const getDayOfWeek = (date: Date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let today = new Date().getDate() === date.getDate();
  return [days[date.getDay()], today];
};
