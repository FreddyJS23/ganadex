import { SidebarElementProps } from '@/types';

export const options: Pick<
    SidebarElementProps,
    'element' | 'icon' | 'url' | 'options'
>[] = [
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
                option: 'Ganado descarte',
                url: '/ganado_descarte',
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
                option: 'Ganado',
                url: '/venta_ganado',
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
    {
        element: 'Ajustes',
        icon: 'setting',
        url: '/ajustes',
    },
];
