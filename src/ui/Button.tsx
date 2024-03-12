import { Button as ButtonNextUI } from '@nextui-org/button';

type ButtonProps = {
    content: string;
    color?:
        | 'primary'
        | 'default'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger';
};

export const Button = ({ content,color }: ButtonProps) => {
    return (
        <ButtonNextUI className="w-full" color={`${color ? color : 'primary'}`}>
            {content}
        </ButtonNextUI>
    );
};
