'use client';

import IconImprimir from '@/icons/icono-imprimir.svg';
import { toast } from 'sonner';
import { endpointsReports } from '@/collections/endPointsApi';

type ButtonGenerateReportProps = {
    report: keyof typeof endpointsReports;
    id?:number
};

export const ButtonGenerateReport = ({ report,id }: ButtonGenerateReportProps) => {
    const generateReport = async (endPoint: keyof typeof endpointsReports) => {
        try {
            const getFile = await fetch(`/api/reportes/${endPoint}${id ?  `?id=${id}` : '' }  ` );
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

    return (
        <button onClick={() => generateReport(report)}>
            <IconImprimir className={'size-8'} />
        </button>
    );
};
