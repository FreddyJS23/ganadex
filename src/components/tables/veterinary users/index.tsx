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
import { Key, ReactNode, useCallback, useState } from 'react';
import { LayoutTable, TableComponent } from '..';
import { useDisclosure } from '@nextui-org/react';
import IconDelete from '@/icons/icono-error.svg';
import { ModalDeleteUserVeterinary } from '@/components/modals/delete user veterinary';

export const TableVeterinaryUsers = ({
    usuarios_veterinarios,
}: ResponseVeterinariosUsuario) => {
   
    /* Estado modal */
    const { isOpen, onOpen,onOpenChange,onClose } = useDisclosure();
    /* data modal */
    const [dataModal, setDataModal] = useState({id:0,usuario:''});
    
    const handleOpen=(id:number,usuario:string)=>{
        setDataModal({id,usuario});
        onOpen();
    }
   
    const renderCell = useCallback(
        (usuario_veterinario: UserVeterinaryInfo, columnKey: Key) => {
            const cellValue =
                usuario_veterinario[columnKey as keyof UserVeterinaryInfo];
                switch (columnKey as keyof UserVeterinaryInfo) {
                    /* button icon */
                    case 'id': {
                        const id = cellValue as number;
                        return (
                        <IconDelete 
                        onClick={()=>handleOpen(id,usuario_veterinario['usuario'])} 
                        className={'size-6 cursor-pointer'} />
                            
                        );
                    }
    
                    default:
                        return cellValue as ReactNode;
                }
        },
        [],
    );

    return (
        <>
        <TableComponent
        type="userVeterinarys"
        columnsCollection={headersColumnsUserVeterinary}
        items={usuarios_veterinarios}
        renderCell={renderCell}
    />
    <ModalDeleteUserVeterinary
    id={dataModal.id}
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    dataHeader={dataModal.usuario}
    onClose={onClose}
    
    />
        </>
    );
};
