import { headerCheckups } from '@/collections/headerColums';
import { ResponseRevisiones, Revision } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';
import { useDisclosure } from '@nextui-org/react';
import { ModalCheckUp } from '@/components/modals/checkup';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TableHistoryCheckUps = ({ revisioness }: ResponseRevisiones) => {
    const pathname = usePathname();

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            {headerCheckups.map(({ label }) => (
                                <th key={label}>{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {revisioness.map((revision) => (
                            <tr key={revision.id}>
                                <td>
                                    {typeof revision.fecha == 'string'
                                        ? revision.fecha
                                        : ''}{' '}
                                </td>
                                <td>{revision.diagnostico} </td>
                                <td>
                                    <Link href={`${pathname}/${revision.id}`}>
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
        </>
    );
};
