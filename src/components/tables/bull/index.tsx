'use client';

import { headerBull } from '@/collections/headerColums';
import { Pesos, ResponseToros, Toro } from '@/types';
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
                );;
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
