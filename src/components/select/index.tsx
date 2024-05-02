import { InputProps } from '@/types';
import { Select as SelectNextUI, SelectItem } from '@nextui-org/select';
import { ControllerRenderProps} from 'react-hook-form';

type SelectProps = Pick<
    InputProps,
    'id' | 'description' | 'label' | 'endContent' | 'required' | 'errors'
> & {
    items: { value: string | number; label: string }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field:ControllerRenderProps<any>;
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
    field
}: SelectProps) => {
    const endContents = {
        dolar: <EndElement content="$" />,
        weight: <EndElement content="KG" />,
        'weight-milk': <EndElement content="KG" />,
    };

    return (
        
                <SelectNextUI
                {...field}    
                id={id}
                    label={label}
                    items={items}
                    variant="underlined"
                    color="primary"
                    isRequired={required}
                    description={description}
                    classNames={{
                        label: 'text-current font-bold',
                        value: 'text-current',
                        popoverContent: 'bg-base-100',
                    }}
                    endContent={endContent && endContents[endContent]}
                    isInvalid={errors[id] && true}
                    errorMessage={errors[id] && (errors[id].message as string)}
                >
                    {({ label, value }) => (
                        <SelectItem key={value}>{label}</SelectItem>
                    )}
                </SelectNextUI>
            
        
    );
};
