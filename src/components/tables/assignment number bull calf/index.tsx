'use client';

import { headerAssignmentNumberBullCalf } from '@/collections/headerColums';
import {
    CriaPendienteNumeracion,
    ResponseCriasPendienteNumeracion,
} from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { useCallback, useState } from 'react';
import { LayoutTable } from '..';
import IconButton from '@/icons/icono-capar-numeracion.svg';
import Link from 'next/link';
import { ModalAssignmentNumberBullCalf } from '@/components/modals/assignment number bull calf';
import { useDisclosure } from '@nextui-org/react';

export const TableAssignmentNumberBullCalf = ({
    crias_pendiente_numeracion,
}: ResponseCriasPendienteNumeracion) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [dataModal, setDataModal] = useState<CriaPendienteNumeracion>();

    const openModal = (criaPendienteNumeracion: CriaPendienteNumeracion) => {
        setDataModal(criaPendienteNumeracion);
        onOpen();
    };

    const renderCell = useCallback(
        (
            criaPendienteNumeracion: CriaPendienteNumeracion,
            columnKey: keyof CriaPendienteNumeracion,
        ): any => {
            const cellValue = criaPendienteNumeracion[columnKey];

            switch (columnKey) {
                case 'nombre':
                    const nombre = cellValue as string;
                    return (
                        <Link href={`ganado/${criaPendienteNumeracion['id']}`}>
                            {nombre}
                        </Link>
                    );
                /* button icon */
                case 'id':
                    setDataModal(criaPendienteNumeracion);
                    return (
                        <IconButton
                            className={'size-6 cursor-pointer'}
                            onClick={() => openModal(criaPendienteNumeracion)}
                        />
                    );

                default:
                    return cellValue;
            }
        },
        [],
    );

    return (
        <>
            <LayoutTable type="assignment bull calf">
                <TableHeader columns={headerAssignmentNumberBullCalf}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={crias_pendiente_numeracion}>
                    {(cria) => (
                        <TableRow key={cria.id}>
                            {(columnKey: any) => (
                                <TableCell>
                                    {renderCell(cria, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>

            <ModalAssignmentNumberBullCalf
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                dataHeader={dataModal?.nombre}
                onClose={onClose}
            />
        </>
    );
};
