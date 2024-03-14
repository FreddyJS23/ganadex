import { headerServices } from '@/collections/headerColums';
import { ResponseServicios, Servicio } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';
import { useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { ModalServe } from '@/components/modals/serve';

export const TableHistoryServices = ({ servicios }: ResponseServicios) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [dataModal, setDataModal] = useState<Servicio>();

    const openModal = (servicio: Servicio) => {
        setDataModal(servicio);
        onOpen();
    };
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
                            <td>{servicio.fecha.toISOString()} </td>
                            <td>{servicio.numero_toro} </td>
                            <td>
                                <IconSearch
                                    onClick={() => openModal(servicio)}
                                    className={'size-8 cursor-pointer '}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {dataModal && (
                <ModalServe
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    servicio={dataModal}
                />
            )}
        </div>
    );
};
