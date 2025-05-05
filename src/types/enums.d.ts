/**Tipos de notificaciones */
export enum TypeNotification {
  revision,
  parto,
  secado,
}

export enum IconsModal {
  weight,
  bullCalf,
  price,
  milk,
  cattleV2,
  dead,
  checkUp,
  serve,
  pregnancy,
  customer,
  restoreBd,
  vaccine,
}

export enum ElementSidebar {
  Dashboard,
  Ventas,
  Personal,
  Insumos,
  Ajustes,
  Registrar,
  Consultar,
  Operaciones,
  Vacas,
  Toros,
  "Ganado descarte",
}

export enum StateCattle {
  sano,
  fallecido,
  gestacion,
  lactancia,
  vendido,
  pendiente_revision,
  pendiente_servicio,
  pendiente_secar,
  pendiente_numeracion,
  pendiente_capar,
  pendiente_pesaje_leche,
}
export enum URLS {
  "/dashboard",
  "/ganado",
  "/toros",
  "/ganado_descarte",
  "/venta_leche",
  "/partos",
  "/revisiones",
  "/servicios",
  "/personal",
  "/insumos",
  "/ajustes",
  "/pesajes_leche",
  "/fallecimientos",
  "/pajuela_toro",
  "/planes_sanitario",
}

export enum Months {
  Enero,
  Febrero,
  Marzo,
  Abril,
  Mayo,
  Junio,
  Julio,
  Agosto,
  Septiembre,
  Octubre,
  Noviembre,
  Diciembre,
}

export enum TypesCattle {
  Becerro,
  Maute,
  Novillo,
  Adulto,
}

export enum EndPointsFakeApi {
  response_ganado,
  response_revisiones,
  response_revision,
  response_servicios,
  response_servicio,
  response_partos,
  response_parto,
  response_pesajesLeche,
  response_pesajeLeche,
  response_ganados,
  response_toro,
  response_toros,
  response_criasPendienteNumeracion,
  response_criasPendienteCapar,
  response_preciosLeche,
  response_ventasLeche,
  response_insumo,
  response_insumos,
  response_personal,
  response_TodoPersonal,
  response_comprador,
  response_compradores,
  response_ventaGanado,
  response_ventasGanado,
  response_fallecimiento,
  response_fallecimientos,
  response_revisionesGeneral,
  response_serviciosGeneral,
  response_pesajesLecheGeneral,
  response_totalGanadoPorTipo,
  response_vacasProductoras,
  response_vacasMenosProductoras,
  response_insumoMayorExistencia,
  response_insumoMenorExistencia,
  response_balanceAnualLeche,
  response_notificaciones,
}

export enum TittlesTabsDetailsCattle {
  Revisiones,
  Servicios,
  Partos,
  "Pesajes de leche",
}

export enum IconsTabDatilsCattle {
  checkUp,
  serve,
  pregnant,
  milk,
}

export enum EndContentInput {
  dolar,
  weight,
  "weight-milk",
  ml,
}

export enum TitlesModals {
  "Pesaje de leche este mes vaca ",
  "Desea capar el becerro ",
  "Asignación de numero al becerro ",
  "Crear nuevo precio para la leche",
  "Historial de precio de la leche",
  "Venta de leche",
  "Crear nuevo comprador",
  "Compradores registrados",
  "Venta de ganado",
  "Nuevo fallecimiento",
  "Historial de revisiones",
  "Revision del ",
  "Historial de servicios",
  "Servicio del ",
  "Historial de partos",
  "Parto del ",
  "Historial pesajes mensuales de leche",
  "Escoja un rango de fechas para el reporte",
  "Año a filtrar el resumen",
  "Restaurar base de datos",
  "Añadir a la sección de descarte al animal ",
  "Nuevo plan sanitario",
  "Historial de vacunas aplicadas",
  "Actualizar usuario",
  "Crear hacienda",
  "Seleccionar hacienda en la que trabajar",
  "Eliminar usuario veterinario: ",
  "Historial de actividades",
  "Actualizar configuración",
  "Actualizar ",
}

export enum FieldsIdCasttle {
  nombre,
  numero,
  origen_id,
  fecha_ingreso,
  tipo_id,
  fecha_nacimiento,
  peso_nacimiento,
  peso_destete,
  peso_2year,
  peso_actual,
  estado_id,
}
export enum FieldsLabelsCasttle {
  Nombre,
  Número,
  Origen,
  "Fecha de ingreso",
  Tipo,
  "Fecha de nacimiento",
  "Peso de nacimiento",
  "Peso de destete",
  "Peso de 2 años",
  "Peso actual",
  Estados,
}
export enum FieldsIdBull {
  nombre,
  numero,
  origen_id,
  fecha_ingreso,
  tipo_id,
  fecha_nacimiento,
  peso_nacimiento,
  peso_destete,
  peso_2year,
  peso_actual,
  estado_id,
}
export enum FieldsLabelsBull {
  Nombre,
  Número,
  Origen,
  "Fecha de ingreso",
  Tipo,
  "Fecha de nacimiento",
  "Peso de nacimiento",
  "Peso de destete",
  "Peso de 2 años",
  "Peso actual",
  Estados,
}
export enum FieldsIdBeef {
  nombre,
  numero,
  origen_id,
  fecha_ingreso,
  tipo_id,
  fecha_nacimiento,
  peso_nacimiento,
  peso_destete,
  peso_2year,
  peso_actual,
  estado_id,
}
export enum FieldsLabelsBeef {
  Nombre,
  Número,
  Origen,
  "Fecha de ingreso",
  Tipo,
  "Fecha de nacimiento",
  "Peso de nacimiento",
  "Peso de destete",
  "Peso de 2 años",
  "Peso actual",
  Estados,
}

export enum FieldsIdCheckUp {
  tipo_revision_id,
  vacuna_id,
  observacion,
  tratamiento,
  fecha,
  personal_id,
}

export enum FieldsLabelsCheckUp {
  Diagnóstico,
  Vacuna,
  Observación,
  Fecha,
  Tratamiento,
  Veterinario,
}

export enum FieldsIdService {
  observacion,
  toro_id,
  pajuela_toro_id,
  tipo,
  fecha,
  personal_id,
}

export enum FieldsLabelsService {
  Observación,
  Toro,
  "Pajuela de toro",
  Tipo,
  Fecha,
  Veterinario,
}

export enum FieldsIdBirth {
  observacion,
  fecha,
  personal_id,
}

export enum FieldsLabelsBirth {
  Observación,
  Fecha,
  Personal,
}
export enum FieldsIdCalfCastle {
  observacion,
  nombre,
  numero,
  sexo,
  peso_nacimiento,
}

export enum FieldsLabelsCalfCastle {
  Observación,
  "Nombre de la cría",
  "Número de la cría",
  Sexo,
  "Peso de nacimiento",
}

export enum FieldsIdSupply {
  insumo,
  cantidad,
  precio,
}

export enum FieldsLabelsSupply {
  Insumo,
  Cantidad,
  Precio,
}

export enum FieldsIdStaff {
  ci,
  nombre,
  apellido,
  telefono,
  fecha_nacimiento,
  cargo_id,
}

export enum FieldsLabelsStaff {
  Cédula,
  Nombre,
  Apellido,
  Teléfono,
  "Fecha de nacimiento",
  Cargo,
}
export enum FieldsIdDeadCattle {
  fecha,
  causas_fallecimiento_id,
  descripcion,
  /* use id in form cattle to register dead cattle */
}

export enum FieldsLabelsDeadCattle {
  "Fecha de defunción",
  "Causa de defunción",
  Descripción,
}

export enum FieldsIdSaleCattle {
  precio,
  comprador_id,
  fecha,
}

export enum FieldsLabelsSaleCattle {
  Precio,
  Compradores,
  "Fecha de venta",
}

export enum FieldsIdPajuelaToro {
  codigo,
  descripcion,
  fecha,
}
export enum FieldsLabelsPajuelaToro {
  Código,
  Descripción,
  Fecha,
}

export enum FieldsIdVaccinationDay {
  fecha_inicio,
  fecha_fin,
  vacuna_id,
}
export enum FieldsLabelsVaccinationDay {
  "Fecha de inicio",
  "Fecha fin",
  Vacuna,
}
export enum FieldsLabelsWeights {
  "Peso de nacimiento",
  "Peso de destete",
  "Peso de 2 años",
  "Peso actual",
}

export enum FieldsIdWheightMilk {
  peso_leche,
  fecha
}

export enum FieldsLabelsIdWheightMilk {
  "Pesaje de leche",
  "Fecha",
}

export enum FieldsLabelsVaccine {
  Nombre,
  "Intervalo de dosis",
  "Dosis recomendada anual",
  "Tipo de vacuna",
  "Aplicable a todos",
}

export enum FieldsIdVaccine {
  nombre,
  intervalo_dosis,
  dosis_recomendada_anual,
  tipo_vacuna,
  aplicable_a_todos,
}