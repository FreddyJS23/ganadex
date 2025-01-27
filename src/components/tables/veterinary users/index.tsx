'use client';

import { headersColumnsUserVeterinary } from '@/collections/headerColums';
import { ResponseVeterinariosUsuario, UserVeterinaryInfo } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Table,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback } from 'react';
import { LayoutTable } from '..';

const data: UserVeterinaryInfo[] = [
    {
        id: 1,
        usuario: 'pedro',
        email: 'pedro@gmail.com',
        rol: 'veterinario',
    },
];

export const TableVeterinaryUsers = ({
    usuarios_veterinarios = data,
}: ResponseVeterinariosUsuario) => {
    const renderCell = useCallback(
        (usuario_veterinario: UserVeterinaryInfo, columnKey: Key) => {
            const cellValue =
                usuario_veterinario[columnKey as keyof UserVeterinaryInfo];
            return cellValue as ReactNode;
        },
        [],
    );

    return (
        <Table
            removeWrapper
            aria-label={`TableuserVeterinary`}
            classNames={{
                wrapper: 'bg-base-100',
                th: 'bg-base-200 font-bold text-current',
            }}
        >
            <TableHeader columns={headersColumnsUserVeterinary}>
                {({ key, label }) => (
                    <TableColumn key={key}>{label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={usuarios_veterinarios}>
                {(usuario_veterinario) => (
                    <TableRow key={usuario_veterinario.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(usuario_veterinario, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
