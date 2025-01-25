'use client';

import { InputProps, Toro } from '@/types';
import {
    Select,
    Selection,
    SelectItem,
    SelectSection,
} from '@nextui-org/react';

import { useState } from 'react';

type SelectBullsProps = {
    id: string;
    label: string;
    items: Toro[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any;
    errors: InputProps['errors'];
    required: boolean;
};

export const SelectBulls = ({
    id,
    label,
    items,
    field,
    errors,
    required,
}: SelectBullsProps) => {
    const converToSelectOptions = items.map(({ id, numero, efectividad }) => ({
        id: id,
        numero: numero,
        efectividad: efectividad,
    }));

    const [value, setValue] = useState<Selection>(new Set([]));

    return (
        <Select
            {...field}
            id={id}
            label={label}
            items={converToSelectOptions}
            variant="underlined"
            size="sm"
            isInvalid={errors[id] && true}
            errorMessage={errors[id] && (errors[id]?.message as string)}
            color="primary"
            required={required}
            selectedKeys={value}
            onSelectionChange={(keys) => {
                setValue(keys);
            }}
            classNames={{
                label: 'text-current font-bold',
                value: 'text-current',
                popoverContent: 'bg-base-100',
            }}
        >
            <SelectSection title={'Nº <---------------> Efect'}>
                {converToSelectOptions.map(({ id, numero, efectividad }) => {
                 return  <SelectItem key={id} textValue={numero ? numero.toString() : id.toString()}>
                        <div className="flex justify-between">
                            <span>{numero}</span>
                            <span className="text-xs text-gray-500">
                                {efectividad ? `${efectividad}%` : 'null'}
                            </span>
                        </div>
                    </SelectItem>;
                })}
            </SelectSection>
        </Select>
    );
};
