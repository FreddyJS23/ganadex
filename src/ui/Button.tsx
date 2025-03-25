import { Button as ButtonNextUI } from '@nextui-org/button';
import { useFormStatus } from 'react-dom';

type ButtonProps = {
    content: string | JSX.Element;
    color?:
        | 'primary'
        | 'default'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger';
    onClick: () => void;
    type?: 'button' | 'submit' | 'reset';
    form?: string;
    title?:string
};

export const Button = ({
    content,
    color,
    onClick,
    type = 'button',
    form,
    title,
}: ButtonProps) => {
    const { pending } = useFormStatus();
    if (form) {
        return (
            <ButtonNextUI
                onClick={onClick}
                className="w-full"
                color={`${color ? color : 'primary'}`}
                type={type}
                isLoading={type == 'submit' && pending}
                form={form}
                title={title}
            >
                {content}
            </ButtonNextUI>
        );
    } else {
        return (
            <ButtonNextUI
                onClick={onClick}
                className="w-full"
                color={`${color ? color : 'primary'}`}
                type={type}
                isLoading={type == 'submit' && pending}
                title={title}
            >
                {content}
            </ButtonNextUI>
        );
    }
};
