import {
  Comprador,
  Configuracion,
  CriaPendienteCapar,
  CriaPenditeNumeracion,
  Fallecimiento,
  Ganado,
  Insumo,
  Parto,
  Partos,
  Personal,
  PesajeLecheGanado,
  PesajesLeche,
  PositionStaff,
  PreciosDeLeche,
  GanadoDescarte,
  Revision,
  Revisiones,
  Servicio,
  Servicios,
  Toro,
  TypesNotification,
  User,
  VentaGanado,
  VentaLeche,
  veterinario,
  YearSalesCattle,
  PajuelaToro,
  DayVaccination,
  AvailableVaccines,
  Vacuna,
  AplicacionVacunaHistorial,
  UserVeterinaryInfo,
  UserAdminInfo,
  UserVeterinary,
  ToroServicio,
  TipoRevision,
  CausaFallecimiento,
  PreguntasSeguridad,
  RespuestasSeguridad,
  Vaccines,
  Vaccine,
} from "./models";

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

/** Respuesta del servidor */
export type ResponseCorrect = {
  /** Informacion de la repuesta */
  message: string;
};

export type ResponseErrorCampos = {
  message: string;
  errors: errors;
};
/* export type ResponseError = {
    status: number;
    data: ResponseErrorCampos;
}; */

/** Respuesta del servidor de laravel */
export type ResponseErrorFromApi = {
  status: number;
  data: ResponseErrorCampos;
};

/** Respuesta manejada proveniente del servidor de laravel */
export type ResponseErrorNext = {
  error: { message: string; status: number };
};

export type ResponseRestablecerContraseñaUsuario = {
  token: string;
  preguntas: PreguntaSeguridad[];
};

export type ResponseGanado = {
  ganado: Ganado;
  servicio_reciente: Servicio | null;
  total_servicios: number;
  total_servicios_acumulados: number;
  revision_reciente: Revision | null;
  total_revisiones: number;
  total_partos: number;
  parto_reciente: Parto;
  efectividad: number;
  info_pesajes_leche: {
    reciente: PesajeLecheGanado;
    mejor: PesajeLecheGanado;
    peor: PesajeLecheGanado;
    promedio: string | null;
    produccion_acumulada: integer | null;
    dias_produccion: integer | null;
    estado: string;
  };
  vacunaciones: {
    vacunas: AplicacionVacunaHistorial[];
    historial: Vacuna[];
  };
};

export type CabezasGanado = Omit<
  Ganado,
  | "fecha_defuncion"
  | "causa_defuncion"
  | "prox_revision"
  | "prox_servicio"
  | "prox_parto"
  | "prox_secado"
>;

export type ResponseGanados = {
  cabezas_ganado: CabezasGanado[];
};

export type ResponseToro = {
  toro: Toro;
  vacunaciones: {
    vacunas: AplicacionVacunaHistorial[];
    historial: Vacuna[];
  };
};
export type ResponseToros = {
  toros: Toro[];
};

export type ResponsePajuelaToros = {
  pajuela_toros: PajuelaToro[];
};

export type ResponsePajuelaToro = {
  pajuela_toro: PajuelaToro;
};

export type ResponseGanadoDescartes = {
  ganado_descartes: GanadoDescarte[];
};
export type ResponseGanadoDescarte = {
  ganado_descarte: GanadoDescarte;
  vacunaciones: {
    vacunas: AplicacionVacunaHistorial[];
    historial: Vacuna[];
  };
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
  revisiones: Revision[];
};

/**Servicio individual de una cabeza de ganado */
export type ResponseServicio = {
  servicio: Servicio;
};

export type ResponseServicios = {
  servicios: Servicio[];
};

export type ResponseServiciosToro = {
  servicios: ToroServicio[];
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

export type ResponsePrecioLeche = {
  precio: PreciosDeLeche;
};

export type ResponseVentasLeche = {
  ventas_de_leche: VentaLeche[];
};

export type ResponseVentaLeche = {
  venta_leche: VentaLeche;
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
  fallecidos: Fallecimiento[];
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

export type ResponsePartosGeneral = {
  todos_partos: Partos[];
};

export type ResponseNotificaciones = {
  notificaciones: TypesNotification;
};

export type ResponseCargosPersonal = {
  cargos_personal: PositionStaff[];
};

export type ResponseVeterinariosSelect = {
  veterinarios: veterinario[];
};

export type ResponseObrerosSelect = {
  obreros: veterinario[];
};

export type ResponseFechaUltimoRespaldo = {
  ultimo_backup: string | null;
};

export type ResponseAñosVentaGanado = {
  años_ventas_ganado: YearSalesCattle[];
};

export type ResponseAñosProduccionLeche = {
  años_produccion_leche: YearSalesCattle[];
};

export type ResponsePlanesSanitario = {
  planes_sanitario: DayVaccination[];
};

export type ResponsePlanSanitario = {
  plan_sanitario: DayVaccination;
};

export type ResponseVacunasDisponibles = {
  vacunas_disponibles: AvailableVaccines[];
};

export type ResponseVacunas = {
  vacunas: Vaccine[];
};

export type ResponseSugerirNumero = {
  numero_disponible: number;
};

export type ResponseVeterinariosUsuario = {
  usuarios_veterinarios: UserVeterinaryInfo[];
};

export type ResponseVeterinarioUsuario = {
  usuario_veterinario: UserVeterinaryInfo;
};

export type ResponseVeterinariosSinUsuario = {
  veterinarios_sin_usuario: veterinario[];
};

export type ResponseInformacionUsuarioLogeado = {
  user: UserAdminInfo | UserVeterinaryInfo;
};

export type ResponseHaciendas = {
  haciendas: Hacienda[];
};

export type ResponseHacienda = {
  hacienda: Hacienda;
};

export type ResponseLogsVeterinary = {
  logs: LogVeterinary[];
};

export type ResponseResumenNatalidad = {
  nacimientos_ultimos_5_año: {
    año: string;
    partos_producidos: number;
    poblacion: integer;
    tasa_natalidad: number;
  }[];
  nacimientos_año_actual: {
    año: string;
    total: number;
    machos: number;
    hembras: integer;
  };
};

export type ResponseLogEventos = {
  logs_eventos: LogEvento[];
};

export type ResponseTiposRevision = {
  tipos_revision: TipoRevision[];
};
export type ResponseTipoRevision = {
  tipo_revision: TipoRevision;
};

export type ResponseCausaFallecimiento = {
  causa_fallecimiento: CausaFallecimiento;
};
export type ResponseCausasFallecimiento = {
  causas_fallecimiento: CausaFallecimiento[];
};
export type ResponsePreguntasSeguridad = {
  preguntas_seguridad: PreguntasSeguridad[];
};

export type ResponseRespuestaSeguridad = {
  respuestas_seguridad: RespuestasSeguridad[];
};
