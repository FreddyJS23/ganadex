'use client';

import { headerSaleCasttle } from '@/collections/headerColums';
import { ResponseVentasGanado, VentaGanado } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, useCallback } from 'react';
import { LayoutTable } from '..';
import Link from 'next/link';

export const TableSaleCasttle = ({ ventas }: ResponseVentasGanado) => {
    const renderCell = useCallback(
        (venta_ganado: VentaGanado, columnKey: Key) => {
            const cellValue = venta_ganado[columnKey as keyof VentaGanado];

            switch (columnKey as keyof VentaGanado) {
                case 'numero_ganado':
                    const numero = cellValue as number;
                    return (
                        <Link href={`ganado/${venta_ganado['id']}`}>
                            {numero}
                        </Link>
                    );

                default:
                return (
                    typeof cellValue == 'string' ||
                    (typeof cellValue == 'number' && cellValue)
                );
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
