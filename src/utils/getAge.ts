/** Función que devuelve la edad del animal a partir de su fecha de nacimiento
 * @param fecha fecha de nacimiento del animal formato dd/mm/yyyy(d-m-a)
 */
export const getAge = (fecha: string) => {
  const fechaArray = fecha.split("-");
  //ya que el formato de fecha es dd-mm-aaaa hay que convertir a aaaa-mm-dd para el date
  const fechaFormato =
    fechaArray[2] + "-" + fechaArray[1] + "-" + fechaArray[0];

  const fechaActual = new Date();
  const fechaNacimiento = new Date(fechaFormato);
  const ageYear = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  const ageMonth = fechaActual.getMonth() - fechaNacimiento.getMonth();
  const ageDays = fechaActual.getDate() - fechaNacimiento.getDate();

  if (ageYear != 0) return `${ageYear} ${ageYear == 1 ? "año" : "años"}`;
  else if (ageMonth + 1 != 0)
    return `${ageMonth} ${ageMonth == 1 ? "mes" : "meses"}`;
  else if (ageDays != 0) return `${ageDays} ${ageDays == 1 ? "dia" : "días"}`;
};
