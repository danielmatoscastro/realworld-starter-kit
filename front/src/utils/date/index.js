export const formatDate = (date) => {
  const dateNew = new Date(date);
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(dateNew);
};

export default formatDate;
