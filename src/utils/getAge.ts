export const getAge = (fecha: string) => {
  const fechaActual = new Date();
  const fechaNacimiento = new Date(fecha);
  const ageYear = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  const ageMonth = fechaActual.getMonth() - fechaNacimiento.getMonth();
  const ageDays = fechaActual.getDate() - fechaNacimiento.getDate();

  if (ageYear != 0) return `${ageYear} ${ageYear == 1 ? "año" : "años"}`;
  else if (ageMonth + 1 != 0)
    return `${ageMonth} ${ageMonth == 1 ? "mes" : "meses"}`;
  else if (ageDays != 0) return `${ageDays} ${ageDays == 1 ? "dia" : "días"}`;
};
