'use client';

import { headerAllBirths } from '@/collections/headerColums';
import { Cria, Partos, ResponsePartosGeneral, Toro } from '@/types';
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

export const TableAllBirths = ({ todos_partos }: ResponsePartosGeneral) => {
    const renderCell = useCallback((partos: Partos, columnKey: Key) => {
        const cellValue = partos[columnKey as keyof Partos];
        switch (columnKey as keyof Partos) {
            case 'cria': {
                const cria = cellValue as Cria;

                return <Link href={``}>{cria.numero}</Link>;
                break;
            }
            case 'toro': {
                const toro = cellValue as Toro;

                return <Link href={``}>{toro.numero}</Link>;
                break;
            }

            default:
                break;
        }

        return cellValue as ReactNode;
    }, []);

    return (
        <LayoutTable type="births">
            <TableHeader columns={headerAllBirths}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={todos_partos}>
                {(partos) => (
                    <TableRow key={partos.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(partos, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
