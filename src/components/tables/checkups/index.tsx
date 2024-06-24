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
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';
import { RedirectInTable } from '@/components/redirectsInTables';
import { DropDownOptions } from '@/components/dropdown options';

export const TableAllCheckups = ({
    todas_revisiones,
}: ResponseRevisionesGeneral) => {
    const renderCell = useCallback((revisiones: Revisiones, columnKey: Key) => {
        const cellValue = revisiones[columnKey as keyof Revisiones];
        switch (columnKey as keyof Revisiones) {
            case 'numero': {
                const numero = cellValue as number;
                return (
                    <RedirectInTable
                        id={revisiones['id']}
                        label={numero ?? ''}
                        redirect="ganado"
                    />
                );
                break;
            }
            case 'id': {
                const id = cellValue as number;
                return <DropDownOptions idCattle={id} optionType="checkup" />;
            }

            default:
                break;
        }

        return cellValue as ReactNode;
    }, []);

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
                        {(columnKey) => (
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
