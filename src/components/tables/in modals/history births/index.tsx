import { headerBirths } from '@/collections/headerColums';
import { Parto, ResponsePartos } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';
import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { ModalBirth } from '@/components/modals/birth';

export const TableHistoryBirths = ({ partos }: ResponsePartos) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [dataModal, setDataModal] = useState<Parto>();

    const openModal = (parto: Parto) => {
        setDataModal(parto);
        onOpen();
    };

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
                            <td>{parto.fecha.toISOString()} </td>
                            <td>{parto.observacion} </td>
                            <td>
                                <IconSearch
                                    onClick={() => openModal(parto)}
                                    className={'size-8 cursor-pointer'}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {dataModal && (
                <ModalBirth
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    parto={dataModal}
                />
            )}
        </div>
    );
};
