import { Months, TypesCattle, TypesCattle } from '.';
import {
    Comprador,
    Ganado,
    Insumo,
    VentaGanado,
} from './models';


type BalanceMensual = {
    mes: keyof typeof Months;
};

/* --------------------------- Principal -------------------------- */

type vacaProductora = {
    ganado:Pick<Ganado,'id'|'numero'>
    peso_leche: number;
};

type vacaMenosProductora = vacaProductora;

type BalanceMensualLeche=BalanceMensual & {
promedio_mensual:number
};

export type TotalTiposGanado = {
    [Property in keyof typeof TypesCattle]: number;
};

export type ResponseTotalTiposGanado = {
    total_tipos_ganado: TotalTiposGanado[];
};

export type TotalPersonal = {
    total_personal: number;
};

export type TotalVacasEnGestacion = {
    vacas_en_gestacion: number;
};

export type TopVacasProductoras = {
    top_vacas_productoras: vacaProductora[];
};

export type TopVacasMenosProductoras = {
    top_vacas_menos_productoras: vacaMenosProductora[];
};

export type TotalGanadoPendienteRevision = {
    ganado_pendiente_revision: number;
};
export type TotalGanadoPendienteservir = {
    cantidad_vacas_para_servir: number;
};

export type InsumoMenorExistencia = {
    menor_cantidad_insumo: Insumo;
};
export type InsumoMayorExistencia = {
    mayor_cantidad_insumo: Insumo;
};

export type balanceAnualLeche = {
    balance_anual: BalanceMensualLeche[];
};

/* ------------------------  Venta de leche ------------------------ */

export type PrecioActual = {
    precio_actual: number;
};

export type VariacionPrecio = {
    variacion: number;
};

export type GanaciasMes = {
    ganancias: number;
};

/* ------------------------------ Venta ganado ------------------------------ */

export type MejorComprador = {
    comprador: Comprador;
};

export type MejorVenta = {
    venta: VentaGanado;
};

export type PeorVenta = MejorVenta;

/* ----------------------------- fallecimientos ----------------------------- */

type CausaFrecuente = {
    fallecimientos: number;
    causa: string;
};

export type Fallecimientos = {
    total_fallecidos: number;
    causas_frecuentes: CausaFrecuente[];
};
