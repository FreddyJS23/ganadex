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
import { useCallback } from 'react';
import { LayoutTable } from '..';
import Link from 'next/link';

export const TableSaleCasttle = ({ ventas }: ResponseVentasGanado) => {
    const renderCell = useCallback(
        (venta_ganado: VentaGanado, columnKey: keyof VentaGanado): any => {
            const cellValue = venta_ganado[columnKey];

            switch (columnKey) {
                case 'numero_ganado':
                    const numero = cellValue as number;
                    return (
                        <Link href={`ganado/${venta_ganado['id']}`}>
                            {numero}
                        </Link>
                    );

                default:
                    return cellValue;
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
                        {(columnKey: any) => (
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
