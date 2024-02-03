import { InputProps } from '@/types';
import { Textarea as TextareaNextUI } from '@nextui-org/input';

export const Textarea = ({
    id,
    label,
    description,
    required,
}: Pick<InputProps, 'id' | 'label' | 'required' | 'description'>) => {
    return (
        <TextareaNextUI
            id={id}
            color="primary"
            classNames={{
                label: 'text-current font-bold',
                input: 'text-current',
            }}
            variant="underlined"
            label={label}
            description={description}
            isRequired={required}
        />
    );
};
