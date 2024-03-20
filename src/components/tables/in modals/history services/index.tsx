import { headerServices } from '@/collections/headerColums';
import { ResponseServicios, Servicio } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';
import { useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { ModalServe } from '@/components/modals/serve';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TableHistoryServices = ({ servicios }: ResponseServicios) => {
    const pathname = usePathname();

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerServices.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio) => (
                        <tr key={servicio.id}>
                            <td>
                                {typeof servicio.fecha == 'string'
                                    ? servicio.fecha
                                    : ''}{' '}
                            </td>
                            <td>{servicio.numero_toro} </td>
                            <td>
                                <Link href={`${pathname}/${servicio.id}`}>
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
