export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // Add leading zero for months 1-9
  const day = `0${date.getDate()}`.slice(-2); // Add leading zero for days 1-9
  return `${year}-${month}-${day}`;
};
