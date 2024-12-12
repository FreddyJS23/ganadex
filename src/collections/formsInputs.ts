import {
    FieldsIdBeef,
    FieldsIdBirth,
    FieldsIdBull,
    FieldsIdCasttle,
    FieldsIdCheckUp,
    FieldsIdDeadCattle,
    FieldsIdPajuelaToro,
    FieldsIdSaleCattle,
    FieldsIdService,
    FieldsIdStaff,
    FieldsIdSupply,
    FieldsIdVaccinationDay,
    FieldsLabelsBeef,
    FieldsLabelsBirth,
    FieldsLabelsBull,
    FieldsLabelsCasttle,
    FieldsLabelsCheckUp,
    FieldsLabelsDeadCattle,
    FieldsLabelsPajuelaToro,
    FieldsLabelsSaleCattle,
    FieldsLabelsService,
    FieldsLabelsStaff,
    FieldsLabelsSupply,
    FieldsLabelsVaccinationDay,
    InputProps,
} from '@/types';
import { genderSelect } from './genderSelect';
import { typeCasttleSelect } from './typeCastleSelect';
import { stateCasttleSelect } from './statesCasttleSelect';
import { typeServicesForCasttle } from './typesServicesForCasttle';

type FieldsCastle = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdCasttle;
    label: keyof typeof FieldsLabelsCasttle;
    select?: { value: string | number; label: string }[];
};

type FieldsBull = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdBull;
    label: keyof typeof FieldsLabelsBull;
    select?: { value: string | number; label: string }[];
};

type FieldsBeef = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdBeef;
    label: keyof typeof FieldsLabelsBeef;
    select?: { value: string | number; label: string }[];
};

type FieldsCheckUp = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdCheckUp;
    label: keyof typeof FieldsLabelsCheckUp;
};

type FieldsService = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdService;
    label: keyof typeof FieldsLabelsService;
    select?: { value: string | number; label: string }[];
};

type FieldsBirth = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdBirth;
    label: keyof typeof FieldsLabelsBirth;
    select?: { value: string | number; label: string }[];
};

type FieldsSupply = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdSupply;
    label: keyof typeof FieldsLabelsSupply;
};

type FieldsStaff = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdStaff;
    label: keyof typeof FieldsLabelsStaff;
};

type FieldsDeadCattle = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdDeadCattle;
    label: keyof typeof FieldsLabelsDeadCattle;
};

type FieldsSaleCattle = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdSaleCattle;
    label: keyof typeof FieldsLabelsSaleCattle;
};

type FieldsPajuelaToro = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdPajuelaToro;
    label: keyof typeof FieldsLabelsPajuelaToro;
};

type FieldsVaccinationDay = Pick<InputProps, 'type' | 'endContent' | 'required'> & {
    id: keyof typeof FieldsIdVaccinationDay;
    label: keyof typeof FieldsLabelsVaccinationDay;
};


export const formCastle: FieldsCastle[] = [
    { id: 'nombre', label: 'Nombre', required: true, type: 'text' },
    { id: 'numero', label: 'Numero', required: true, type: 'number' },
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
        id: 'peso_nacimiento',
        label: 'Peso de nacimiento',
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
        id: 'peso_2year',
        label: 'Peso de 2 años',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'peso_actual',
        label: 'Peso actual',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'estado_id',
        label: 'Estados',
        required: true,
        type: 'select',
        select: stateCasttleSelect,
    },
];
export const formBull: FieldsBull[] = [
    { id: 'nombre', label: 'Nombre', required: true, type: 'text' },
    { id: 'numero', label: 'Numero', required: true, type: 'number' },
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
        id: 'peso_nacimiento',
        label: 'Peso de nacimiento',
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
        id: 'peso_2year',
        label: 'Peso de 2 años',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'peso_actual',
        label: 'Peso actual',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
];
export const formBeef: FieldsBeef[] = [
    { id: 'nombre', label: 'Nombre', required: true, type: 'text' },
    { id: 'numero', label: 'Numero', required: true, type: 'number' },
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
        id: 'peso_nacimiento',
        label: 'Peso de nacimiento',
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
        id: 'peso_2year',
        label: 'Peso de 2 años',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
    {
        id: 'peso_actual',
        label: 'Peso actual',
        required: false,
        type: 'number',
        endContent: 'weight',
    },
];

export const formCheckUp: FieldsCheckUp[] = [
    { id: 'diagnostico', label: 'Diagnostico', required: true, type: 'text' },
    { id: 'tratamiento', label: 'Tratamiento', required: true, type: 'text' },
    { id: 'personal_id', label: 'Veterinario', required: true, type: 'select' },
    { id: 'fecha', label: 'Fecha', required: true, type: 'date' },
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
    { id: 'personal_id', label: 'Veterinario', required: true, type: 'select' },
    { id: 'fecha', label: 'Fecha', required: true, type: 'date' },
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
        type: 'text',
        endContent: 'weight',
    },
    {
        id: 'sexo',
        label: 'Sexo',
        required: true,
        type: 'select',
        select: genderSelect,
    },
    { id: 'fecha', label: 'Fecha', required: true, type: 'date' },
    { id: 'personal_id', label: 'Veterinario', required: true, type: 'select' },
];

export const formSupply: FieldsSupply[] = [
    { id: 'insumo', label: 'Insumo', required: true, type: 'text' },
    { id: 'cantidad', label: 'Cantidad', required: true, type: 'number' },
    { id: 'precio', label: 'Precio', required: true, type: 'number' },
];
export const formStaff: FieldsStaff[] = [
    { id: 'ci', label: 'Cedula', required: true, type: 'number' },
    { id: 'nombre', label: 'Nombre', required: true, type: 'text' },
    { id: 'telefono', label: 'Telefono', required: true, type: 'tel' },
    { id: 'apellido', label: 'Apellido', required: true, type: 'text' },
    {
        id: 'fecha_nacimiento',
        label: 'Fecha de nacimiento',
        required: true,
        type: 'date',
    },
    { id: 'cargo_id', label: 'Cargo', required: true, type: 'select' },
];
export const formDeadCattle: FieldsDeadCattle[] = [
    { id: 'fecha', label: 'Fecha de defunción', required: true, type: 'date' },
    { id: 'causa', label: 'Causa de defunción', required: true, type: 'text' },
];

export const formSaleCattle: FieldsSaleCattle[] = [
    { id: 'precio', label: 'Precio', required: true, type: 'number' },
    { id: 'fecha', label: 'Fecha de venta', required: true, type: 'date' },
    {
        id: 'comprador_id',
        label: 'Compradores',
        required: true,
        type: 'select',
    },
];


export const formPajuelaToro: FieldsPajuelaToro[] = [
    { id: 'codigo', label: 'Codigo', required: true, type: 'text' },
];

export const formVaccinationDay: FieldsVaccinationDay[] = [
    { id: 'fecha_inicio', label: 'Fecha de inicio', required: true, type: 'date' },
    { id: 'fecha_fin', label: 'Fecha fin', required: true, type: 'date' },
    { id: 'vacuna_id', label: 'Vacuna', required: true, type: 'select' },
];