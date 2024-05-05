import { StateCattle, TypeNotification, TypesCattle } from './enums';

export type PesajeGanado = `${string}-KG`;

export type PesajeLeche = `${string}-KG`;

type EstadosGanado = {
    id: number;
    estado: keyof typeof StateCattle;
};

type Pesos = {
    peso_nacimiento: PesajeGanado | null;
    peso_destete: PesajeGanado | null;
    peso_2year: PesajeGanado | null;
    peso_actual: PesajeGanado | null;
};

type Eventos = {
    prox_revision: string | null;
    prox_servicio: string | null;
    prox_parto: string | null;
    prox_secado: string | null;
};

type veterinario={
    id:number;
    nombre:string;
}

type Cria = Pick<
    Ganado,
    | 'id'
    | 'nombre'
    | 'numero'
    | 'sexo'
    | 'origen'
    | 'fecha_nacimiento'
    
>& {peso:Pick <Pesos,'peso_nacimiento'>};

type ToroDeServicio = Pick<Toro, 'id' | 'numero'>;

export type Ganado = {
    id: number;
    nombre: string;
    numero: number | null;
    origen: string | null;
    sexo: 'H' | 'M';
    tipo: keyof typeof TypesCattle;
    fecha_nacimiento: string | null;
    pesos:Pesos;
    estados: EstadosGanado[];
    fecha_defuncion: string | null;
    causa_defuncion: string | null;
    eventos:Eventos
};

export type Toro =Pick<Ganado, 'id' | 'nombre' | 'numero' | 'origen' | 'fecha_nacimiento' | 'pesos' | 'tipo'> 
& {
     sexo :'M'
    efectividad:number;
    padre_en_partos:number;
    servicios:number
    }

export type Res = Omit<Toro,'efectividad' | 'padre_en_partos' | 'servicios'>

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
    telefono:string;
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
    veterinario:veterinario
};

/**Servicio individual de una cabeza de ganado */
export type Servicio = {
    id: number;
    fecha: string;
    observacion: string;
    tipo: string;
    toro:Pick <Toro,'id' | 'numero'>
    veterinario: veterinario;
};

export type Parto = {
    id: number;
    fecha: string;
    observacion: string;
    cria: Cria;
    padre_toro: Pick<Toro, 'id' | 'numero'>;
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
    ganado:Pick <Ganado,'id' | 'numero'>
    precio: number;
    precio_kg: number;
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

/**Partos de todas las cabeza de ganado  */
export type Partos = {
    id: number;
    numero: number;
    ultimo_parto: string | null;
    total_partos: number;
    toro: Pick <Toro,'id'| 'numero'>;
    cria: Pick <Cria,'id'| 'numero'>;
};

export type Comprador = {
    id: number;
    nombre: string;
};

export type Notification = {
    id: number;
    tipo:keyof typeof TypeNotification;
    leido:boolean;
    dias_para_evento:number;
    ganado:Pick<Ganado,'id' | 'numero'>
};

export type TypesNotification = {
    revision?: Notification[];
    parto?: Notification[];
    secado?: Notification[];
};

export type PositionStaff = {
    id:number;
    cargo:'obrero' | 'veterinario';
}