'use client';

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/dropdown';
import IconOpcionesCard from '@/icons/icono-opcionesEnCard.svg';
import { optionsDropdownCardsDashboard } from '@/collections/optionsDropdownCardsDashboard';
import Link from 'next/link';

type DropDownOptionsCardsDashboardProps = {
    tipo: 'precio' | 'comprador';
};

export const DropDownOptionsCardsDashboard = ({
    tipo,
}: DropDownOptionsCardsDashboardProps) => {
    const tipoPlural =
        (tipo == 'precio' && 'precios') ||
        (tipo == 'comprador' && 'compradores');

    return (
        <Dropdown className="bg-base-100">
            <DropdownTrigger>
                <div className="w-5 h-9 min-h-0 btn btn-ghost btn-circle">
                    <IconOpcionesCard className={'size-5'} />
                </div>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Static Actions"
                items={optionsDropdownCardsDashboard}
            >
                {({ key, label }) => (
                    <DropdownItem key={key + tipo}>
                        <Link
                            className="block w-full"
                            href={`/${key.includes('create_') ? `${tipo}/registrar` : tipo}`}
                        >
                            {label}
                            {key.includes('create_') ? tipo : tipoPlural}
                        </Link>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};
