'use client';

import { headerAssignmentNumberBullCalf } from '@/collections/headerColums';
import {
    CriaPendienteNumeracion,
    ResponseCriasPendienteNumeracion,
} from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, useCallback } from 'react';
import { LayoutTable } from '..';
import IconButton from '@/icons/icono-capar-numeracion.svg';
import Link from 'next/link';


export const TableAssignmentNumberBullCalf = ({
    crias_pendiente_numeracion,
}: ResponseCriasPendienteNumeracion) => {
    const renderCell = useCallback(
        (
            criaPendienteNumeracion: CriaPendienteNumeracion,
            columnKey: Key,
        ) => {
            const cellValue = criaPendienteNumeracion[columnKey as keyof CriaPendienteNumeracion];

            switch (columnKey as keyof CriaPendienteNumeracion) {
                case 'nombre':
                    const nombre = cellValue as string;
                    return (
                        <Link href={`ganado/${criaPendienteNumeracion['id']}`}>
                            {nombre}
                        </Link>
                    );
                /* button icon */
                case 'id':
                    const id = cellValue as number;
                    return (
                        <Link href={`asignar_numero/${id}`}>
                            <IconButton className={'size-6'} />
                        </Link>
                    );

                default:
                    return (
                        typeof cellValue == 'string' ||
                        typeof cellValue == 'number' && cellValue
                    );
            }
        },
        [],
    );

    return (
        <>
            <LayoutTable type="assignment bull calf">
                <TableHeader columns={headerAssignmentNumberBullCalf}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={crias_pendiente_numeracion}>
                    {(cria) => (
                        <TableRow key={cria.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(cria, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>
        </>
    );
};
