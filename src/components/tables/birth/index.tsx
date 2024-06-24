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
import { RedirectInTable } from '@/components/redirectsInTables';
import { DropDownOptions } from '@/components/dropdown options';

export const TableAllBirths = ({ todos_partos }: ResponsePartosGeneral) => {
    const renderCell = useCallback((partos: Partos, columnKey: Key) => {
        const cellValue = partos[columnKey as keyof Partos];
        switch (columnKey as keyof Partos) {
            case 'cria': {
                const cria = cellValue as Cria;

                return (
                    <RedirectInTable
                        id={cria.id}
                        label={cria.numero ?? ''}
                        redirect="ganado"
                    />
                );

                break;
            }
            case 'numero': {
                const numero = cellValue as number;
                return (
                    <RedirectInTable
                        id={partos['id']}
                        label={numero ?? ''}
                        redirect="ganado"
                    />
                );
                break;
            }
            case 'toro': {
                const toro = cellValue as Toro;

                return (
                    <RedirectInTable
                        id={toro.id}
                        label={toro.numero ?? ''}
                        redirect="toros"
                    />
                );
                break;
            }
            case 'id': {
                const id = cellValue as number;
                return <DropDownOptions idCattle={id} optionType="birth" />;
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
