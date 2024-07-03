'use client';

import { headerSaleMilk } from '@/collections/headerColums';
import { ResponseVentasLeche, VentaLeche } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';

export const TableSaleMilk = ({ ventas_de_leche }: ResponseVentasLeche) => {
    const renderCell = useCallback(
        (venta_ganado: VentaLeche, columnKey: Key) => {
            const cellValue = venta_ganado[columnKey as keyof VentaLeche];

            return cellValue as ReactNode;
        },
        [],
    );

    return (
        <LayoutTable type="sale casttle">
            <TableHeader columns={headerSaleMilk}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={ventas_de_leche}>
                {(venta_leche) => (
                    <TableRow key={venta_leche.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(venta_leche, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
