'use client';

import { headerBeef } from '@/collections/headerColums';
import { EstadosGanado, Pesos, Res, ResponseReses } from '@/types';
import {
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/table';
import { Key, ReactNode, useCallback, useState } from 'react';
import { LayoutTable } from '..';
import { RedirectInTable } from '@/components/redirectsInTables';
import { DropDownOptions } from '@/components/dropdown options';
import { DropdownStatesCattle } from '@/components/dropdown states cattle';
import IconCheck from '@/icons/icono-check.svg';
import { ButtonFilterStateCattle } from '@/components/filter state cattle';

export const TableBeef = ({ reses }: ResponseReses) => {
    
    const [beefs, setBeef] = useState<Res[]>(reses);

    const [filterActive, setFilterActive] = useState<'all' | 'death' | 'sales'>(
        'all',
    );

    const beefDeath = () => {
        const beefDeath = reses.filter(({ estados }) => {
            return estados.some(({ estado }) => estado == 'fallecido');
        });
        setBeef(beefDeath);
        setFilterActive('death');
    };

    const beefSales = () => {
        const beefSales = reses.filter(({ estados }) => {
            return estados.some(({ estado }) => estado == 'vendido');
        });
        setBeef(beefSales);
        setFilterActive('sales');
    };

    const allBeef = () => {
        setBeef(reses);
        setFilterActive('all');
    };

    
    const renderCell = useCallback((res: Res, columnKey: Key) => {
        const cellValue = res[columnKey as keyof Res];

        switch (columnKey as keyof Res) {
            case 'numero': {
                const numero = cellValue as number;
                return (
                    <RedirectInTable
                        id={res['id']}
                        label={numero ?? ''}
                        redirect="reses"
                    />
                );
            }
            case 'pesos': {
                const pesos = cellValue as Pesos;

                return (
                    <div>
                        {pesos
                            ? pesos.peso_actual
                                ? pesos.peso_actual
                                : 'desconocido'
                            : 'desconocido'}
                    </div>
                );
            }
            case 'estados': {
                const estados = cellValue as EstadosGanado[];

                return <DropdownStatesCattle estados={estados} />;
            }
            case 'id': {
                const id = res['ganado_id'];
                 const estados = res['estados'] as EstadosGanado[];
                return !estados.some(
                    ({ estado }) =>
                        estado == 'fallecido' || estado == 'vendido',
                ) ? (
                    <DropDownOptions idCattle={id} optionType="cattle" />
                ) : (
                    <IconCheck className={'size-8'} />
                );
            }

            default:
                return cellValue as ReactNode;
        }
    }, []);

    return (
        <>
            <ButtonFilterStateCattle
                filterActive={filterActive}
                cattlesDeath={beefDeath}
                cattlesSales={beefSales}
                allCattles={allBeef}
            />

            <LayoutTable type="beef">
                <TableHeader columns={headerBeef}>
                    {({ key, label }) => (
                        <TableColumn key={key}>{label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={beefs}>
                    {(res) => (
                        <TableRow key={res.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(res, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>
        </>
    );
};
