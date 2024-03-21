'use client';

import { headerAllServes } from '@/collections/headerColums';
import { ResponseServiciosGeneral, Servicios, ToroDeServicio } from '@/types';
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

export const TableAllServes = ({
    todos_servicios,
}: ResponseServiciosGeneral) => {
    const renderCell = useCallback(
        (servicios: Servicios, columnKey:Key) => {
            const cellValue = servicios[columnKey as keyof Servicios];
            switch (columnKey) {
                case 'toro':{
                    const toro = cellValue as ToroDeServicio;

                    return <Link href={`toro/${toro.id}`}>{toro.numero}</Link>;
                    break;}

                default:
                    break;
            }

          return (
            cellValue as ReactNode
          );
        },
        [],
    );

    return (
        <LayoutTable type="serves">
            <TableHeader columns={headerAllServes}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={todos_servicios}>
                {(servicios) => (
                    <TableRow key={servicios.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(servicios, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
