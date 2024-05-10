'use client';

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/dropdown';
import IconOpcionesCard from '@/icons/icono-opcionesEnCard.svg';
import Link from 'next/link';
import { optionsDropdownCattle } from '@/collections/optionsDropdownCattle';

type DropDownOptionsCattle = {
    idCattle: number;
};

export const DropDownOptionsCattle = ({ idCattle }: DropDownOptionsCattle) => {
    return (
        <Dropdown className="bg-base-100">
            <DropdownTrigger>
                <div className="w-5 h-9 min-h-0 btn btn-ghost btn-circle">
                    <IconOpcionesCard className={'size-5'} />
                </div>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Static Actions"
                items={optionsDropdownCattle}
            >
                {({ url, label }) => (
                    <DropdownItem key={url + label}>
                        <Link
                            className="block w-full"
                            href={`/${url}/${idCattle}/registrar`}
                        >
                            {label}
                        </Link>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};
