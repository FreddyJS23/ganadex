'use client';

import { YearSalesCattle } from '@/types';
import { Select, Selection, SelectItem } from '@nextui-org/react';

import { useState } from 'react';

type SelectFilterYearProps = {
    label: string;
    items: YearSalesCattle[];
    onChange: (select: number) => void;
};

export const SelectFilterYear = ({
    label,
    items,
    onChange,
}: SelectFilterYearProps) => {
    const [value, setValue] = useState<Selection>(
        new Set([items[0].año.toString()]),
    );

    return (
        <Select
            label={label}
            items={items}
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
            {({ año }: { año: number }) => (
                <SelectItem key={año}>{`${año}`}</SelectItem>
            )}
        </Select>
    );
};
