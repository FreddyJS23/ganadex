import { CabezasGanado } from "@/types"

type headersColumns={
key:keyof CabezasGanado
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