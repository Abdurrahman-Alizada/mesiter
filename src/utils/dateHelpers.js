export const getDateByFormated = (date) => {
  // return date
  //     ? `${date.getDate()}/${
  //         date.getMonth() + 1
  //     }/${date.getFullYear()}`
  //     : ''
  return date
    ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    : "";
};

export const getMonthNameFromDate = (date) => {
  // return date
  //     ? `${date.getDate()}/${
  //         date.getMonth() + 1
  //     }/${date.getFullYear()}`
  //     : ''

  return date.toLocaleString("en-US", { month: "long" });
};

export const getTotalDaysofMonth = (year, month) => {
  const nextMonth = new Date(year, month + 1, 1);

  // Subtract one day to get the last day of the previous month
  nextMonth.setDate(nextMonth.getDate() - 1);

  const totalDaysInMonth = nextMonth.getDate();
  return totalDaysInMonth;
};

export const getHourFromDate = (date) => {
  // return date
  //     ? `${date.getDate()}/${
  //         date.getMonth() + 1
  //     }/${date.getFullYear()}`
  //     : ''
  return date
    ? `${date.getHours() % 12} ${date.getHours() > 12 ? "PM" : "AM"}  `
    : "";
};

export const getHourWithMinutesFromDate = (date) => {
  // return date
  //     ? `${date.getDate()}/${
  //         date.getMonth() + 1
  //     }/${date.getFullYear()}`
  //     : ''
  return date
    ? `${
        date.getHours() % 12 > 9
          ? date.getHours() % 12
          : "0" + (date.getHours() % 12)
      } : ${
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
      }${date.getHours() > 12 ? " PM" : " AM"}  `
    : "";
};

export const formatDate = (dateToFormate) => {
  if (dateToFormate) {
    const date = dateToFormate.toDate();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const formattedDate = `${day}-${month}-${date.getFullYear()}`;
    return formattedDate;
  }
  return "";
};

export const formatTime = (time) => {
  if (time) {
    const date = time.toDate(); // Convert Firestore Timestamp to JavaScript Date
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  }
  return "";
};
