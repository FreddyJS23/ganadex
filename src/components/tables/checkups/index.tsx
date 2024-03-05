'use client';

import { headerAllCheckup } from '@/collections/headerColums';
import { ResponseRevisionesGeneral, Revisiones } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { useCallback } from 'react';
import { LayoutTable } from '..';

export const TableAllCheckups = ({ todas_revisiones }: ResponseRevisionesGeneral) => {
    const renderCell = useCallback(
        (revisiones: Revisiones, columnKey: keyof Revisiones): any => {
            const cellValue = revisiones[columnKey];

            return cellValue;
        },
        [],
    );

    return (
        <LayoutTable type="chkeups">
            <TableHeader columns={headerAllCheckup}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={todas_revisiones}>
                {(revisiones) => (
                    <TableRow key={revisiones.id}>
                        {(columnKey: any) => (
                            <TableCell>
                                {renderCell(revisiones, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
