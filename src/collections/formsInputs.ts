import { FieldsIdCasttle, FieldsIdCheckUp, FieldsLabelsCasttle, FieldsLabelsCheckUp, InputProps } from '@/types';
import { genderSelect } from './genderSelect';
import { typeCasttleSelect } from './typeCastleSelect';
import { stateCasttleSelect } from './statesCasttleSelect';

type FieldsCastle = Omit<InputProps, 'id' | 'label'> & {
    id: keyof typeof FieldsIdCasttle;
    label: keyof typeof FieldsLabelsCasttle;
    select?: { value: string | number; label: string }[];
};

type FieldsCheckUp = Omit<InputProps, 'id'| 'type' | 'label'> & {
    id: keyof typeof FieldsIdCheckUp;
    label: keyof typeof FieldsLabelsCheckUp;
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
        endContent:'weight'
    },
    {
        id: 'peso_destete',
        label: 'Peso de destete',
        required: false,
        type: 'number',
        endContent:'weight'
    },
    {
        id: 'peso_nacimiento',
        label: 'Peso de nacimiento',
        required: false,
        type: 'number',
        endContent:'weight'
    },
    {
        id: 'peso_2year',
        label: 'Peso de 2 años',
        required: false,
        type: 'number',
        endContent:'weight'
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

export const formCheckUp:FieldsCheckUp[]=[
    {id:'diagnostico',label:'Diagnostico', required:true},
    {id:'tratamiento',label:'Tratamiento', required:true}
]