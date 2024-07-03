'use client';

import { headerDeadCattle } from '@/collections/headerColums';
import { Fallecimiento, Ganado, ResponseFallecimientos } from '@/types';
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

export const TableDeadCattle = ({ fallecidos }: ResponseFallecimientos) => {
    const renderCell = useCallback(
        (fallecimiento: Fallecimiento, columnKey: Key) => {
            const cellValue = fallecimiento[columnKey as keyof Fallecimiento];

            switch (columnKey as keyof Fallecimiento) {
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
        <LayoutTable type="dead cattle">
            <TableHeader columns={headerDeadCattle}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={fallecidos}>
                {(fallecimiento) => (
                    <TableRow key={fallecimiento.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(fallecimiento, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
