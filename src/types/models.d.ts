import { StateCattle, TypesCattle } from './enums';

export type PesajeGanado = `${string}-KG`;

export type PesajeLeche = `${string}-KG`;

type EstadosGanado = {
    id: number;
    estado: keyof typeof StateCattle;
};

type Cria = Pick<
    Ganado,
    'id' | 'nombre' | 'numero' | 'sexo' | 'origen' | 'fecha_nacimiento'
>;

type ToroDeServicio = Pick<Toro, 'id' | 'numero'>;

export type Ganado = {
    id: number;
    nombre: string;
    numero: number | null;
    origen: string | null;
    sexo: 'H' | 'M';
    tipo: keyof typeof TypesCattle;
    fecha_nacimiento: Date | null;
    peso_nacimiento: PesajeGanado | null;
    peso_destete: PesajeGanado | null;
    peso_2year: PesajeGanado | null;
    peso_actual: PesajeGanado | null;
    estados: EstadosGanado[];
    fecha_defuncion: Date | null;
    causa_defuncion: string | null;
    prox_revision: Date | null;
    prox_servicio: Date | null;
    prox_parto: Date | null;
    prox_secado: Date | null;
};

export type Toro = {
    id: number;
    nombre: string;
    numero: number | null;
    origen: string | null;
    sexo: 'M';
    tipo: string;
    fecha_nacimiento: Date | null;
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
    fecha_nacimiento: Date;
    cargo: string;
};

export type Configuracion = {
    id: number;
    dark_mode: boolean;
    moneda: string;
};

/**Revision individual de una cabeza de ganado */
export type Revision = {
    id: number;
    fecha: Date;
    diagnostico: string;
    tratamiento: string;
};

/**Servicio individual de una cabeza de ganado */
export type Servicio = {
    id: number;
    fecha: Date;
    observacion: string;
    tipo: string;
    numero_toro: integer;
};

export type Parto = {
    id: number;
    fecha: Date;
    observacion: string;
    cria: Cria;
    padre_numero: number;
};

/**Pesaje leche individual de una cabeza de ganado */
export type PesajeLecheGanado = {
    id: number;
    pesaje: PesajeLeche;
    fecha: Date;
};

export type User = {
    id: number;
    usuario: string;
};
export type CriaPendienteCapar = Pick<
    Ganado,
    'id' | 'nombre' | 'fecha_nacimiento'
>;

export type CriaPenditeNumeracion = CriaPendienteCapar;

export type PreciosDeLeche = {
    id: number;
    precio: number;
    fecha: Date;
};
export type VentaLeche = {
    id: number;
    fecha: Date;
    cantidad: PesajeLeche;
    precio: number;
};

export type VentaGanado = {
    id: number;
    fecha: Date;
    numero_ganado: number;
    peso: PesajeGanado;
    precio: number;
    precio_kg: number;
    comprador: string;
};

export type Fallecimiento = {
    id: number;
    fecha: Date;
    causa: string;
    numero_ganado: number;
};

/**Revisiones de todas las cabeza de  ganado */
export type Revisiones = {
    id: number;
    numero: number;
    ultima_revision: string;
    diagnostico: string;
    proxima_revision: string | null;
    total_revisiones: number;
};

/**Servicios de todas las cabeza de  ganado  */
export type Servicios = {
    id: number;
    numero: number;
    ultimo_servicio: string;
    toro: ToroDeServicio;
    efectividad: number;
    total_servicios: number;
};

/**Pesajes de leche de todas las cabeza de  ganado  */
export type PesajesLeche = {
    id: number;
    nombre: string;
    numero: number;
    ultimo_pesaje: PesajeLeche;
    pesaje_este_mes: boolean;
};

export type Comprador = {
    id: number;
    nombre: string;
};
