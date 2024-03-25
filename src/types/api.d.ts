import {
    Comprador,
    Configuracion,
    CriaPendienteCapar,
    CriaPenditeNumeracion,
    Fallecimiento,
    Ganado,
    Insumo,
    Notification,
    Parto,
    Personal,
    PesajeLecheGanado,
    PesajesLeche,
    PreciosDeLeche,
    Revision,
    Revisiones,
    Servicio,
    Servicios,
    Toro,
    User,
    VentaGanado,
    VentaLeche,
} from './models';

type errors = {
    [index: string]: [];
};

/** Respuesta del servidor */
export type Response = {
    /** Informacion de la repuesta */
    data: ResponseGanado | Ganado;
    /**Código de respuesta del servidor*/
    status: number;
};

export type ResponseErrorCampos = {
    message: string;
    errors: errors;
};

export type ResponseGanado = {
    ganado: Ganado;
    servicio_reciente: Servicio | null;
    total_servicios: number;
    revision_reciente: Revision | null;
    total_revisiones: number;
};

export type CabezasGanado = Omit<
    Ganado,
    | 'fecha_defuncion'
    | 'causa_defuncion'
    | 'fecha_defuncion'
    | 'causa_defuncion'
    | 'prox_revision'
    | 'prox_servicio'
    | 'prox_parto'
    | 'prox_secado'
>;

export type ResponseGanados = {
    cabezas_ganado: CabezasGanado[];
};

export type ResponseToro = {
    toro: Toro;
    efectividad: number | null;
    padre_en_partos: number;
    servicios: number;
};
export type ResponseToros = {
    toros: Toro[];
};

export type ResponseInsumo = {
    insumo: Insumo;
};

export type ResponseInsumos = {
    insumos: Insumo[];
};
export type ResponsePersonal = {
    personal: Personal;
};

export type ResponseTodoPersonal = {
    todo_personal: Personal[];
};

export type ResponseConfiguracion = {
    configuracion: Configuracion;
};

/**Revision individual de una cabeza de ganado */
export type ResponseRevision = {
    revision: Revision;
};

export type ResponseRevisiones = {
    revisioness: Revision[];
};

/**Servicio individual de una cabeza de ganado */
export type ResponseServicio = {
    servicio: Servicio;
};

export type ResponseServicios = {
    servicios: Servicio[];
};

export type ResponseParto = {
    parto: Parto;
};

export type ResponsePartos = {
    partos: Parto[];
};

export type ResponsePesajeLeche = {
    pesaje_leche: PesajeLecheGanado;
};

export type ResponsePesajesLeche = {
    pesajes_leche: PesajeLecheGanado[];
};
export type ResponseUser = {
    user: User;
};

export type ResponseCriasPendienteCapar = {
    crias_pendiente_capar: CriaPendienteCapar[];
};

export type ResponseCriasPendienteNumeracion = {
    crias_pendiente_numeracion: CriaPenditeNumeracion[];
};

export type ResponsePreciosLeche = {
    precios: PreciosDeLeche[];
};

export type ResponseVentasLeche = {
    ventas_de_leche: VentaLeche[];
};

export type ResponseComprador = {
    comprador: Comprador;
};

export type ResponseCompradores = {
    compradores: Comprador[];
};

export type ResponseVentaGanado = {
    venta: VentaGanado;
};

export type ResponseVentasGanado = {
    ventas: VentaGanado[];
};

export type ResponseFallecimiento = {
    fallecimiento: Fallecimiento;
};

export type ResponseFallecimientos = {
    fallecimientos: Fallecimiento[];
};

export type ResponseRevisionesGeneral = {
    todas_revisiones: Revisiones[];
};

export type ResponseServiciosGeneral = {
    todos_servicios: Servicios[];
};

export type ResponsePesajesLecheGeneral = {
    todos_pesaje_leche: PesajesLeche[];
};

export type ResponseNotificaciones = {
    revisiones:Notification[];
    partos:Notification[];
    secados:Notification[];
};
