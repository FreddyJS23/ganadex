'use client';

import { headerStaff } from '@/collections/headerColums';
import { Personal, ResponseTodoPersonal } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';

export const TableStaff = ({ todo_personal }: ResponseTodoPersonal) => {
    const renderCell = useCallback(
        (personal: Personal, columnKey: Key) => {
            const cellValue = personal[columnKey as keyof Personal];
          return cellValue as ReactNode;
        },
        [],
    );

    return (
        <LayoutTable type="staff">
            <TableHeader columns={headerStaff}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={todo_personal}>
                {(todo_personal) => (
                    <TableRow key={todo_personal.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(todo_personal, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </LayoutTable>
    );
};
