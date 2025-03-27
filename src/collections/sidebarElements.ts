import { SidebarElementProps } from '@/types';

export const optionsSidebarAdmin: Pick<
    SidebarElementProps,
    'element' | 'icon' | 'url' | 'options'
>[] = [
    {element:"Dashboard", icon:"dashboard",url:"/dashboard"},
    {
        element: 'Registrar',
        icon: 'register',
        url: null,
        options: [
            {
                option: 'Vaca',
                url: '/ganado',
            },
            {
                option: 'Toro',
                url: '/toros',
            },
            {
                option: 'Ganado descarte',
                url: '/ganado_descarte',
            },
            {
                option: 'Pajuela toro',
                url: '/pajuela_toro',
            },
        ],
    },
    {
        element: 'Consultar',
        icon: 'consult',
        url: null,
        options: [
            {
                option: 'Vacas',
                url: '/ganado',
            },
            {
                option: 'Toros',
                url: '/toros',
            },
            {
                option: 'Pajuelas toro',
                url: '/pajuela_toro',
            },
        ],
    },
    {
        element: 'Operaciones',
        icon: 'operations',
        url: null,
        options: [
            {
                option: 'Revisiones',
                url: '/revisiones',
            },
            {
                option: 'Servicios',
                url: '/servicios',
            },
            {
                option: 'Partos',
                url: '/partos',
            },
            {
                option: 'Pesajes de leche',
                url: '/pesajes_leche',
            },
            {
                option: 'Fallecimientos',
                url: '/fallecimientos',
            },
            {
                option: 'Planes sanitario',
                url: '/planes_sanitario',
            },
            /* {
                option: 'Capar animal',
                url: '/capar_becerro',
            }, */
        ],
    },

    {
        element: 'Ventas',
        icon: 'sales',
        url: null,
        options: [
            /* {
                option: 'Leche',
                url: '/venta_leche',
            }, */
            {
                option: 'Vender',
                url: '/venta_ganado/animales_disponibles',
            },
            {
                option: 'Historial',
                url: '/venta_ganado/historial',
            },
        ],
    },

   /*  {
        element: 'Insumos',
        icon: 'supplies',
        url: '/insumos',
        options: [
            {
                option: 'Registrar',
                url: '/insumos',
            },
        ],
    }, */
    {
        element: 'Personal',
        icon: 'staff',
        url: '/personal',
        options: [
            {
                option: 'Registrar',
                url: '/personal',
            },
        ],
    },
];

export const optionsSidebarVeterinary: Pick<
    SidebarElementProps,
    'element' | 'icon' | 'url' | 'options'
>[] =[
    {element:'Vacas',icon:'castle',url:'/ganado'},
    {element:'Toros',icon:'bull',url:'/toros'},
    {
        element: 'Operaciones',
        icon: 'operations',
        url: null,
        options: [
            {
                option: 'Revisiones',
                url: '/revisiones',
            },
            {
                option: 'Servicios',
                url: '/servicios',
            },
            {
                option: 'Partos',
                url: '/partos',
            },
            {
                option: 'Fallecimientos',
                url: '/fallecimientos',
            },
            {
                option: 'Planes sanitario',
                url: '/planes_sanitario',
            },
            /* {
                option: 'Capar animal',
                url: '/capar_becerro',
            }, */
        ],
    },
]