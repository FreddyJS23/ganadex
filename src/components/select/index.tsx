import { InputProps } from '@/types';
import {
    Select as SelectNextUI,
    SelectItem,
} from '@nextui-org/select';

type SelectProps = Pick<
    InputProps,
    'id' | 'description' | 'label' | 'required'
> & {
    items: { value: string | number; label: string }[];
};

export const Select = ({
    id,
    label,
    description,
    required,
    items,
}: SelectProps) => {
    return (
        <SelectNextUI
            id={id}
            label={label}
            placeholder='d'
            items={items}
            variant="underlined"
            color="primary"
            description={description}
            isRequired={required}
            classNames={{
                label: 'text-current font-bold',
                value: 'text-current',
                popoverContent:'bg-base-100'
            }}
        >
            {({ label, value }) => <SelectItem key={value}>{label}</SelectItem>}
        </SelectNextUI>
    );
};
