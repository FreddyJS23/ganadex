export type OptionsDropdown = {
    url:
        | 'venta_ganado'
        | 'fallecimientos/registrar'
        | 'revision'
        | 'servicio'
        | 'parto'
        | 'descartar_ganado';
    label: 'Vender' | 'Fallecer' | 'Nuevo' | 'Ver historial' | 'Descartar ganado';
};

export const optionsDropdownCattle: OptionsDropdown[] = [
    { url: 'venta_ganado', label: 'Vender' },
    { url: 'fallecimientos/registrar', label: 'Fallecer' },
    { url: 'descartar_ganado', label: 'Descartar ganado' },
];
export const optionsDropdownCheckup: OptionsDropdown[] = [
    { url: 'revision', label: 'Nuevo' },
    { url: 'revision', label: 'Ver historial' },
];
export const optionsDropdownServe: OptionsDropdown[] = [
    { url: 'servicio', label: 'Nuevo' },
    { url: 'servicio', label: 'Ver historial' },
];
export const optionsDropdownBirh: OptionsDropdown[] = [
    { url: 'parto', label: 'Nuevo' },
    { url: 'parto', label: 'Ver historial' },
];
