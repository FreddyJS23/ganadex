import {
  FieldsIdBeef,
  FieldsIdBirth,
  FieldsIdBull,
  FieldsIdCalfCastle,
  FieldsIdCasttle,
  FieldsIdCheckUp,
  FieldsIdDeadCattle,
  FieldsIdPajuelaToro,
  FieldsIdSaleCattle,
  FieldsIdService,
  FieldsIdStaff,
  FieldsIdSupply,
  FieldsIdVaccinationDay,
  FieldsIdWheightMilk,
  FieldsLabelsBeef,
  FieldsLabelsBirth,
  FieldsLabelsBull,
  FieldsLabelsCalfCastle,
  FieldsLabelsCasttle,
  FieldsLabelsCheckUp,
  FieldsLabelsDeadCattle,
  FieldsLabelsIdWheightMilk,
  FieldsLabelsPajuelaToro,
  FieldsLabelsSaleCattle,
  FieldsLabelsService,
  FieldsLabelsStaff,
  FieldsLabelsSupply,
  FieldsLabelsVaccinationDay,
  FieldsLabelsWeights,
  InputProps,
  Pesos,
  TooltipsProps,
} from "@/types";
import { genderSelect } from "./genderSelect";
import { typeCasttleSelect } from "./typeCastleSelect";
import { stateCasttleSelect } from "./statesCasttleSelect";
import { typeServicesForCasttle } from "./typesServicesForCasttle";
import { stateBullSelect } from "./statesBullSelect";
import { stateBeefSelect } from "./statesBeefSelect";
import { origenCasttleSelect } from "./origenCastleSelect";
import { Field } from "react-hook-form";

export type Fields<Ids,Labels>={
  id:Ids;
  label:Labels;
  select?: { value: string | number; label: string }[];
  tooltipTipoGanado?: boolean;
  } & Pick<InputProps, "type" | "endContent" | "required"> 
  

export const formWeights: Fields<keyof Pesos,keyof typeof FieldsLabelsWeights>[] = [
  {
    id: "peso_nacimiento",
    label: "Peso de nacimiento",
    required: true,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_destete",
    label: "Peso de destete",
    required: true,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_2year",
    label: "Peso de 2 años",
    required: true,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_actual",
    label: "Peso actual",
    required: true,
    type: "number",
    endContent: "weight",
  },
];



export const formCastle: Fields<keyof typeof FieldsIdCasttle,keyof typeof FieldsLabelsCasttle>[] = [
  { id: "nombre", label: "Nombre", required: true, type: "text" },
  { id: "numero", label: "Número", required: true, type: "number" },
  {
    id: "tipo_id",
    label: "Tipo",
    required: true,
    type: "select",
    select: typeCasttleSelect,
    tooltipTipoGanado: true,
  },
  {
    id: "origen_id",
    label: "Origen",
    required: true,
    type: "select",
    select: origenCasttleSelect,
  },
  {
    id: "fecha_ingreso",
    label: "Fecha de ingreso",
    required: true,
    type: "date",
  },
  {
    id: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    required: false,
    type: "date",
  },
  {
    id: "peso_nacimiento",
    label: "Peso de nacimiento",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_destete",
    label: "Peso de destete",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_2year",
    label: "Peso de 2 años",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_actual",
    label: "Peso actual",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "estado_id",
    label: "Estados",
    required: true,
    type: "select",
    select: stateCasttleSelect,
  },
];

export const formCastleEdit: Fields<keyof typeof FieldsIdCasttle,keyof typeof FieldsLabelsCasttle>[] = [
  { id: "nombre", label: "Nombre", required: true, type: "text" },
  { id: "numero", label: "Número", required: true, type: "number" },
  {
    id: "origen_id",
    label: "Origen",
    required: true,
    type: "select",
    select: origenCasttleSelect,
  },
  {
    id: "fecha_ingreso",
    label: "Fecha de ingreso",
    required: true,
    type: "date",
  },
  {
    id: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    required: false,
    type: "date",
  },
]

export const formBull: Fields<keyof typeof FieldsIdBull,keyof typeof FieldsLabelsBull>[] = [
  { id: "nombre", label: "Nombre", required: true, type: "text" },
  { id: "numero", label: "Número", required: true, type: "number" },
  {
    id: "tipo_id",
    label: "Tipo",
    required: true,
    type: "select",
    select: typeCasttleSelect,
    tooltipTipoGanado: true,
  },
  {
    id: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    required: false,
    type: "date",
  },
  {
    id: "origen_id",
    label: "Origen",
    required: true,
    type: "select",
    select: origenCasttleSelect,
  },
  {
    id: "fecha_ingreso",
    label: "Fecha de ingreso",
    required: true,
    type: "date",
  },
  {
    id: "peso_nacimiento",
    label: "Peso de nacimiento",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_destete",
    label: "Peso de destete",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_2year",
    label: "Peso de 2 años",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_actual",
    label: "Peso actual",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "estado_id",
    label: "Estados",
    required: true,
    type: "select",
    select: stateBullSelect,
  },
];
export const formBeef: Fields<keyof typeof FieldsIdBeef,keyof typeof FieldsLabelsBeef>[] = [
  { id: "nombre", label: "Nombre", required: true, type: "text" },
  { id: "numero", label: "Número", required: true, type: "number" },
  {
    id: "tipo_id",
    label: "Tipo",
    required: true,
    type: "select",
    select: typeCasttleSelect,
    tooltipTipoGanado: true,
  },
  {
    id: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    required: false,
    type: "date",
  },
  {
    id: "origen_id",
    label: "Origen",
    required: true,
    type: "select",
    select: origenCasttleSelect,
  },
  {
    id: "fecha_ingreso",
    label: "Fecha de ingreso",
    required: true,
    type: "date",
  },
  {
    id: "peso_nacimiento",
    label: "Peso de nacimiento",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_destete",
    label: "Peso de destete",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_2year",
    label: "Peso de 2 años",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "peso_actual",
    label: "Peso actual",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "estado_id",
    label: "Estados",
    required: true,
    type: "select",
    select: stateBeefSelect,
  },
];

export const formCheckUp: Fields<keyof typeof FieldsIdCheckUp,keyof typeof FieldsLabelsCheckUp>[] = [
  {
    id: "tipo_revision_id",
    label: "Diagnóstico",
    required: true,
    type: "select",
  },
  { id: "tratamiento", label: "Tratamiento", required: true, type: "text" },
  { id: "personal_id", label: "Veterinario", required: true, type: "select" },
  { id: "fecha", label: "Fecha", required: true, type: "date" },
];
export const formService: Fields<keyof typeof FieldsIdService,keyof typeof FieldsLabelsService>[] = [
  { id: "observacion", label: "Observación", required: true, type: "text" },
  {
    id: "tipo",
    label: "Tipo",
    required: true,
    type: "select",
    select: typeServicesForCasttle,
  },
  {
    id: "toro_id",
    label: "Toro",
    required: true,
    type: "select",
  },
  {
    id: "pajuela_toro_id",
    label: "Pajuela de toro",
    required: true,
    type: "select",
  },
  { id: "personal_id", label: "Veterinario", required: true, type: "select" },
  { id: "fecha", label: "Fecha", required: true, type: "date" },
];

export const formBirth: Fields<keyof typeof FieldsIdBirth,keyof typeof FieldsLabelsBirth>[] = [
  { id: "observacion", label: "Observación", required: true, type: "text" },
  { id: "fecha", label: "Fecha", required: true, type: "date" },
  { id: "personal_id", label: "Personal", required: true, type: "select" },
];

export const formCalfCastle: Fields<keyof typeof FieldsIdCalfCastle,keyof typeof FieldsLabelsCalfCastle>[] = [
  { id: "nombre", label: "Nombre de la cría", required: true, type: "text" },
  {
    id: "numero",
    label: "Número de la cría",
    required: false,
    type: "number",
  },
  {
    id: "peso_nacimiento",
    label: "Peso de nacimiento",
    required: false,
    type: "number",
    endContent: "weight",
  },
  {
    id: "sexo",
    label: "Sexo",
    required: true,
    type: "select",
    select: genderSelect,
  },
  { id: "observacion", label: "Observación", required: false, type: "text" },
];

export const formSupply: Fields<keyof typeof FieldsIdSupply,keyof typeof FieldsLabelsSupply>[] = [
  { id: "insumo", label: "Insumo", required: true, type: "text" },
  { id: "cantidad", label: "Cantidad", required: true, type: "number" },
  { id: "precio", label: "Precio", required: true, type: "number" },
];
export const formStaff: Fields<keyof typeof FieldsIdStaff,keyof typeof FieldsLabelsStaff>[] = [
  { id: "ci", label: "Cédula", required: true, type: "number" },
  { id: "nombre", label: "Nombre", required: true, type: "text" },
  { id: "telefono", label: "Teléfono", required: true, type: "tel" },
  { id: "apellido", label: "Apellido", required: true, type: "text" },
  {
    id: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    required: true,
    type: "date",
  },
  { id: "cargo_id", label: "Cargo", required: true, type: "select" },
];
export const formDeadCattle: Fields<keyof typeof FieldsIdDeadCattle,keyof typeof FieldsLabelsDeadCattle>[] = [
  { id: "fecha", label: "Fecha de defunción", required: true, type: "date" },
  {
    id: "causas_fallecimiento_id",
    label: "Causa de defunción",
    required: true,
    type: "select",
  },
  { id: "descripcion", label: "Descripción", required: false, type: "text" },
];

export const formSaleCattle: Fields<keyof typeof FieldsIdSaleCattle,keyof typeof FieldsLabelsSaleCattle>[] = [
  { id: "precio", label: "Precio", required: true, type: "number" },
  { id: "fecha", label: "Fecha de venta", required: true, type: "date" },
  {
    id: "comprador_id",
    label: "Compradores",
    required: true,
    type: "select",
  },
];

export const formPajuelaToro: Fields<keyof typeof FieldsIdPajuelaToro,keyof typeof FieldsLabelsPajuelaToro>[] = [
  { id: "codigo", label: "Código", required: true, type: "text" },
  { id: "descripcion", label: "Descripción", required: false, type: "text" },
  { id: "fecha", label: "Fecha", required: true, type: "date" },
];

export const formVaccinationDay: Fields<keyof typeof FieldsIdVaccinationDay,keyof typeof FieldsLabelsVaccinationDay>[] = [
  {
    id: "fecha_inicio",
    label: "Fecha de inicio",
    required: true,
    type: "date",
  },
  { id: "fecha_fin", label: "Fecha fin", required: true, type: "date" },
  { id: "vacuna_id", label: "Vacuna", required: true, type: "select" },
];

export const formWeightMilk: Fields<keyof typeof FieldsIdWheightMilk,keyof typeof FieldsLabelsIdWheightMilk>[] = [
  {
    id: "peso_leche",
    label: "Pesaje de leche",
    required: true,
    type: "number",
    endContent: "weight",
  },
  { id: "fecha", label: "Fecha", required: true, type: "date" },
];