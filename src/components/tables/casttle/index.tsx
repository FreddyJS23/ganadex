'use client';

import { headerCasttle } from '@/collections/headerColums';
import { CabezasGanado, EstadosGanado, Pesos, ResponseGanados } from '@/types';
import { getAge } from '@/utils/getAge';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback, useState } from 'react';
import { LayoutTable } from '..';
import { DropdownStatesCattle } from '@/components/dropdown states cattle';
import { DropDownOptions } from '@/components/dropdown options';
import { RedirectInTable } from '@/components/redirectsInTables';
import IconCheck from '@/icons/icono-check.svg';
import { ButtonFilterStateCattle } from '@/components/filter state cattle';

export const TableCasttle = ({ cabezas_ganado }: ResponseGanados) => {
    
    const [cattles, setCattles] = useState<CabezasGanado[]>(cabezas_ganado);
 
    const [filterActive, setFilterActive] = useState<'all'|'death'|'sales'>('all');

    const cattlesDeath=()=>{
       const cattlesDeath=cabezas_ganado.filter(({estados})=>{
        return estados.some(({estado})=> estado == 'fallecido');
       })
       setCattles(cattlesDeath);
       setFilterActive('death');
    }
        
    const cattlesSales=()=>{
       const cattlesSales=cabezas_ganado.filter(({estados})=>{
        return estados.some(({estado})=> estado == 'vendido');
       })
        setCattles(cattlesSales);
        setFilterActive('sales');
    }
    
        const allCattles=()=>{
        setCattles(cabezas_ganado);
        setFilterActive('all');
    }
    
    const renderCell = useCallback(
        (cabeza_ganado: CabezasGanado, columnKey: Key) => {
            const cellValue = cabeza_ganado[columnKey as keyof CabezasGanado];

            switch (columnKey as keyof CabezasGanado) {
                case 'numero': {
                    const numero = cellValue as number;
                    return (
                        <RedirectInTable id={cabeza_ganado['id'] } label={numero} redirect='ganado' />
                    );
                }
                case 'pesos': {
                    const pesos = cellValue as Pesos;
                    
                    return (
                      <div>{pesos ?  pesos.peso_actual ? pesos.peso_actual : 'desconocido' : 'desconocido'}</div>
                    );
                }

                case 'estados': {
                    const estados = cellValue as EstadosGanado[];

                    return <DropdownStatesCattle estados={estados} />;
                }

                case 'fecha_nacimiento': {
                    const fecha_nacimiento = cellValue as string;
                    return <div>{getAge(fecha_nacimiento)}</div>;
                }
               
                case 'id': {
                    const id = cellValue as number;
                    const estados = cabeza_ganado['estados'] as EstadosGanado[];
                    
                   return !estados.some(({estado})=> estado == 'fallecido' || estado == 'vendido' ) ?  <DropDownOptions idCattle={id} optionType='cattle'/> : <IconCheck className={'size-8'} />; 
                }

                default:
                    return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <>
            <ButtonFilterStateCattle filterActive={filterActive} cattlesDeath={cattlesDeath} cattlesSales={cattlesSales} allCattles={allCattles} />
            <LayoutTable type="casttle">
                <TableHeader columns={headerCasttle}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={cattles}>
                    {(cabeza_ganado) => (
                        <TableRow key={cabeza_ganado.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(cabeza_ganado, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>
        </>
    );
};
