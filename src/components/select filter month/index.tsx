'use client';

import { months } from '@/collections/months';
import { Select, Selection, SelectItem } from '@nextui-org/react';

import { useState } from 'react';

type SelectFilterMonthProps = {
    label: string;
    onChange: (select: number) => void;
};

export const SelectFilterMonth = ({
    label,
    onChange,
}: SelectFilterMonthProps) => {
    /*Al obtener un mes el conteo empieza desde 0, es decir al obtener enero daria 0 */
    const monthActual = new Date().getMonth() + 1;

    const [value, setValue] = useState<Selection>(new Set([monthActual.toString()]));

    return (
        <Select
            label={label}
            items={months}
            variant="bordered"
            size="sm"
            color="primary"
            selectedKeys={value}
            onSelectionChange={(keys) => {
                setValue(keys);
                onChange(Array.from(keys)[0] as number);
            }}
            classNames={{
                label: 'text-current font-bold',
                value: 'text-current',
                popoverContent: 'bg-base-100',
            }}
        >
            {({ month, key }: { key: number; month: string }) => (
                <SelectItem key={key}>{month}</SelectItem>
            )}
        </Select>
    );
};
