
const PersianDate = ({ isoDate }) => {
  const persianDate = new Intl.DateTimeFormat('fa-IR', {
    calendar: 'persian',
    dateStyle: 'full',
  }).format(new Date(isoDate));

  return <div>{persianDate}</div>;
};

export default PersianDate;
