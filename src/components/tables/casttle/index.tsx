'use client';

import { headerCasttle } from '@/collections/headerColums';
import { CabezasGanado, EstadosGanado, Pesos, ResponseGanados } from '@/types';
import { getAge } from '@/utils/getAge';
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
import { DropdownStatesCattle } from '@/components/dropdown states cattle';

export const TableCasttle = ({ cabezas_ganado }: ResponseGanados) => {
    const renderCell = useCallback(
        (cabeza_ganado: CabezasGanado, columnKey: Key) => {
            const cellValue = cabeza_ganado[columnKey as keyof CabezasGanado];

            switch (columnKey as keyof CabezasGanado) {
                case 'numero': {
                    const numero = cellValue as number;
                    return (
                        <Link href={`ganado/${cabeza_ganado['id']}`}>
                            {numero}
                        </Link>
                    );
                }
                case 'pesos': {
                    const pesos = cellValue as Pesos;
                    return (
                      <div>{pesos.peso_actual}</div>
                    );
                }

                case 'estados': {
                    const estados = cellValue as EstadosGanado[];

                    return <DropdownStatesCattle estados={estados} />;
                }

                case 'fecha_nacimiento': {
                    const fecha_nacimiento = cellValue as string;
                    return <div>{getAge(fecha_nacimiento)}</div>;
                }

                default:
                    return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <LayoutTable type="casttle">
            <TableHeader columns={headerCasttle}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={cabezas_ganado}>
                {(cabeza_ganado) => (
                    <TableRow key={cabeza_ganado.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(cabeza_ganado, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
