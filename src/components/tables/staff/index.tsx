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
import { LayoutTable, TableComponent } from '..';

export const TableStaff = ({ todo_personal }: ResponseTodoPersonal) => {
    const renderCell = useCallback((personal: Personal, columnKey: Key) => {
        const cellValue = personal[columnKey as keyof Personal];
        return cellValue as ReactNode;
    }, []);

    return (
        <TableComponent
            type="staff"
            columnsCollection={headerStaff}
            items={todo_personal}
            renderCell={renderCell}
        />
    );
};
