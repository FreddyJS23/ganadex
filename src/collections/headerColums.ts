import {
    CabezasGanado,
    Comprador,
    CriaPendienteCapar,
    CriaPendienteNumeracion,
    Fallecimiento,
    Insumo,
    Parto,
    Partos,
    Personal,
    PesajeLecheGanado,
    PesajesLeche,
    PreciosDeLeche,
    GanadoDescarte,
    Revision,
    Revisiones,
    Servicio,
    Servicios,
    Toro,
    VentaGanado,
    VentaLeche,
    PajuelaToro,
} from '@/types';

type headersColumns = {
    key: keyof CabezasGanado;
    label: string;
};

type headersColumnsBull = {
    key: keyof Toro;
    label: string;
};

type headersColumnsBeef = {
    key: keyof GanadoDescarte;
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
type headersColumnsAllBirhs = {
    key: keyof Partos;
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
    key: keyof Servicio | 'toro/pajuela';
    label: string;
};

type headersColumnsBirths = {
    key: keyof Parto;
    label: string;
};

type headersColumnsWeightMilk = {
    key: keyof PesajeLecheGanado;
    label: string;
};

type headersColumnsAllWeightMilk = {
    key: keyof PesajesLeche;
    label: string;
};

type headersColumnsCustomer = {
    key: keyof Comprador;
    label: string;
};

type headersColumnDeadCattle = {
    key: keyof Fallecimiento;
    label: string;
};

type headersColumnsPajuelaToro = {
    key: keyof PajuelaToro;
    label: string;
};

export const headerCasttle: headersColumns[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'sexo', label: 'Sexo' },
    { key: 'fecha_nacimiento', label: 'Edad' },
    { key: 'pesos', label: 'Peso actual' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'origen', label: 'Origen' },
    { key: 'estados', label: 'Estados' },
    { key: 'id', label: 'Acciones' },
];
export const headerBull: headersColumnsBull[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'fecha_nacimiento', label: 'Fecha nacimiento' },
    { key: 'pesos', label: 'Peso actual' },
    { key: 'servicios', label: 'Servicios hechos' },
    { key: 'padre_en_partos', label: 'Padre en partos' },
    { key: 'efectividad', label: 'Efectividad' },
    { key: 'estados', label: 'Estados' },
    { key: 'id', label: 'Acciones' },
];
export const headerBeef: headersColumnsBeef[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'fecha_nacimiento', label: 'Fecha nacimiento' },
    { key: 'pesos', label: 'Peso actual' },
    { key: 'estados', label: 'Estados' },
    { key: 'id', label: 'Acciones' },
];

export const headerSaleCasttle: headersColumnsSaleCasttle[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'ganado', label: 'Numero de ganado' },
    { key: 'peso', label: 'Peso' },
    /* { key: 'precio', label: 'Precio' },
    { key: 'precio_kg', label: 'Precio por KG' }, */
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
    { key: 'id', label: 'Acciones' },
];

export const headerAllServes: headersColumnsAllServes[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'toro', label: 'Toro/Pajuela toro' },
    { key: 'total_servicios', label: 'Total de servicios' },
    { key: 'ultimo_servicio', label: 'Ultimo servicio' },
    { key: 'efectividad', label: 'Efectividad' },
    { key: 'id', label: 'Acciones' },
];

export const headerAllBirths: headersColumnsAllBirhs[] = [
    { key: 'numero', label: 'Numero' },
    { key: 'ultimo_parto', label: 'Ultimo parto' },
    { key: 'cria', label: 'Cria' },
    { key: 'toro', label: 'Toro/Pajuela toro' },
    { key: 'total_partos', label: 'Total de partos' },
    { key: 'id', label: 'Acciones' },
];

export const headerAssignmentNumberBullCalf: headersColumnsAssignmentNumberBullCalf[] =
    [
        { key: 'nombre', label: 'Nombre' },
        { key: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
        { key: 'id', label: 'Asignar' },
    ];

export const headerCastreteBullCalf: headersColumnsCastreteBullCalf[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
    { key: 'id', label: 'Capar' },
];

export const headerAllWeightMilk: headersColumnsAllWeightMilk[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'numero', label: 'Numero' },
    { key: 'pesaje_este_mes', label: 'Pesaje mes actual' },
    { key: 'ultimo_pesaje', label: 'ultimo pesaje' },
    { key: 'id', label: 'Pesar' },
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
    { key: 'toro/pajuela', label: 'Toro/Pajuela toro' },
];

export const headerBirths: headersColumnsBirths[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'observacion', label: 'Observación' },
];

export const headerWeightMilk: headersColumnsWeightMilk[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'pesaje', label: 'Pesaje' },
];

export const headerCustomers: headersColumnsCustomer[] = [
    { key: 'nombre', label: 'Nombre' },
];

export const headerDeadCattle: headersColumnDeadCattle[] = [
    { key: 'causa', label: 'Causa' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'ganado', label: 'Ganado' },
];

export const headerPajuelaToro: headersColumnsPajuelaToro[] = [
    { key: 'codigo', label: 'Codigo' },
];