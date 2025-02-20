'use client';

import IconOpcionesCard from '@/icons/icono-opcionesEnCard.svg';
import Link from 'next/link';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';

export const DropdownCausaFallecimiento = () => {
    return (
        <Dropdown className="bg-base-100">
            <DropdownTrigger>
                <div className="w-5 h-9 min-h-0 btn btn-ghost btn-circle">
                    <IconOpcionesCard className={'size-5'} />
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem>
                    <Link className="block w-full" href={`fallecimientos/causa/crear`}>
                        Nueva causa
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className="block w-full" href={`fallecimientos/causa`}>
                        Ver causas
                    </Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
