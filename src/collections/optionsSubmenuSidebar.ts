/**Lista de opciones que se podrán realizar en el elemento */
type OptionsSubmenu = {
  /** Nombre de la opción */
  option: string;
  /** URL de la opción */
  link: "/registrar" | "";
};

export const options: OptionsSubmenu[] = [
  { option: "Registrar", link: "/registrar" },
];
