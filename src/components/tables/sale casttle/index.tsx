'use client';

import { headerSaleCasttle } from '@/collections/headerColums';
import { Ganado, ResponseVentasGanado, VentaGanado } from '@/types';
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

export const TableSaleCasttle = ({ ventas }: ResponseVentasGanado) => {
    const renderCell = useCallback(
        (venta_ganado: VentaGanado, columnKey: Key) => {
            const cellValue = venta_ganado[columnKey as keyof VentaGanado];

            switch (columnKey as keyof VentaGanado) {
                case 'ganado': {
                    const ganado = cellValue as Pick<Ganado, 'id' | 'numero'>;
                    return (
                        <Link href={`ganado/${ganado.id}`}>
                            {ganado.numero}
                        </Link>
                    );
                }

                default:
                    return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <LayoutTable type="sale casttle">
            <TableHeader columns={headerSaleCasttle}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={ventas}>
                {(venta_ganado) => (
                    <TableRow key={venta_ganado.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(venta_ganado, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
