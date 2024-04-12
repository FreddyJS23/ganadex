'use client';

import { headerAllWeightMilk } from '@/collections/headerColums';
import { PesajesLeche, ResponsePesajesLecheGeneral } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';
import IconButton from '@/icons/icono-peso.svg';
import Link from 'next/link';
import IconCheck from '@/icons/icono-check.svg';
import IconError from '@/icons/icono-error.svg';

export const TableAllWeightMilk = ({
    todos_pesaje_leche,
}: ResponsePesajesLecheGeneral) => {
    const renderCell = useCallback(
        (pesajeLeche: PesajesLeche, columnKey: Key) => {
            const cellValue = pesajeLeche[columnKey as keyof PesajesLeche];

            switch (columnKey as keyof PesajesLeche) {
                /* button icon */
                case 'id':{
                    const id = cellValue as number;
                    return (
                        <>
                            <Link href={`pesajes_leche/${id}`}>
                                <IconButton className={'size-6'} />
                            </Link>
                        </>
                    );}

                case 'pesaje_este_mes':{
                    const pesadaEsteMes = pesajeLeche['pesaje_este_mes'];
                    return pesadaEsteMes ? (
                        <IconCheck className={'size-8'} />
                    ) : (
                        <IconError className={'size-8'} />
                    );}

                default:
                        return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <>
            <LayoutTable type="all weight milk">
                <TableHeader columns={headerAllWeightMilk}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={todos_pesaje_leche}>
                    {(pesajeLeche) => (
                        <TableRow key={pesajeLeche.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(pesajeLeche, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>
        </>
    );
};
