import { CabezasGanado, Insumo, Personal, VentaGanado, VentaLeche } from "@/types"

type headersColumns={
key:keyof CabezasGanado
label:string
}

type headersColumnsSaleCasttle={
key:keyof VentaGanado
label:string
}

type headersColumnsSaleMilk={
key:keyof VentaLeche
label:string
}

type headersColumnsSupplies={
key:keyof Insumo
label:string
}

type headersColumnsStaff={
key:keyof Personal
label:string
}

export const headerCasttle:headersColumns[]=[

    {key:"numero",label:"Numero"},
    {key:"nombre",label:"Nombre"},
    {key:"sexo",label:"Sexo"},
    {key:"fecha_nacimiento",label:"Edad"},
    {key:"peso_actual",label:"Peso actual"},
    {key:"tipo",label:"Tipo"},
    {key:"origen",label:"Origen"},
    {key:"estados",label:"Estados"},
]

export const headerSaleCasttle:headersColumnsSaleCasttle[]=[

    {key:"fecha",label:"Fecha"},
    {key:"numero_ganado",label:"Numero de ganado"},
    {key:"peso",label:"Peso"},
    {key:"precio",label:"Precio"},
    {key:"precio_kg",label:"Precio por KG"},
    {key:"comprador",label:"Comprador"},
]

export const headerSaleMilk:headersColumnsSaleMilk[]=[
    {key:"fecha",label:"Fecha"},
    {key:"cantidad",label:"Cantidad"},
    {key:"precio",label:"Precio"},
]

export const headerSupplies:headersColumnsSupplies[]=[
    {key:"insumo",label:"Insumo"},
    {key:"cantidad",label:"Cantidad en inventario"},
    {key:"precio",label:"Coste individual"},
   
]

export const headerStaff:headersColumnsStaff[]=[
    {key:"ci",label:"Cedula"},
    {key:"nombre",label:"Nombre"},
    {key:"apellido",label:"Apellido"},
    {key:"fecha_nacimiento",label:"Fecha de nacimiento"},
    {key:"cargo",label:"Cargo"},
]