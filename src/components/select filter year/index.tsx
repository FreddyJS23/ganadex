'use client';

import { YearSalesCattle } from '@/types';
import { Select, Selection, SelectItem } from '@nextui-org/react';

import { useState } from 'react';

type SelectFilterBase = {
    label: string;
    onChange: (select: number) => void;
};

type SelectFilterNumber =SelectFilterBase &   {
    type:'years'
    items:string[]
}

type SelectFilterObjects=SelectFilterBase & {
    type:'yearsFromDB'
    items: YearSalesCattle[];

}

type SelectFilterYearProps=SelectFilterNumber | SelectFilterObjects

export const SelectFilterYear = (props:SelectFilterYearProps) => {
    
    const {label,onChange,type}=props
    
    const set=type == 'yearsFromDB' ? new Set([`${ props.items.length > 0 ? props.items[0].año : []}`]) : new Set([`${ props.items.length > 0 ? props.items[0] : []}`])

    const [value, setValue] = useState<Selection>(set);
    
   if(type == 'yearsFromDB'){ return (
        <Select
            label={label}
            items={props.items}
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
    )} else 
    return (
        <Select
            label={label}
            items={props.items}
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
           {props.items.map((año)=>
        <SelectItem key={año}>{`${año}`}</SelectItem>
        )}
        </Select>
        
    )
    
    
    ;
};
