'use client';

import IconImprimir from '@/icons/icono-imprimir.svg';
import { toast } from 'sonner';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

type GenerateReport = {
    endPoint: 'ganado' | 'dashboard';
    id?: number;
};

export const ButtonGenerateReport = () => {

    const {id} = useParams<{ id: string }>() ;
    const pathname = usePathname();

    const generateReport = async (endPoint:GenerateReport['endPoint'], id?: number) => {
        try {
            const getFile = await fetch(
                `/api/reportes/${endPoint}${id ? `?id=${id}` : ''}  `,
            );
            toast.success(`Generando reporte...`);
            const file = await getFile.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(file as Blob);
            link.download = `Reporte_${endPoint}.pdf`;
            link.click();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    };

    const Button=({endPoint,id}:GenerateReport)=>{
        return (
           <button onClick={() => generateReport(endPoint,id)}>
                <IconImprimir className={'size-8'} />
            </button>
    )}

    /* reportes directos sin necesidad de un modal previo */
    if (pathname == `/ganado/${id}`) return <Button endPoint={'ganado'} id={parseInt(id)} />;
   
    else if (pathname == '/dashboard') return <Button endPoint={'dashboard'} />;
   
   /*reportes con la necesidad de un modal previo */
    else if (pathname == '/venta_leche')
        return (
            <Link href={`/reporte/venta_leche`}>
                <IconImprimir className={'size-8'} />
            </Link>
        );
    else if (pathname == '/fallecimientos')
        return (
            <Link href={`/reporte/causas_fallecimientos`}>
                <IconImprimir className={'size-8'} />
            </Link>
        );
    else if (pathname == '/venta_ganado')
        return (
            <Link href={`/reporte_anual/venta_ganado`}>
                <IconImprimir className={'size-8'} />
            </Link>
        );
 return ( <></>)
};