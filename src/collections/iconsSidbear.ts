import dynamic from 'next/dynamic';

export const iconsSidebar = {
    dashboard: dynamic(() => import('@/icons/icono-dashboard.svg')),
    register: dynamic(() => import('@/icons/icono-registrar.svg')),
    consult: dynamic(() => import('@/icons/icono-consultar.svg')),
    operations: dynamic(() => import('@/icons/icono-operaciones.svg')),
    sales: dynamic(() => import('@/icons/icono-ventas.svg')),
    supplies: dynamic(() => import('@/icons/icono-insumo.svg')),
    staff: dynamic(() => import('@/icons/icono-personal.svg')),
    setting: dynamic(() => import('@/icons/icono-ajuste.svg')),
};
