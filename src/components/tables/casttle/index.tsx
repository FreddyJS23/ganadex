'use client';

import { headerCasttle } from '@/collections/headerColums';
import { CabezasGanado, EstadosGanado, ResponseGanados } from '@/types';
import { getAge } from '@/utils/getAge';
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

export const TableCasttle = ({ cabezas_ganado }: ResponseGanados) => {
    const renderCell = useCallback(
        (cabeza_ganado: CabezasGanado, columnKey: keyof CabezasGanado): any => {
            const cellValue = cabeza_ganado[columnKey];

            switch (columnKey) {
                case 'numero':
                    const numero = cellValue as number;
                    return (
                        <Link href={`ganado/${cabeza_ganado['id']}`}>
                            {numero}
                        </Link>
                    );

                case 'estados':
                    const estados = cellValue as EstadosGanado[];
                    return (
                        <div className="flex flex-wrap">
                            {estados.map(({ id, estado }) => (
                                <span key={id}>{estado}</span>
                            ))}
                        </div>
                    );

                case 'fecha_nacimiento':
                    const fecha_nacimiento = cellValue as Date;
                    return <div>{getAge(fecha_nacimiento)}</div>;

                default:
                    return cellValue;
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
                        {(columnKey: any) => (
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
