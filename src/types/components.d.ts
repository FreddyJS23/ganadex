import { ElementSidebar, IconsSidebar, TypeNotification } from "."

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
