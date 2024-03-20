import { InputProps } from '@/types';
import { Select as SelectNextUI, SelectItem } from '@nextui-org/select';

type SelectProps = Pick<
    InputProps,
    'id' | 'description' | 'label' | 'required' | 'endContent'
> & {
    items: { value: string | number; label: string }[];
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
}: SelectProps) => {
    const endContents = {
        dolar: <EndElement content="$" />,
        weight: <EndElement content="KG" />,
        'weight-milk': <EndElement content="KG" />,
    };

    return (
        <SelectNextUI
            id={id}
            label={label}
            items={items}
            variant="underlined"
            color="primary"
            description={description}
            isRequired={required}
            classNames={{
                label: 'text-current font-bold',
                value: 'text-current',
                popoverContent: 'bg-base-100',
            }}
            endContent={endContent && endContents[endContent]}
        >
            {({ label, value }) => <SelectItem key={value}>{label}</SelectItem>}
        </SelectNextUI>
    );
};
