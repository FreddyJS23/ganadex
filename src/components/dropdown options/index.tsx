'use client';

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/dropdown';
import IconOpcionesCard from '@/icons/icono-opcionesEnCard.svg';
import Link from 'next/link';
import {
    optionsDropdownCheckup,
    optionsDropdownServe,
    optionsDropdownBirh,
    OptionsDropdown,
    optionsDropdownCattleAdmin,
    optionsDropdownCattleVeterinary,
} from '@/collections/optionsDropdown';
import { User } from '@/types';

type DropDownOptions = {
    idCattle: number;
    optionType: 'cattle' | 'checkup' | 'serve' | 'birth';
    disabledDiscardCattle?: boolean;
    role?:User['rol'];
};

export const DropDownOptions = ({ idCattle, optionType, disabledDiscardCattle=false,role='admin' }: DropDownOptions) => {
    let optionsDropdown: OptionsDropdown[] = [];
    if (optionType == 'cattle') {
        
        optionsDropdown =role=='admin' ? optionsDropdownCattleAdmin : optionsDropdownCattleVeterinary
        if(disabledDiscardCattle) optionsDropdown = optionsDropdown.filter((option) => option.url != 'descartar_ganado')
    }
    else if (optionType == 'checkup') optionsDropdown = optionsDropdownCheckup;
    else if (optionType == 'serve') optionsDropdown = optionsDropdownServe;
    else if (optionType == 'birth') optionsDropdown = optionsDropdownBirh;

    return (
        <Dropdown className="bg-base-100">
            <DropdownTrigger>
                <div className="w-5 h-9 min-h-0 btn btn-ghost btn-circle">
                    <IconOpcionesCard className={'size-5'} />
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" items={optionsDropdown}>
                {({ url, label }) => (
                    <DropdownItem key={url + label}>
                        {url == 'fallecimientos/registrar' ||
                        url == 'descartar_ganado' ||
                        url == 'venta_ganado' ? (
                            <Link
                                className="block w-full"
                                href={`/${url}/${idCattle}`}
                            >
                                {label}
                            </Link>
                        ) : (
                            <Link
                                className="block w-full"
                                href={`/ganado/${idCattle}/${url}/${label == 'Nuevo' ? 'registrar' : ''}`}
                            >
                                {label}
                            </Link>
                        )}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};
