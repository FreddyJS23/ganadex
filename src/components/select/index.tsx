import { InputProps } from '@/types';
import { Selection } from '@nextui-org/react';
import { Select as SelectNextUI, SelectItem } from '@nextui-org/select';
import { ChangeEvent, useState } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues} from 'react-hook-form';

type SelectProps = Pick<
    InputProps,
    'id' | 'description' | 'label' | 'endContent' | 'required' | 'errors'
> & {
    items: { value: string | number; label: string | number }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any;
    handleSelectionChange?: (select:string | number) => void;
};

const EndElement = ({ content }: { content: '$' | 'KG' }) => {
    return (
        <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small sm:text-base">
                {content}
            </span>
        </div>
    );
};

export const Select = ({
    id,
    label,
    description,
    required,
    items,
    endContent,
    errors,
    field,
    handleSelectionChange
}: SelectProps) => {
    const endContents = {
        dolar: <EndElement content="$" />,
        weight: <EndElement content="KG" />,
        'weight-milk': <EndElement content="KG" />,
    };

    const [value, setValue] = useState<Selection>(new Set([]));
    
    const onChange = (
        select:Selection,  
    ) => {
      const valueSelect = Array.from(select)[0];
    
       handleSelectionChange && handleSelectionChange(valueSelect as string | number);
    }
        
    return (
        
                <SelectNextUI
                {...field}    
                id={id}
                    label={label}
                    items={items}
                    variant="underlined"
                    color="primary"
                    selectedKeys={value}
                    isRequired={required}
                    description={description}
                    onSelectionChange={(keys)=>{setValue(keys);onChange(keys)}}
                    classNames={{
                        label: 'text-current font-bold',
                        value: 'text-current',
                        popoverContent: 'bg-base-100',
                    }}
                    endContent={endContent && endContents[endContent]}
                    isInvalid={errors[id] && true}
                    errorMessage={errors[id] && (errors[id]?.message as string)}
                >
                    {({ label, value }:{ value: string | number; label: string | number }) => (
                        <SelectItem key={value}>{label}</SelectItem>
                    )}
                </SelectNextUI>
            
        
    );
};
