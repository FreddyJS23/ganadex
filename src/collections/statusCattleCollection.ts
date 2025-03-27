import { EstadosGanado } from "@/types";
type statusOptions={
    id:EstadosGanado['id']
    estado:EstadosGanado['estado']
    label:string,
}

export const statusOptions:statusOptions[]=[
    {id:1,estado:'sano',label:'Sanos'},
    {id:2,estado:'fallecido',label:'Fallecidos'},
    {id:3,estado:'gestacion',label:'En gestación'},
    {id:4,estado:'lactancia',label:'Lactancia'},
    {id:5,estado:'vendido',label:'Vendidos'},
    {id:10,estado:'pendiente_revision',label:'Pendientes de revisión'},
    {id:11,estado:'pendiente_servicio',label:'Pendientes de servicio'},
    {id:12,estado:'pendiente_secar',label:'Pendientes de secar'},
    {id:15,estado:'pendiente_pesaje_leche',label:'Pendiente de pesaje de leche'},
]