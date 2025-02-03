'use client';

import { headerJornadasVacunacion } from '@/collections/headerColums';
import { DayVaccination, ResponseJornadasVacunacion } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable, TableComponent } from '..';

export const TableVAccinationDay = ({ jornadas_vacunacion }: ResponseJornadasVacunacion) => {
    const renderCell = useCallback((jornadaVacunacion: DayVaccination, columnKey: Key) => {
        const cellValue = jornadaVacunacion[columnKey as keyof DayVaccination];

        switch (columnKey as keyof DayVaccination) {
            case 'ganado_vacunado': {
                const ganado_vacunado = cellValue as string[];
                return <span>{ganado_vacunado.join(', ')}</span>;
            }
            default:
                break;
        }

        return cellValue as ReactNode;
    }, []);

    return (
        <TableComponent
            type="vaccinationDay"
            columnsCollection={headerJornadasVacunacion}
            items={jornadas_vacunacion}
            renderCell={renderCell}
        />
    );
};
