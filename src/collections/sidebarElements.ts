import { SidebarElementProps } from "@/types";


export const options:Pick<SidebarElementProps,"element" | "icon" | "url"  >[]  = [
    { element: "Ganado",  icon: "cattle",url:'/ganado' },
    { element: "Venta de leche",  icon: "milk" , url:"/venta_leche" },
    { element: "Revisiones",  icon: "checkUp", url:"/revisiones" },
    { element: "Servicios",  icon: "serve", url:"/servicios" },
    { element: "Partos",  icon: "pregnancy", url:"/partos" },
    { element: "Insumos",  icon: "supplies", url:"/insumos" },
    { element: "Personal",  icon: "staff", url:"/personal" },
    { element: "Ajustes",  icon: "setting", url:"/ajustes" },
    
];