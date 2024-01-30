import {ElementSidebar, IconsSidebar } from "."

/**opcion del sidebar */
export type SidebarElementProps = {
    /** Determina el nombre del elemento */
    element: keyof typeof ElementSidebar;
    /** Determina si el elemento tendra mas opciones */
    optionMultiple: boolean;
    /** Determina si el elemento es la opcion ganado */
    optionCattle?: boolean;
    /** Determina si el elemento  tendra un menu para responsive*/
    responsive: boolean;
    /** Icono del elemento */
    icon: keyof typeof IconsSidebar;
};

/** Detallar un item de informacion, que contiene un titulo y un contenido */
export type DetailsProps = {
    tittle:string
    content: string | number | Date | undefined | null 
};
