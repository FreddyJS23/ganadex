'use client';

import { headerStaff } from '@/collections/headerColums';
import { Personal, ResponseTodoPersonal } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback, useEffect, useState } from 'react';
import { LayoutTable, TableComponent } from '..';
import IconAdd from '@/icons/icono-plus.svg';
import IconRemove from '@/icons/icono-cerrar-notificacion.svg';
import { toast } from 'sonner';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';
import { addInHacienda, removeInHacienda } from '@/actions/personal';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

type TableStaffProps={
    todo_personal:Personal[]
    nameHacienda:string
}

export const TableStaff = ({ todo_personal,nameHacienda }: TableStaffProps) => {
    
    //Utilizado para refrescar la tabla cuando se interactúa con datos de la tabla
    const [reloadData, setReloadData] = useState(0); 

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const actionAddPersonal = async (personal_id:number) => {
        setIsLoading(true)
        const response = await addInHacienda(personal_id);
        if(typeof response == 'object' && 'error' in response) return toast.error(messageErrorApi(response))
        else toast.success(response);
      router.refresh();
      setIsLoading(false)
        setReloadData(prev=> prev + 1)
    };

    const actionRemovePersonal = async (personal_id:number) => {
        setIsLoading(true)
        const response = await removeInHacienda(personal_id);
        if(typeof response == 'object' && 'error' in response) return toast.error(messageErrorApi(response))
        else toast.success(response);
    router.refresh();
    setIsLoading(false)
    setReloadData(prev=> prev + 1)
    };

    const haciendasNames=(haciendas:Personal['haciendas'])=>{
       const haciendasNames= haciendas.map(({ nombre }) => nombre)
       return haciendasNames.join(', ')
    }
    
    const renderCell = useCallback((personal: Personal, columnKey: Key) => {
        const cellValue = personal[columnKey as keyof Personal];
        
        switch (columnKey as keyof Personal) {
            case 'haciendas': {
                const haciendas = cellValue as Personal['haciendas'];
                return (
                    <span>
                     {haciendasNames(haciendas)}
                    </span>
                );
            }

            case 'id': {
                const id = cellValue as number;
                if(!nameHacienda) return <></>
                
                const sameHacienda=haciendasNames(personal['haciendas']).includes(nameHacienda)
                
                if(!sameHacienda && personal['cargo'] == 'veterinario') 
               { return (
                <Button
                isIconOnly
                title={`Añadir a ${nameHacienda}`}
                aria-label="Guardar"
                variant='flat'
                size='sm'
                onClick={() => actionAddPersonal(id)}
                isLoading={isLoading}
            >
             <IconAdd
                       
                        className="text-primary size-4"
                       
                    />
            </Button>
                   
                );}
                else if(sameHacienda && personal['cargo'] == 'veterinario') 
               { return (

                <Button
                isIconOnly
                aria-label="eliminar"
                variant='flat'
                size='sm'
                title={`Eliminar de ${nameHacienda}`}
                onClick={() => actionRemovePersonal(id)}
                isLoading={isLoading}
            >
                <IconRemove
                        
                        className="text-error size-6"
                       
                    />
            </Button>
                  
                );}

                return <></>;
            }

                default:
                return cellValue as ReactNode;
                }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableComponent
            type="staff"
            columnsCollection={headerStaff}
            items={todo_personal}
            renderCell={renderCell}
            reloadData={reloadData}

        />
    );
};
