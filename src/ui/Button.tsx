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
    onClick: () => void;
};

export const Button = ({ content, color, onClick }: ButtonProps) => {
    return (
        <ButtonNextUI
            onClick={onClick}
            className="w-full"
            color={`${color ? color : 'primary'}`}
        >
            {content}
        </ButtonNextUI>
    );
};
