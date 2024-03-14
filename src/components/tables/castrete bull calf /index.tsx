'use client';

import {
    headerAssignmentNumberBullCalf,
    headerCastreteBullCalf,
} from '@/collections/headerColums';
import {
    CriaPendienteCapar,
    CriaPendienteNumeracion,
    ResponseCriasPendienteCapar,
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
import { useDisclosure } from '@nextui-org/react';
import { ModalCastrateBullCalf } from '@/components/modals/castrate bull calf';

export const TableCastreteBullCalf = ({
    crias_pendiente_capar,
}: ResponseCriasPendienteCapar) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [dataModal, setDataModal] = useState<CriaPendienteCapar>();

   

    const renderCell = useCallback(
        (
            criaPendienteCapar: CriaPendienteCapar,
            columnKey: keyof CriaPendienteCapar,
        ): any => {
            const openModal = (criaPendienteCapar: CriaPendienteCapar) => {
                setDataModal(criaPendienteCapar);
                onOpen();
            };
           
            const cellValue = criaPendienteCapar[columnKey];

            switch (columnKey) {
                case 'nombre':
                    const nombre = cellValue as string;
                    return (
                        <Link href={`ganado/${criaPendienteCapar['id']}`}>
                            {nombre}
                        </Link>
                    );
                /* button icon */
                case 'id':
                    setDataModal(criaPendienteCapar);
                    return (
                        <IconButton
                            className={'size-6 cursor-pointer'}
                            onClick={() => openModal(criaPendienteCapar)}
                        />
                    );

                default:
                    return cellValue;
            }
        },
        [setDataModal, onOpen],
    );

    return (
        <>
            <LayoutTable type="castrete bull calf">
                <TableHeader columns={headerCastreteBullCalf}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={crias_pendiente_capar}>
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
            <ModalCastrateBullCalf
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                dataHeader={dataModal?.nombre}
                onClose={onClose}
            />
        </>
    );
};
