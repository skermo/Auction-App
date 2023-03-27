function parseNum(num) {
  return parseFloat(num).toFixed(2);
}


function convertDate(firstDate, secondDate) {
  const date1 = new Date(firstDate).getTime();
  const date2 = new Date(secondDate).getTime();
  const daysBetween = Math.floor(Math.abs(date2 - date1) / (1000 * 3600 * 24));
  const weeks = Math.floor(daysBetween / 7);
  const days = daysBetween - weeks * 7;
  return [weeks, days];
}

export const utils = {
  parseNum,
  convertDate,




};
