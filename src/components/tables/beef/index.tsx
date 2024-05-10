'use client';

import { headerBeef } from '@/collections/headerColums';
import { Pesos, Res, ResponseReses } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';
import { RedirectInTable } from '@/components/redirectsInTables';

export const TableBeef = ({ reses }: ResponseReses) => {
    const renderCell = useCallback((res: Res, columnKey: Key) => {
        const cellValue = res[columnKey as keyof Res];

        switch (columnKey as keyof Res) {
            case 'numero': {
                const numero = cellValue as number;
                return (
                    <RedirectInTable
                        id={res['id']}
                        label={numero ?? ''}
                        redirect="reses"
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
        <LayoutTable type="beef">
            <TableHeader columns={headerBeef}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={reses}>
                {(res) => (
                    <TableRow key={res.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(res, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
