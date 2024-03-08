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
import { useCallback } from 'react';
import { LayoutTable } from '..';

export const TableSupplies = ({ insumos }: ResponseInsumos) => {
    const renderCell = useCallback(
        (insumo: Insumo, columnKey: keyof Insumo): any => {
            const cellValue = insumo[columnKey];

            return cellValue;
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
                        {(columnKey: any) => (
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
