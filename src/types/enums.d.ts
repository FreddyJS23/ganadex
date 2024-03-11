/**Tipos de notificaciones */
export enum TypeNotification {
    checkup,
    birth,
    drying,
    milk,
}

export enum IconsSidebar {
    dashboard,
    cattle,
    milk,
    checkUp,
    serve,
    pregnancy,
    supplies,
    staff,
    setting,
}

enum URLS {
    '/',
    '/ganado',
    '/venta_leche',
    '/partos',
    '/revisiones',
    '/servicios',
    '/personal',
    '/insumos',
    '/ajustes',
}

export enum ElementSidebar {
    Dashboard,
    Ganado,
    'Venta de leche',
    Revisiones,
    Servicios,
    Partos,
    Insumos,
    Personal,
    Ajustes,
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
    becerro,
    maute,
    novillo,
    adulto,
    res,
}

export enum EndPointsFakeApi {
    response_ganado,
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
}

export enum TittlesTabsDetailsCattle {
    Revisiones,
    Servicios,
    Partos,
    'Pesajes de leche',
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
    'weight-milk',
}

export enum FieldsIdCasttle {
    nombre,
    numero,
    origen,
    sexo,
    tipo_id,
    fecha_nacimiento,
    peso_nacimiento,
    peso_destete,
    peso_2year,
    peso_actual,
    estado_id,
    fecha_defuncion,
    causa_defuncion,
}
export enum FieldsLabelsCasttle {
    Nombre,
    Numero,
    Origen,
    Sexo,
    Tipo,
    'Fecha de nacimiento',
    'Peso de nacimiento',
    'Peso de destete',
    'Peso de 2 años',
    'Peso actual',
    Estados,
    'Fecha de defunción',
    'Causa de defunción',
}

export enum FieldsIdCheckUp {
    diagnostico,
    tratamiento,
}

export enum FieldsLabelsCheckUp {
    Diagnostico,
    Tratamiento,
}

export enum FieldsIdService {
    observacion,
    'numero_toro',
    tipo,
}

export enum FieldsLabelsService {
    Observación,
    'Numero del toro',
    Tipo,
}

export enum FieldsIdBirth {
    observacion,
    nombre,
    numero,
    sexo,
    'peso_nacimiento',
}

export enum FieldsLabelsBirth {
    Observación,
    'Nombre de la cría',
    'Numero de la cría',
    Sexo,
    'Peso de nacimiento',
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
    'fecha_nacimiento',
    cargo,
}

export enum FieldsLabelsStaff {
    Cedula,
    Nombre,
    Apellido,
    'Fecha de nacimiento',
    Cargo,
}
