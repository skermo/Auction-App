function parseNum(num) {
  return parseFloat(num).toFixed(2);
}

function addFloats(num1, num2) {
  return parseNum(parseFloat(num1) + parseFloat(num2));
}

function hasDatePassed(inputDate) {
  const now = new Date();
  const date = new Date(inputDate);
  if (date < now) {
    return true;
  } else return false;
}

function shortenName(name) {
  if (name) {
    if (name.length < 24) {
      return name;
    }
    return name.substring(0, 20) + "...";
  }
}

function convertDate(endDate) {
  const date1 = new Date().getTime();
  const date2 = new Date(endDate).getTime();

  const timeInMinutes = Math.floor(Math.abs(date2 - date1) / (1000 * 60));
  const timeInHours = Math.floor(timeInMinutes / 60);
  const timeInDays = Math.floor(timeInHours / 24);
  const timeInWeeks = Math.floor(timeInDays / 7);

  const days = timeInDays - timeInWeeks * 7;
  const hours = timeInHours - timeInDays * 24;
  const minutes = timeInMinutes - timeInHours * 60;

  if (timeInWeeks > 0) {
    if (days > 0) {
      return `${timeInWeeks} weeks and ${days} days`;
    } else {
      return `${timeInWeeks} weeks`;
    }
  } else if (days > 0) {
    if (hours > 0) {
      return `${days} days and ${hours} hours`;
    } else {
      return `${days} days`;
    }
  } else {
    if (hours > 0 && minutes > 0) {
      return `${hours} hours and ${minutes} minutes`;
    } else if (hours > 0 && minutes < 1) {
      return `${hours} hours`;
    } else {
      return `${minutes} minutes`;
    }
  }
}

export const utils = {
  parseNum,
  addFloats,
  hasDatePassed,
  convertDate,
  shortenName,
};
