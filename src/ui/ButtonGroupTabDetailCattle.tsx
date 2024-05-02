import {
    ButtonGroup as ButtonGroupNextUI,
    Button as ButtonNextUI,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import { Button } from './Button';

import { useParams, usePathname, useRouter } from 'next/navigation';

type ButtonGroupTabDetailCattle = {
    route: 'parto' | 'pesajes_leche' | 'servicio' | 'revision';
};

export const ButtonGroupTabDetailCattle = ({
    route,
}: ButtonGroupTabDetailCattle) => {
    const labelsMap = {
        create: 'Nuevo',
        history: 'Ver historial',
    };
    const [selectedOption, setSelectedOption] = useState<
        Set<keyof typeof labelsMap>
    >(new Set<keyof typeof labelsMap>(['create']));

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<{ id: string }>();

    // Convert the Set to an Array and get the first value.
    const selectedOptionValue = Array.from(selectedOption)[0];

    const navigation = () => {
        if (selectedOptionValue == 'history')
            return router.push(`${pathname}/${route}`);
        else if (selectedOptionValue == 'create') {
            if (route == 'pesajes_leche')
                return router.push(`/${route}/${params.id}`);
            return router.push(`${pathname}/${route}/registrar`);
        }
    };

    return (
        <ButtonGroupNextUI>
            <Button
                content={`${labelsMap[selectedOptionValue]}`}
                onClick={navigation}
            />
            <Dropdown placement="bottom-end" className="bg-base-100">
                <DropdownTrigger>
                    <ButtonNextUI color='primary' variant="flat" isIconOnly>
                        <svg
                            fill="none"
                            height="14"
                            viewBox="0 0 24 24"
                            width="14"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                                fill="currentColor"
                            />
                        </svg>
                    </ButtonNextUI>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label={`options ${route} tabs details cattle`}
                    selectedKeys={selectedOption}
                    selectionMode="single"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSelectionChange={setSelectedOption as any}
                    className="max-w-[300px]"
                >
                    <DropdownItem key="create">
                        {labelsMap['create']}
                    </DropdownItem>
                    <DropdownItem key="history">
                        {labelsMap['history']}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroupNextUI>
    );
};
