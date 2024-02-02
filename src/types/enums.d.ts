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
    response_preciosLeche,
    response_ventasLeche,
    response_comprador,
    response_compradores,
    response_ventaGanado,
    response_ventasGanado,
    response_fallecimiento,
    response_fallecimientos,
    response_revisionesGeneral,
    response_serviciosGeneral,
    response_pesajesLecheGeneral,
}

export enum TittlesTabsDetailsCattle{
Revisiones,
Servicios,
Partos,
"Pesajes de leche"
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
    "Fecha de nacimiento",
    "Peso de nacimiento",
    "Peso de destete",
    "Peso de 2 años",
    "Peso actual",
    Estados,
    "Fecha de defunción",
    "Causa de defunción",
}