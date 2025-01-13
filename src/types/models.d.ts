import { StateCattle, TypeNotification, TypesCattle } from './enums';

export type PesajeLeche = `${string}-KG`;

type EstadosGanado = {
    id: number;
    estado: keyof typeof StateCattle;
};

type Pesos = {
    peso_nacimiento: number | null;
    peso_destete: number | null;
    peso_2year: number | null;
    peso_actual: number | null;
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
    'id' | 'nombre' | 'numero' | 'sexo' | 'origen' | 'fecha_nacimiento'
> & { peso: Pick<Pesos, 'peso_nacimiento'> };

type ToroDeServicio = Pick<Toro, 'id' | 'numero'>;

export type Ganado = {
    id: number;
    nombre: string;
    numero: number | null;
    origen: string | null;
    sexo: 'H' | 'M';
    tipo: keyof typeof TypesCattle;
    fecha_nacimiento: string | null;
    pesos?: Pesos;
    estados: EstadosGanado[];
    fecha_defuncion: string | null;
    causa_defuncion: string | null;
    eventos: Eventos;
};

export type Toro = Pick<
    Ganado,
    | 'id'
    | 'nombre'
    | 'numero'
    | 'origen'
    | 'fecha_nacimiento'
    | 'pesos'
    | 'tipo'
    | 'estados'
> & {
    sexo: 'M';
    efectividad: number;
    padre_en_partos: number;
    servicios: number;
    ganado_id: number;
};

export type PajuelaToro={
    id: number;
    codigo: string;
}

export type GanadoDescarte = Omit<
    Toro,
    'efectividad' | 'padre_en_partos' | 'servicios'
>;

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
    fecha: string;
    diagnostico: string;
    tratamiento: string;
    veterinario: veterinario;
};

/**Servicio individual de una cabeza de ganado */
export type Servicio = {
    id: number;
    fecha: string;
    observacion: string;
    tipo: string;
    toro?: Pick<Toro, 'id' | 'numero'>;
    pajuela_toro?:PajuelaToro
    veterinario: veterinario;
};

export type Parto = {
    id: number;
    fecha: string;
    observacion: string;
    cria: Cria;
    padre_toro?: Pick<Toro, 'id' | 'numero'>;
    pajuela_toro?: PajuelaToro;
    veterinario: veterinario;
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
    'id' | 'nombre' | 'fecha_nacimiento'
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
    ganado: Pick<Ganado, 'id' | 'numero'>;
    /* precio: number;
    precio_kg: number; */
    comprador: string;
};

export type Fallecimiento = {
    id: number;
    fecha: string;
    causa: string;
    ganado: Pick<Ganado, 'id' | 'numero'>;
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
export type Servicios = Pick<Ganado, 'id' | 'numero'> & {
    ultimo_servicio: string;
    toro?: Pick<Toro, 'id' | 'numero'>;
    pajuela_toro?: PajuelaToro;
    efectividad: number;
    total_servicios: number;
};

/**Pesajes de leche de todas las cabeza de  ganado  */
export type PesajesLeche = Pick<Ganado, 'id' | 'numero' | 'nombre'> & {
    ultimo_pesaje: PesajeLeche;
    pesaje_este_mes: boolean;
};

/**Partos de todas las cabeza de ganado  */
export type Partos = Pick<Ganado, 'id' | 'numero'> & {
    ultimo_parto: string | null;
    total_partos: number;
    toro?: Pick<Toro, 'id' | 'numero'>;
    pajuela_toro?: PajuelaToro;
    cria: Pick<Cria, 'id' | 'numero'>;
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
    ganado: Pick<Ganado, 'id' | 'numero'>;
};

export type TypesNotification = {
    revision?: Notification[];
    parto?: Notification[];
    secado?: Notification[];
};

export type PositionStaff = {
    id: number;
    cargo: 'obrero' | 'veterinario';
};

export type YearSalesCattle = {
    año: number;
};

export type DayVaccination = {
    id: number;
    fecha_inicio: string;
    fecha_fin: string;
    vacuna: number;
    vacunados:number;
    ganado_vacunado:string[]
};

export type AvailableVaccines = {
    id: number;
    nombre: string;
    intervalo_dosis: number;
    tipo_animal:Array<'rebano'|'novillo'|'adulto'|'becerras'>
}
