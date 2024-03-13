import dynamic from 'next/dynamic';

export const iconsModal = {
    weight: dynamic(() => import('@/icons/icono-peso.svg')),
    bullCalf: dynamic(() => import('@/icons/icono-capar-numeracion.svg')),
    price: dynamic(() => import('@/icons/icono-precio.svg')),
    milk: dynamic(() => import('@/icons/icono-leche.svg')),
    cattleV2: dynamic(() => import('@/icons/icono-ganado1.svg')),
    dead: dynamic(() => import('@/icons/icono-muerte ganado.svg')),
    checkUp: dynamic(() => import('@/icons/icono-revision.svg')),
    pregnancy: dynamic(() => import('@/icons/icono-preñadas.svg')),
    serve: dynamic(() => import('@/icons/icono-servir.svg')),
    customer: dynamic(() => import('@/icons/icono-comprador.svg')),
};
