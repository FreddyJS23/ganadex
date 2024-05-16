export type OptionsDropdown={
    url:'venta_ganado' | 'fallecimientos' | 'revision' | 'servicio' |  'parto' ;
    label:'Vender' | 'Fallecer' | 'Nuevo' | 'Ver historial'; 
}

export const optionsDropdownCattle:OptionsDropdown[]=[
    {url:'venta_ganado',label:'Vender'},
    {url:'fallecimientos',label:'Fallecer'},
]
export const optionsDropdownCheckup:OptionsDropdown[]=[
    {url:'revision',label:'Nuevo'},
    {url:'revision',label:'Ver historial'},
]
export const optionsDropdownServe:OptionsDropdown[]=[
    {url:'servicio',label:'Nuevo'},
    {url:'servicio',label:'Ver historial'},
]
export const optionsDropdownBirh:OptionsDropdown[]=[
    {url:'parto',label:'Nuevo'},
    {url:'parto',label:'Ver historial'},
]