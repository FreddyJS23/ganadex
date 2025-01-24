'use client';

import { headerBeef } from '@/collections/headerColums';
import {
    EstadosGanado,
    Pesos,
    GanadoDescarte,
    ResponseGanadoDescartes,
    User,
} from '@/types';
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

export const TableDiscardedCattle = ({
    ganado_descartes,
    role,
}: ResponseGanadoDescartes & {role:User['rol']}) => {
    const [discardedCattles, setDiscardedCattles] =
        useState<GanadoDescarte[]>(ganado_descartes);

    const [filterActive, setFilterActive] = useState<'all' | 'death' | 'sales'>(
        'all',
    );

    const beefDeath = () => {
        const beefDeath = ganado_descartes.filter(({ estados }) => {
            return estados.some(({ estado }) => estado == 'fallecido');
        });
        setDiscardedCattles(beefDeath);
        setFilterActive('death');
    };

    const beefSales = () => {
        const beefSales = ganado_descartes.filter(({ estados }) => {
            return estados.some(({ estado }) => estado == 'vendido');
        });
        setDiscardedCattles(beefSales);
        setFilterActive('sales');
    };

    const allBeef = () => {
        setDiscardedCattles(discardedCattles);
        setFilterActive('all');
    };

    const renderCell = useCallback(
        (ganado_descarte: GanadoDescarte, columnKey: Key) => {
            const cellValue =
                ganado_descarte[columnKey as keyof GanadoDescarte];

            switch (columnKey as keyof GanadoDescarte) {
                case 'numero': {
                    const numero = cellValue as number;
                    return (
                        <RedirectInTable
                            id={ganado_descarte['id']}
                            label={numero ?? ''}
                            redirect="ganado_descarte"
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
                    const id = ganado_descarte['ganado_id'];
                    const estados = ganado_descarte[
                        'estados'
                    ] as EstadosGanado[];
                    return !estados.some(
                        ({ estado }) =>
                            estado == 'fallecido' || estado == 'vendido',
                    ) ? (
                        <DropDownOptions disabledDiscardCattle={true} idCattle={id} optionType="cattle" role={role} />
                    ) : (
                        <IconCheck className={'size-8'} />
                    );
                }

                default:
                    return cellValue as ReactNode;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

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
                <TableBody items={discardedCattles}>
                    {(ganado_descarte) => (
                        <TableRow key={ganado_descarte.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(ganado_descarte, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </LayoutTable>
        </>
    );
};
