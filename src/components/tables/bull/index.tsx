'use client';

import { headerBull } from '@/collections/headerColums';
import { EstadosGanado, Pesos, ResponseToros, Toro } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';
import Link from 'next/link';
import { RedirectInTable } from '@/components/redirectsInTables';
import { DropDownOptions } from '@/components/dropdown options';
import { DropdownStatesCattle } from '@/components/dropdown states cattle';
import IconCheck from '@/icons/icono-check.svg';

export const TableBull = ({ toros }: ResponseToros) => {
    const renderCell = useCallback((toro: Toro, columnKey: Key) => {
        const cellValue = toro[columnKey as keyof Toro];

        switch (columnKey as keyof Toro) {
            case 'numero': {
                const numero = cellValue as number;
                return (
                    <RedirectInTable
                        id={toro['id']}
                        label={numero}
                        redirect="toros"
                    />
                );
            }
            case 'pesos': {
                const pesos = cellValue as Pesos;

                return (
                    <div>
                        {pesos
                            ? pesos.peso_actual
                                ? pesos.peso_actual
                                : 'desconocido'
                            : 'desconocido'}
                    </div>
                );
            }

            case 'estados': {
                const estados = cellValue as EstadosGanado[];

                return <DropdownStatesCattle estados={estados} />;
            }


            case 'id': {
                const id = toro['ganado_id'];
              const estados = toro['estados'] as EstadosGanado[];
                return !estados.some(
                    ({ estado }) =>
                        estado == 'fallecido' || estado == 'vendido',
                ) ? (
                    <DropDownOptions idCattle={id} optionType="cattle" />
                ) : (
                    <IconCheck className={'size-8'} />
                );
            }

            default:
                return cellValue as ReactNode;
        }
    }, []);

    return (
        <LayoutTable type="bull">
            <TableHeader columns={headerBull}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={toros}>
                {(toro) => (
                    <TableRow key={toro.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(toro, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
