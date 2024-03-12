import { ElementSidebar, EndContentInput, IconsModal, IconsSidebar, TitlesModals, URLS } from '.';

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
    /** Url del elemento */
    url: keyof typeof URLS;
};

/** Detallar un item de informacion, que contiene un titulo y un contenido */
export type DetailsProps = {
    tittle: string;
    content: string | number | Date | undefined | null;
};

export type InputProps = {
    id: string;
    label: string;
    type:
        | 'text'
        | 'search'
        | 'url'
        | 'tel'
        | 'email'
        | 'password'
        | 'select'
        | 'date'
        | 'number';
    required: boolean;
    description?: string;
    endContent?: keyof typeof EndContentInput;
};

export type LayoutModalProps = {
    /**Body del modal   */
    children: JSX.Element;
    /**Titulo del modal   */
    titleModal:keyof typeof TitlesModals;
    dataHeader?: string | number;
    /**Icono del modal   */
    icon: keyof typeof IconsModal;
    /**Habilidar botones de registras y cancelar   */
    footer: boolean;

    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
};

export type ModalProps = Pick<LayoutModalProps,'isOpen' | 'onOpen' | 'onClose' | 'onOpenChange' | 'dataHeader'> & {
    dataBody?: string | number;
};