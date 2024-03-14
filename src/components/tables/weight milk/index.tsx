'use client';

import { headerAllWeightMilk } from '@/collections/headerColums';
import { PesajesLeche, ResponsePesajesLecheGeneral } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { useCallback, useState } from 'react';
import { LayoutTable } from '..';
import IconButton from '@/icons/icono-peso.svg';
import Link from 'next/link';
import IconCheck from '@/icons/icono-check.svg';
import IconError from '@/icons/icono-error.svg';
import { Button, useDisclosure } from '@nextui-org/react';
import { ModalWeightMilk } from '@/components/modals/weight milk';

export const TableAllWeightMilk = ({
    todos_pesaje_leche,
}: ResponsePesajesLecheGeneral) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [dataModal, setDataModal] = useState<PesajesLeche>();

    

    const renderCell = useCallback(
        (pesajeLeche: PesajesLeche, columnKey: keyof PesajesLeche): any => {
            const openModal = (pesajeLeche: PesajesLeche) => {
                setDataModal(pesajeLeche);
                onOpen();
            };

            const cellValue = pesajeLeche[columnKey];

            switch (columnKey) {
                /* button icon */
                case 'id':
                    setDataModal(pesajeLeche);
                    return (
                        <>
                            <IconButton
                                onClick={() => openModal(pesajeLeche)}
                                className={'size-6 cursor-pointer'}
                            />
                        </>
                    );

                case 'pesaje_este_mes':
                    const pesadaEsteMes = pesajeLeche['pesaje_este_mes'];
                    return pesadaEsteMes ? (
                        <IconCheck className={'size-8'} />
                    ) : (
                        <IconError className={'size-8'} />
                    );

                default:
                    return cellValue;
            }
        },
        [setDataModal, onOpen],
    );

    return (
        <>
            <LayoutTable type="all weight milk">
                <TableHeader columns={headerAllWeightMilk}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={todos_pesaje_leche}>
                    {(pesajeLeche) => (
                        <TableRow key={pesajeLeche.id}>
                            {(columnKey: any) => (
                                <TableCell>
                                    {renderCell(pesajeLeche, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>
            <ModalWeightMilk
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                dataHeader={dataModal?.numero}
                onClose={onClose}
            />
        </>
    );
};
