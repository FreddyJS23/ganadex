import { headerBirths } from '@/collections/headerColums';
import { Parto, ResponsePartos } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';
import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { ModalBirth } from '@/components/modals/birth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const TableHistoryBirths = ({ partos }: ResponsePartos) => {
    const pathname = usePathname();

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerBirths.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {partos.map((parto) => (
                        <tr key={parto.id}>
                            <td>
                                {typeof parto.fecha == 'string'
                                    ? parto.fecha
                                    : ''}{' '}
                            </td>
                            <td>{parto.observacion} </td>
                            <td>
                                <Link href={`${pathname}/${parto.id}`}>
                                    <IconSearch
                                        className={'size-8 cursor-pointer '}
                                    />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
