'use client';

import { headerSaleMilk, headerSupplies } from '@/collections/headerColums';
import { Insumo, ResponseInsumos } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, useCallback } from 'react';
import { LayoutTable } from '..';

export const TableSupplies = ({ insumos }: ResponseInsumos) => {
    const renderCell = useCallback(
        (insumo: Insumo, columnKey:Key) => {
            const cellValue = insumo[columnKey as keyof Insumo];

           return (
               typeof cellValue == 'string' ||
               (typeof cellValue == 'number' && cellValue)
           );
        },
        [],
    );

    return (
        <LayoutTable type="supplies">
            <TableHeader columns={headerSupplies}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={insumos}>
                {(insumo) => (
                    <TableRow key={insumo.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(insumo, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
