import {
    FieldsIdBirth,
    FieldsIdCasttle,
    FieldsIdCheckUp,
    FieldsIdService,
    FieldsIdStaff,
    FieldsIdSupply,
    FieldsLabelsBirth,
    FieldsLabelsCasttle,
    FieldsLabelsCheckUp,
    FieldsLabelsService,
    FieldsLabelsStaff,
    FieldsLabelsSupply,
    InputProps,
} from '@/types';
import { genderSelect } from './genderSelect';
import { typeCasttleSelect } from './typeCastleSelect';
import { stateCasttleSelect } from './statesCasttleSelect';
import { typeServicesForCasttle } from './typesServicesForCasttle';

type FieldsCastle = Omit<InputProps, 'id' | 'label'> & {
    id: keyof typeof FieldsIdCasttle;
    label: keyof typeof FieldsLabelsCasttle;
    select?: { value: string | number; label: string }[];
};

type FieldsCheckUp = Omit<InputProps, 'id' | 'type' | 'label'> & {
    id: keyof typeof FieldsIdCheckUp;
    label: keyof typeof FieldsLabelsCheckUp;
};

type FieldsService = Omit<InputProps, 'id' | 'label'> & {
    id: keyof typeof FieldsIdService;
    label: keyof typeof FieldsLabelsService;
    select?: { value: string | number; label: string }[];
};

type FieldsBirth = Omit<InputProps, 'id' | 'label'> & {
    id: keyof typeof FieldsIdBirth;
    label: keyof typeof FieldsLabelsBirth;
    select?: { value: string | number; label: string }[];
};

type FieldsSupply = Omit<InputProps, 'id' | 'label'> & {
    id: keyof typeof FieldsIdSupply;
    label: keyof typeof FieldsLabelsSupply;
};

type FieldsStaff = Omit<InputProps, 'id' | 'label'> & {
    id: keyof typeof FieldsIdStaff;
    label: keyof typeof FieldsLabelsStaff;
};

export const formCastle: FieldsCastle[] = [
    { id: 'nombre', label: 'Nombre', required: true, type: 'text' },
    { id: 'numero', label: 'Numero', required: true, type: 'number' },
    {
        id: 'sexo',
        label: 'Sexo',
        required: true,
        type: 'select',
        select: genderSelect,
    },
    {
        id: 'tipo_id',
        label: 'Tipo',
        required: true,
        type: 'select',
        select: typeCasttleSelect,
    },
    {
        id: 'fecha_nacimiento',
        label: 'Fecha de nacimiento',
        required: false,
        type: 'date',
    },
    { id: 'origen', label: 'Origen', required: false, type: 'text' },
    {
        id: 'peso_actual',
        label: 'Peso actual',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'peso_destete',
        label: 'Peso de destete',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'peso_nacimiento',
        label: 'Peso de nacimiento',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'peso_2year',
        label: 'Peso de 2 años',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'fecha_defuncion',
        label: 'Fecha de defunción',
        required: false,
        type: 'date',
    },
    {
        id: 'causa_defuncion',
        label: 'Causa de defunción',
        required: false,
        type: 'text',
    },
    {
        id: 'estado_id',
        label: 'Estados',
        required: true,
        type: 'select',
        select: stateCasttleSelect,
    },
];

export const formCheckUp: FieldsCheckUp[] = [
    { id: 'diagnostico', label: 'Diagnostico', required: true },
    { id: 'tratamiento', label: 'Tratamiento', required: true },
];
export const formService: FieldsService[] = [
    { id: 'observacion', label: 'Observación', required: true, type: 'text' },
    {
        id: 'tipo',
        label: 'Tipo',
        required: true,
        type: 'select',
        select: typeServicesForCasttle,
    },
    {
        id: 'numero_toro',
        label: 'Numero del toro',
        required: true,
        type: 'number',
    },
];

export const formBirth: FieldsBirth[] = [
    { id: 'observacion', label: 'Observación', required: true, type: 'text' },
    { id: 'nombre', label: 'Nombre de la cría', required: true, type: 'text' },
    {
        id: 'numero',
        label: 'Numero de la cría',
        required: false,
        type: 'number',
    },
    {
        id: 'peso_nacimiento',
        label: 'Peso de nacimiento',
        required: true,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'sexo',
        label: 'Sexo',
        required: true,
        type: 'select',
        select: genderSelect,
    },
];

export const formSupply: FieldsSupply[] = [
    { id: 'insumo', label: 'Insumo', required: true, type: 'text' },
    { id: 'cantidad', label: 'Cantidad', required: true, type: 'text' },
    { id: 'precio', label: 'Precio', required: true, type: 'number' },
];
export const formStaff: FieldsStaff[] = [
    { id: 'ci', label: 'Cedula', required: true, type: 'number' },
    { id: 'nombre', label: 'Nombre', required: true, type: 'text' },
    { id: 'apellido', label: 'Apellido', required: true, type: 'text' },
    {
        id: 'fecha_nacimiento',
        label: 'Fecha de nacimiento',
        required: true,
        type: 'date',
    },
    { id: 'cargo', label: 'Cargo', required: true, type: 'text' },
];
