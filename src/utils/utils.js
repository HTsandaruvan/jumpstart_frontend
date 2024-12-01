export const formatDate = (inputDate) => {
  const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', options);
}

export const detailFormatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate;
}