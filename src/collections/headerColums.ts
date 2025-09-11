import {
  CabezasGanado,
  Comprador,
  CriaPendienteCapar,
  CriaPendienteNumeracion,
  Fallecimiento,
  Insumo,
  Parto,
  Partos,
  Personal,
  PesajeLecheGanado,
  PesajesLeche,
  PreciosDeLeche,
  GanadoDescarte,
  Revision,
  Revisiones,
  Servicio,
  Servicios,
  Toro,
  VentaGanado,
  VentaLeche,
  PajuelaToro,
  DayVaccination,
  AplicacionVacunaHistorial,
  Vacuna,
  UserVeterinaryInfo,
  UsersVeterinary,
  LogVeterinary,
  LogEvento,
  ToroServicio,
  TipoRevision,
  CausaFallecimiento,
  AvailableVaccines,
  Vaccine,
} from "@/types";

type baseHeaderColunms = {
  label: string;
  tooltip?: string;
};

type headersColumns<T> = baseHeaderColunms & {
  key: keyof T;
};

type headersColumnsServices = baseHeaderColunms & {
  key: keyof Servicio | "toro/pajuela";
};

export const headerCasttle: headersColumns<CabezasGanado>[] = [
  { key: "numero", label: "Número" },
  { key: "nombre", label: "Nombre" },
  { key: "fecha_nacimiento", label: "Edad" },
  { key: "pesos", label: "Peso actual" },
  { key: "tipo", label: "Tipo" },
  { key: "origen", label: "Origen" },
  { key: "estados", label: "Estados" },
  { key: "id", label: "Acciones" },
];
export const headerBull: headersColumns<Toro>[] = [
  { key: "numero", label: "Número" },
  { key: "fecha_nacimiento", label: "Fecha nacimiento" },
  { key: "tipo", label: "Tipo" },
  { key: "pesos", label: "Peso actual" },
  { key: "servicios", label: "Servicios hechos" },
  { key: "padre_en_partos", label: "Padre en partos" },
  { key: "efectividad", label: "Efectividad" },
  { key: "estados", label: "Estados" },
  { key: "id", label: "Acciones" },
];
export const headerBeef: headersColumns<GanadoDescarte>[] = [
  { key: "numero", label: "Número" },
  { key: "nombre", label: "Nombre" },
  { key: "sexo", label: "Sexo" },
  { key: "tipo", label: "Tipo" },
  { key: "fecha_nacimiento", label: "Fecha nacimiento" },
  { key: "pesos", label: "Peso actual" },
  { key: "estados", label: "Estados" },
  { key: "id", label: "Acciones" },
];

export const headerSaleCasttle: headersColumns<VentaGanado>[] = [
  { key: "fecha", label: "Fecha" },
  { key: "ganado", label: "Número de ganado" },
  { key: "peso", label: "Peso" },
  /* { key: 'precio', label: 'Precio' },
    { key: 'precio_kg', label: 'Precio por KG' }, */
  { key: "comprador", label: "Comprador" },
  { key: "id", label: "Nota de venta" },
];

export const headerSaleMilk: headersColumns<VentaLeche>[] = [
  { key: "fecha", label: "Fecha" },
  { key: "cantidad", label: "Cantidad" },
  { key: "precio", label: "Precio" },
];

export const headerSupplies: headersColumns<Insumo>[] = [
  { key: "insumo", label: "Insumo" },
  { key: "cantidad", label: "Cantidad en inventario" },
  { key: "precio", label: "Coste individual" },
];

export const headerStaff: headersColumns<Personal>[] = [
  { key: "ci", label: "Cédula" },
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "fecha_nacimiento", label: "Fecha de nacimiento" },
  { key: "cargo", label: "Cargo" },
  { key: "telefono", label: "Teléfono" },
  { key: "haciendas", label: "Haciendas" },
  { key: "id", label: "Acciones" },
];

export const headerAllCheckup: headersColumns<Revisiones>[] = [
  { key: "numero", label: "Número" },
  { key: "diagnostico", label: "Diagnóstico" },
  { key: "estado", label: "Estado" },
  { key: "pendiente", label: "Pendiente revisar" },
  { key: "proxima_revision", label: "Próxima revisión" },
  { key: "ultima_revision", label: "Última revisión" },
  { key: "total_revisiones", label: "Total de revisiones" },
  { key: "id", label: "Acciones" },
];

export const headerAllServes: headersColumns<Servicios>[] = [
  { key: "numero", label: "Número" },
  { key: "estado", label: "Estado" },
  { key: "pendiente", label: "Pendiente servir" },
  { key: "toro", label: "Toro/Pajuela toro" },
  { key: "total_servicios", label: "Total de servicios" },
  { key: "ultimo_servicio", label: "Último servicio" },
  { key: "efectividad", label: "Efectividad" },
  { key: "id", label: "Acciones" },
];

export const headerAllBirths: headersColumns<Partos>[] = [
  { key: "numero", label: "Número" },
  { key: "ultimo_parto", label: "Último parto" },
  { key: "estado", label: "Estado" },
  { key: "cria", label: "Cría" },
  { key: "toro", label: "Toro/Pajuela toro" },
  { key: "total_partos", label: "Total de partos" },
  { key: "id", label: "Acciones" },
];

export const headerAssignmentNumberBullCalf: headersColumns<CriaPendienteNumeracion>[] =
  [
    { key: "nombre", label: "Nombre" },
    { key: "fecha_nacimiento", label: "Fecha de nacimiento" },
    { key: "id", label: "Asignar" },
  ];

export const headerCastreteBullCalf: headersColumns<CriaPendienteCapar>[] = [
  { key: "nombre", label: "Nombre" },
  { key: "fecha_nacimiento", label: "Fecha de nacimiento" },
  { key: "id", label: "Capar" },
];

export const headerAllWeightMilk: headersColumns<PesajesLeche>[] = [
  { key: "nombre", label: "Nombre" },
  { key: "numero", label: "Número" },
  { key: "pesaje_este_mes", label: "Pesaje mes actual" },
  { key: "ultimo_pesaje", label: "Último pesaje" },
  { key: "id", label: "Pesar" },
];

export const headerHistoryPriceMilk: headersColumns<PreciosDeLeche>[] = [
  { key: "precio", label: "Precio" },
  { key: "fecha", label: "Fecha" },
];

export const headerCheckups: headersColumns<Revision>[] = [
  { key: "fecha", label: "Fecha" },
  { key: "diagnostico", label: "Diagnóstico" },
];

export const headerServices: headersColumnsServices[] = [
  { key: "fecha", label: "Fecha" },
  { key: "toro/pajuela", label: "Toro/Pajuela toro" },
];

export const headerServicesBull: headersColumns<ToroServicio>[] = [
  { key: "fecha", label: "Fecha" },
  { key: "observacion", label: "Observación" },
  { key: "vaca", label: "Vaca" },
  { key: "veterinario", label: "Veterinario" },
];

export const headerBirths: headersColumns<Parto>[] = [
  { key: "fecha", label: "Fecha" },
  { key: "observacion", label: "Observación" },
];

export const headerWeightMilk: headersColumns<PesajeLecheGanado>[] = [
  { key: "fecha", label: "Fecha" },
  { key: "pesaje", label: "Pesaje" },
];

export const headerCustomers: headersColumns<Comprador>[] = [
  { key: "nombre", label: "Nombre" },
];

export const headerDeadCattle: headersColumns<Fallecimiento>[] = [
  { key: "ganado", label: "Ganado" },
  { key: "fecha", label: "Fecha" },
  { key: "causa", label: "Causa" },
  { key: "descripcion", label: "Descripción" },
];

export const headerPajuelaToro: headersColumns<PajuelaToro>[] = [
  { key: "codigo", label: "Código" },
  { key: "descripcion", label: "Descripción" },
  { key: "fecha", label: "Fecha" },
];

export const headerPlanesSanitario: headersColumns<DayVaccination>[] = [
  { key: "fecha_inicio", label: "Fecha inicio" },
  { key: "fecha_fin", label: "Fecha fin" },
  { key: "vacuna", label: "Vacuna" },
  { key: "ganado_vacunado", label: "Ganado vacunado" },
  { key: "vacunados", label: "Vacunados" },
];

export const headerHistoryVaccinesApply: headersColumns<AplicacionVacunaHistorial>[] =
  [
    { key: "vacuna", label: "Vacuna" },
    { key: "cantidad", label: "Veces aplicada" },
    { key: "ultima_dosis", label: "Última dosis" },
    { key: "prox_dosis", label: "Próxima dosis" },
  ];

export const headerHistoryVaccines: headersColumns<Vacuna>[] = [
  { key: "vacuna", label: "Vacuna" },
  { key: "fecha", label: "Fecha" },
  { key: "prox_dosis", label: "Próxima dosis" },
];

export const headerVaccines: headersColumns<Vaccine>[] = [
  { key: "nombre", label: "Nombre" },
  { key: "tipo_vacuna", label: "Tipo de vacuna" },
  { key: "id", label: "Editar" },
];

export const headersColumnsUserVeterinary: headersColumns<UserVeterinaryInfo>[] =
  [
    { key: "usuario", label: "Usuario" },
    { key: "nombre", label: "Nombre" },
    { key: "telefono", label: "Teléfono" },
    { key: "fecha_creacion", label: "Fecha de creación" },
    { key: "id", label: "Eliminar" },
  ];

export const headersColumnsLogsVeterinary: headersColumns<LogVeterinary>[] = [
  { key: "actividad", label: "Actividad" },
  { key: "actividad_id", label: "Ver actividad" },
  { key: "fecha", label: "Fecha" },
];

export const headersColumnsLogEventos: headersColumns<LogEvento>[] = [
  { key: "operacion", label: "Operación" },
  { key: "descripcion", label: "Descripción" },
  { key: "fecha", label: "Fecha" },
];

export const headerTypeCheck: headersColumns<TipoRevision>[] = [
  { key: "tipo", label: "Tipo" },
  { key: "id", label: "Editar" },
];

export const headerCausaFallecimiento: headersColumns<CausaFallecimiento>[] = [
  { key: "causa", label: "Causa" },
  { key: "id", label: "Editar" },
];
