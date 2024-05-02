import { InputProps } from '@/types';
import { Textarea as TextareaNextUI } from '@nextui-org/input';

export const Textarea = ({
    id,
    label,
    description,
    required,
    errors,
    register
}: Pick<InputProps, 'id' | 'label' | 'required' | 'description' | 'errors' | 'register'>) => {
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
              {...register(id,{})}
            isInvalid={errors[id] && true}
            errorMessage={errors[id] && errors[id]?.message as string}
        />
    );
};
