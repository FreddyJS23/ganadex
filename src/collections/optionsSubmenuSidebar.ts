/**Lista de opciones que se podrán realizar en el elemento */
 type OptionsSubmenu = {
    /** Nombre de la opcion */
    option: string;
    /** URL de la opcion */
    link: '/registrar' | '/ver';
};

export const options: OptionsSubmenu[] = [
    { option: "Registrar", link: "/registrar" },
    { option: "Ver", link: "/ver" },
];