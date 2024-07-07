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
    optionsDropdownCattle,
    optionsDropdownCheckup,
    optionsDropdownServe,
    optionsDropdownBirh,
    OptionsDropdown,
} from '@/collections/optionsDropdown';

type DropDownOptions = {
    idCattle: number;
    optionType: 'cattle' | 'checkup' | 'serve' | 'birth';
    disabledDiscardCattle?: boolean;
};

export const DropDownOptions = ({ idCattle, optionType, disabledDiscardCattle=false }: DropDownOptions) => {
    let optionsDropdown: OptionsDropdown[] = [];

    if (optionType == 'cattle') {
        
        optionsDropdown = optionsDropdownCattle
    disabledDiscardCattle ? optionsDropdown = optionsDropdownCattle.filter((option) => option.url != 'descartar_ganado') : optionsDropdown = optionsDropdownCattle
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
