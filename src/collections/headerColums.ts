import {
    CabezasGanado,
    CriaPendienteCapar,
    CriaPendienteNumeracion,
    Insumo,
    Personal,
    PreciosDeLeche,
    Revision,
    Revisiones,
    Servicio,
    Servicios,
    VentaGanado,
    VentaLeche,
} from '@/types';

type headersColumns = {
    key: keyof CabezasGanado;
    label: string;
};

type headersColumnsSaleCasttle = {
    key: keyof VentaGanado;
    label: string;
};

type headersColumnsSaleMilk = {
    key: keyof VentaLeche;
    label: string;
};

type headersColumnsSupplies = {
    key: keyof Insumo;
    label: string;
};

type headersColumnsStaff = {
    key: keyof Personal;
    label: string;
};

type headersColumnsAllCheckups = {
    key: keyof Revisiones;
    label: string;
};

type headersColumnsAllServes = {
    key: keyof Servicios;
    label: string;
};

type headersColumnsAssignmentNumberBullCalf = {
    key: keyof CriaPendienteNumeracion;
    label: string;
};
type headersColumnsCastreteBullCalf = {
    key: keyof CriaPendienteCapar;
    label: string;
};

type headersColumnsHistoryPriceMilk = {
    key: keyof PreciosDeLeche;
    label: string;
};
type headersColumnsCheckups = {
    key: keyof Revision;
    label: string;
};

type headersColumnsServices = {
    key: keyof Servicio;
    label: string;
};

export const headerCasttle: headersColumns[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'sexo', label: 'Sexo' },
    { key: 'fecha_nacimiento', label: 'Edad' },
    { key: 'peso_actual', label: 'Peso actual' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'origen', label: 'Origen' },
    { key: 'estados', label: 'Estados' },
];

export const headerSaleCasttle: headersColumnsSaleCasttle[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'numero_ganado', label: 'Numero de ganado' },
    { key: 'peso', label: 'Peso' },
    { key: 'precio', label: 'Precio' },
    { key: 'precio_kg', label: 'Precio por KG' },
    { key: 'comprador', label: 'Comprador' },
];

export const headerSaleMilk: headersColumnsSaleMilk[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'cantidad', label: 'Cantidad' },
    { key: 'precio', label: 'Precio' },
];

export const headerSupplies: headersColumnsSupplies[] = [
    { key: 'insumo', label: 'Insumo' },
    { key: 'cantidad', label: 'Cantidad en inventario' },
    { key: 'precio', label: 'Coste individual' },
];

export const headerStaff: headersColumnsStaff[] = [
    { key: 'ci', label: 'Cedula' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
    { key: 'cargo', label: 'Cargo' },
];

export const headerAllCheckup: headersColumnsAllCheckups[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'diagnostico', label: 'Diagnostico' },
    { key: 'proxima_revision', label: 'Proxima revision' },
    { key: 'ultima_revision', label: 'Ultima revision' },
    { key: 'total_revisiones', label: 'Total de revisiones' },
];

export const headerAllServes: headersColumnsAllServes[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'toro', label: 'Toro' },
    { key: 'total_servicios', label: 'Total de servicios' },
    { key: 'ultimo_servicio', label: 'Ultimo servicio' },
    { key: 'efectividad', label: 'Efectividad' },
];

export const headerAssignmentNumberBullCalf: headersColumnsAssignmentNumberBullCalf[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
    { key: 'id', label: 'Asignar' },
   
];

export const headerCastreteBullCalf: headersColumnsCastreteBullCalf[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
    { key: 'id', label: 'Capar' },
   
];
export const headerHistoryPriceMilk: headersColumnsHistoryPriceMilk[] = [
    { key: 'precio', label: 'Precio' },
    { key: 'fecha', label: 'Fecha' },
];

export const headerCheckups: headersColumnsCheckups[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'diagnostico', label: 'Diagnostico' },
];

export const headerServices: headersColumnsServices[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'numero_toro', label: 'Toro' },
   
];
