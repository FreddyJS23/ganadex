'use client';

import {
    headerCastreteBullCalf,
} from '@/collections/headerColums';
import {
    CriaPendienteCapar,
    ResponseCriasPendienteCapar,
} from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';
import IconButton from '@/icons/icono-capar-numeracion.svg';
import Link from 'next/link';

export const TableCastreteBullCalf = ({
    crias_pendiente_capar,
}: ResponseCriasPendienteCapar) => {
    const renderCell = useCallback(
        (
            criaPendienteCapar: CriaPendienteCapar,
            columnKey: Key,
        ) => {
            const cellValue = criaPendienteCapar[columnKey as keyof CriaPendienteCapar];

            switch (columnKey as keyof CriaPendienteCapar) {
                case 'nombre':{
                    const nombre = cellValue as string;
                    return (
                        <Link href={`ganado/${criaPendienteCapar['id']}`}>
                            {nombre}
                        </Link>
                    );}
                /* button icon */
                case 'id':{
                    const id = cellValue as number;
                    return (
                        <Link href={`capar_becerro/${id}`}>
                            <IconButton className={'size-6'} />
                        </Link>
                    );}

                default:
                    return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <>
            <LayoutTable type="castrete bull calf">
                <TableHeader columns={headerCastreteBullCalf}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={crias_pendiente_capar}>
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
