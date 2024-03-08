import dynamic from 'next/dynamic';

export const iconsSidebar = {
    dashboard: dynamic(() => import('@/icons/icono-dashboard.svg')),
    setting: dynamic(() => import('@/icons/icono-ajuste.svg')),
    cattle: dynamic(() => import('@/icons/icono-ganado.svg')),
    supplies: dynamic(() => import('@/icons/icono-insumo.svg')),
    milk: dynamic(() => import('@/icons/icono-leche.svg')),
    staff: dynamic(() => import('@/icons/icono-personal.svg')),
    pregnancy: dynamic(() => import('@/icons/icono-preñadas.svg')),
    checkUp: dynamic(() => import('@/icons/icono-revision.svg')),
    serve: dynamic(() => import('@/icons/icono-servir.svg')),
};
