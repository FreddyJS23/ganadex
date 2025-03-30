/** formato año-mes-dia  */
export const getDateNow = () => {
  const dateNow = new Date();
  /* Y-m-d */
  const [formatDate] = dateNow.toISOString().split("T");

  return formatDate;
};
