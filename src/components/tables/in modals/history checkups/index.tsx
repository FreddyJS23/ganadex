import { headerCheckups } from '@/collections/headerColums';
import { ResponseRevisiones, Revision } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';
import { useDisclosure } from '@nextui-org/react';
import { ModalCheckUp } from '@/components/modals/checkup';
import { useState } from 'react';

export const TableHistoryCheckUps = ({ revisioness }: ResponseRevisiones) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [dataModal, setDataModal] = useState<Revision>();

    const openModal = (revision: Revision) => {
        setDataModal(revision);
        onOpen();
    };
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
                                <td>{revision.fecha.toISOString()} </td>
                                <td>{revision.diagnostico} </td>
                                <td>
                                    <IconSearch
                                        onClick={() => openModal(revision)}
                                        className={'size-8 cursor-pointer '}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {dataModal && (
                <ModalCheckUp
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    revision={dataModal}
                />
            )}
        </>
    );
};
