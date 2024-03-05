import { SidebarElementProps } from "@/types";


export const options:Pick<SidebarElementProps,"element" | "icon" | "url" | "optionMultiple"  > []  = [
    { element: "Ganado",  icon: "cattle",url:'/ganado', optionMultiple:false },
    { element: "Venta de leche",  icon: "milk" , url:"/venta_leche", optionMultiple:false },
    { element: "Revisiones",  icon: "checkUp", url:"/revisiones", optionMultiple:false },
    { element: "Servicios",  icon: "serve", url:"/servicios", optionMultiple:false },
    { element: "Partos",  icon: "pregnancy", url:"/partos", optionMultiple:false },
    { element: "Insumos",  icon: "supplies", url:"/insumos", optionMultiple:true },
    { element: "Personal",  icon: "staff", url:"/personal", optionMultiple:true },
    { element: "Ajustes",  icon: "setting", url:"/ajustes", optionMultiple:true },
    
];