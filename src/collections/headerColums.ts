import { CabezasGanado, VentaGanado } from "@/types"

type headersColumns={
key:keyof CabezasGanado
label:string
}

type headersColumnsSaleCasttle={
key:keyof VentaGanado
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