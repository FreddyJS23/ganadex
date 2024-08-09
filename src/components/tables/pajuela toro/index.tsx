'use client';

import { headerPajuelaToro } from '@/collections/headerColums';
import {  PajuelaToro, ResponsePajuelaToros, } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';


export const TablePajuelaToro = ({ pajuela_toros }: ResponsePajuelaToros) => {

    const renderCell = useCallback((toro: PajuelaToro, columnKey: Key) => {
        const cellValue = toro[columnKey as keyof PajuelaToro];

        switch (columnKey as keyof PajuelaToro) {
            default:
                return cellValue as ReactNode;
        }
    }, []);

    return (
        <>
            <LayoutTable type="pajuela_toro">
                <TableHeader columns={headerPajuelaToro}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={pajuela_toros}>
                    {(pajuela_toro) => (
                        <TableRow key={pajuela_toro.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(pajuela_toro, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>
        </>
    );
};
