import { InputProps } from '@/types';
import { Input as InputNextUI } from '@nextui-org/input';

const EndElement = ({ content }: { content: '$' | 'KG' }) => {
    return (
        <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small sm:text-base">
                {content}
            </span>
        </div>
    );
};

export const Input = ({
    id,
    label,
    type,
    description,
    required,
    endContent,
    size,
}: InputProps) => {
    const endContents = {
        dolar: <EndElement content="$" />,
        weight: <EndElement content="KG" />,
        'weight-milk': <EndElement content="KG" />,
    };

    return (
        <InputNextUI
            id={id}
            color="primary"
            classNames={{
                label: 'text-current font-bold',
                input: 'text-current',
            }}
            variant="underlined"
            type={type}
            label={label}
            placeholder={type == 'date' ? ' ' : ''}
            description={description}
            isRequired={required}
            endContent={endContent && endContents[endContent]}
            size={size ? size : 'md'}
        />
    );
};
