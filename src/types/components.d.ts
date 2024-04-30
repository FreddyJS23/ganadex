
import { FieldErrors,UseFormRegister } from 'react-hook-form';
import {
    ElementSidebar,
    EndContentInput,
    IconsModal,
    IconsSidebar,
    TitlesModals,
    URLS,
} from '.';
import { MutableRefObject } from 'react';

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
    content: string | number | undefined | null;
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
    size?: 'sm' | 'md' | 'lg';
    required: boolean;
    description?: string;
    endContent?: keyof typeof EndContentInput;
    /** Hook para control del input */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    /**Objeto con los campos que no pasen su validación, para asignar un clase error al label */
    errors: FieldErrors;
    defaultValue?:string
};

export type LayoutModalProps = {
    /**Body del modal   */
    children: JSX.Element;
    /**Titulo del modal   */
    titleModal: keyof typeof TitlesModals;
    dataHeader?: string | number;
    /**Icono del modal   */
    icon: keyof typeof IconsModal;
    /**Habilidar botones de registras y cancelar   */
    footer: boolean;
    refForm?: MutableRefObject<HTMLFormElement | null>;
    isOpen?: boolean;
    onOpen?: () => void;
    onOpenChange?: () => void;
};

export type ModalProps = Pick<
    LayoutModalProps,
    'isOpen' | 'onOpen' | 'onOpenChange' | 'dataHeader'
> & {
    dataBody?: string | number;
};
