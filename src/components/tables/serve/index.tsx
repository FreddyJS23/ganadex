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
import { RedirectInTable } from '@/components/redirectsInTables';
import { DropDownOptions } from '@/components/dropdown options';

export const TableAllServes = ({
    todos_servicios,
}: ResponseServiciosGeneral) => {
    const renderCell = useCallback(
        (servicios: Servicios, columnKey:Key) => {
            const cellValue = servicios[columnKey as keyof Servicios];
            switch (columnKey) {
                case 'numero': {
                    const numero = cellValue as number;
                    return (
                        <RedirectInTable
                            id={servicios['numero']}
                            label={numero ?? ''}
                            redirect="ganado"
                        />
                    );
                    break;
                }

                case 'toro': {
                    const toro = cellValue as ToroDeServicio;

                    return (
                        <RedirectInTable
                            id={toro.id}
                            label={toro.numero ?? ''}
                            redirect="ganado"
                        />
                    );
                    break;
                }
                case 'id': {
                    const id = cellValue as number;
                    return (
                        <DropDownOptions idCattle={id} optionType="serve" />
                    );
                }

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
