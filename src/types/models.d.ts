import { StateCattle, TypeNotification, TypesCattle } from "./enums";

export type PesajeLeche = `${string}-KG`;

export type EstadosGanado = {
  id: number;
  estado: keyof typeof StateCattle;
};

export type Pesos = {
  peso_nacimiento: string | null;
  peso_destete: string | null;
  peso_2year: string | null;
  peso_actual: string | null;
};

type Eventos = {
  prox_revision: string | null;
  prox_servicio: string | null;
  prox_parto: string | null;
  prox_secado: string | null;
};

type veterinario = {
  id: number;
  nombre: string;
};

type Cria = Pick<
  Ganado,
  "id" | "nombre" | "numero" | "sexo" | "origen" | "fecha_nacimiento"
> & {
  peso: Pick<Pesos, "peso_nacimiento">;
  observacion: string | null;
  toro_id: number | null;
  descarte_id: number | null;
  peso_nacimiento: number;
};

type ToroDeServicio = Pick<Toro, "id" | "numero">;

export type Ganado = {
  id: number;
  nombre: string;
  numero: number | null;
  origen: string;
  fecha_ingreso: string | null;
  tipo: keyof typeof TypesCattle;
  fecha_nacimiento: string | null;
  pesos?: Pesos;
  estados: EstadosGanado[];
  eventos: Eventos;
  fallecimiento: Pick<Fallecimiento, "fecha" | "causa" | "descripcion"> | null;
  venta: Pick<Venta, "fecha" | "comprador"> | null;
};

export type Toro = Pick<
  Ganado,
  | "id"
  | "nombre"
  | "numero"
  | "origen"
  | "fecha_nacimiento"
  | "fallecimiento"
  | "fecha_ingreso"
  | "pesos"
  | "tipo"
  | "estados"
  | "venta"
> & {
  efectividad: number;
  padre_en_partos: number;
  servicios: number;
  ganado_id: number;
};

export type PajuelaToro = {
  id: number;
  codigo: string;
  descripcion: string;
  fecha: string;
};

export type GanadoDescarte = Omit<
  Toro,
  "efectividad" | "padre_en_partos" | "servicios" | "sexo"
> & {
  sexo: "M" | "H";
};

export type Insumo = {
  id: number;
  insumo: string;
  cantidad: number;
  precio: number;
};

export type Personal = {
  id: number;
  ci: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  telefono: string;
  cargo: "obrero" | "veterinario";
  haciendas: Hacienda[];
};

export type Configuracion = {
  peso_servicio: number;
  dias_evento_notificacion: number;
  dias_diferencia_vacuna: number;
};

/**Revision individual de una cabeza de ganado */
export type Revision = {
  id: number;
  fecha: string;
  /**Cuando el tipo es un string, es porque no tiene diagnostico por ende dira (desconocido)   */
  revision: Pick<TipoRevision, "tipo" | "codigo"> | string;
  tratamiento: string | null;
  observacion: string | null;
  veterinario: veterinario;
  vacuna: Pick<Vacuna, "id" | "nombre"> | null;
  dosis: string | null;
};

/**Servicio individual de una cabeza de ganado */
export type Servicio = {
  id: number;
  fecha: string;
  observacion: string;
  tipo: string;
  toro?: Pick<Toro, "id" | "numero">;
  pajuela_toro?: PajuelaToro;
  veterinario: veterinario;
};

export type ToroServicio = {
  id: number;
  fecha: string;
  observacion: string;
  vaca: { id: number; numero: number };
  veterinario: veterinario;
};

export type Parto = {
  id: number;
  fecha: string;
  observacion: string;
  crias: Cria[];
  padre_toro?: Pick<Toro, "id" | "numero">;
  pajuela_toro?: PajuelaToro;
  personal: Pick<Personal, "id" | "nombre" | "cargo">;
};

/**Pesaje leche individual de una cabeza de ganado */
export type PesajeLecheGanado = {
  id: number;
  pesaje: PesajeLeche;
  fecha: string;
};

export type User = {
  id: number;
  usuario: string;
};
export type CriaPendienteCapar = Pick<
  Ganado,
  "id" | "nombre" | "fecha_nacimiento"
>;

export type CriaPendienteNumeracion = CriaPendienteCapar;

export type PreciosDeLeche = {
  id: number;
  precio: number;
  fecha: string;
};
export type VentaLeche = {
  id: number;
  fecha: string;
  cantidad: PesajeLeche;
  precio: number;
};

export type VentaGanado = {
  id: number;
  fecha: string;
  peso: PesajeGanado;
  ganado: Pick<Ganado, "id" | "numero">;
  /* precio: number;
    precio_kg: number; */
  comprador: string;
};

export type Fallecimiento = {
  id: number;
  fecha: string;
  causa: string;
  descripcion: string;
  ganado: Pick<Ganado, "id" | "numero">;
};

/**Revisiones de todas las cabeza de  ganado */
export type Revisiones = {
  id: number;
  numero: number;
  estado: string;
  pendiente: boolean;
  ultima_revision: string;
  /**Cuando el tipo es un string, es porque no tiene diagnostico por ende dira (desconocido)   */
  revision: Pick<TipoRevision, "tipo" | "codigo"> | string;
  proxima_revision: string | null;
  total_revisiones: number;
};

/**Servicios de todas las cabeza de  ganado  */
export type Servicios = Pick<Ganado, "id" | "numero"> & {
  ultimo_servicio: string;
  toro?: Pick<Toro, "id" | "numero">;
  pajuela_toro?: PajuelaToro;
  efectividad: number;
  total_servicios: number;
  estado: string;
  pendiente: boolean;
};

/**Pesajes de leche de todas las cabeza de  ganado  */
export type PesajesLeche = Pick<Ganado, "id" | "numero" | "nombre"> & {
  ultimo_pesaje: PesajeLeche;
  pesaje_este_mes: boolean;
};

/**Partos de todas las cabeza de ganado  */
export type Partos = Pick<Ganado, "id" | "numero"> & {
  ultimo_parto: string | null;
  total_partos: number;
  estado: "Gestacion" | "Vacia" | "Vendida" | "Fallecida";
  toro?: Pick<Toro, "id" | "numero">;
  pajuela_toro?: PajuelaToro;
  cria?: Pick<Cria, "id" | "numero">;
};

export type Comprador = {
  id: number;
  nombre: string;
};

export type Notification = {
  id: number;
  tipo: keyof typeof TypeNotification;
  leido: boolean;
  dias_para_evento: number;
  ganado: Pick<Ganado, "id" | "numero">;
};

export type TypesNotification = {
  revision?: Notification[];
  parto?: Notification[];
  secado?: Notification[];
};

export type PositionStaff = {
  id: number;
  cargo: "obrero" | "veterinario";
};

export type YearSalesCattle = {
  año: number;
};

export type DayVaccination = {
  id: number;
  fecha_inicio: string;
  fecha_fin: string;
  vacuna: string;
  vacunados: number;
  ganado_vacunado: string;
};

export type AvailableVaccines = {
  id: number;
  nombre: string;
  intervalo_dosis: number;
  tipo_vacuna: "medica" | "plan_sanitario";
  dosis_recomendada_anual: number | null;
  aplicable_a_todos: boolean;
  tipos_ganado: { tipo: string; sexo: GanadoDescarte["sexo"] }[] | null;
};

export type Vaccine = Omit<AvailableVaccines, "tipos_ganado"> & {
  tipos_ganado:
    | { id: number; tipo: string; sexo: GanadoDescarte["sexo"] }[]
    | null;
};

export type ListaVacunas = {
  id: string;
  fecha: string;
  vacuna_id: number;
  prox_dosis: string;
};

export type Vacuna = Omit<ListaVacunas, "vacuna_id"> & { nombre: string };

export type AplicacionVacunaHistorial = {
  vacuna: string;
  cantidad: number;
  ultima_dosis: string;
  prox_dosis: string;
};

export type Hacienda = {
  id: number;
  nombre: string;
  fecha_creacion: string;
};

export type UserVeterinaryInfo = Omit<UserLoginInfo, "rol" | "email"> & {
  nombre: string;
  telefono: string;
  rol: "veterinario";
};

export type UserLoginInfo = {
  id: number;
  usuario: string;
  email: string;
  rol: "admin" | "veterinario";
  fecha_creacion: string;
};

export type LogVeterinary = {
  id: number;
  actividad:
    | "Revision"
    | "Servicio"
    | "Parto"
    | "Login"
    | "Jornada_vacunacion"
    | "Fallecimiento";
  actividad_id: number;
  fecha: string;
};

export type LogEvento = {
  id: number;
  operacion: string;
  descripcion: string;
  fecha: string;
};

export type TipoRevision = {
  id: number;
  tipo: "Gestación" | "Descartar" | "Rutina" | "Aborto" | string;
  codigo: string | null;
};

export type CausaFallecimiento = {
  id: number;
  causa: string;
};
/**Preguntas de seguridad con su respectiva respuesta encriptada en la base de datos,
 *  guardadas por el usuario,   */
export type RespuestasSeguridad = {
  id: number;
  pregunta: string;
  updated_at: string;
  pregunta_seguridad_id: number;
  respuesta: string;
};

export type PreguntasSeguridad = {
  id: number;
  pregunta: string;
};
