const digits = (digit) =>
  (digit.toString().length === 1) ? `0${digit}` : digit;

module.exports = (date) => {
  const d = new Date(date);
  return `${digits(d.getUTCMonth() + 1)}/${digits(d.getUTCDate())}
   - ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
};
