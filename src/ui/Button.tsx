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
    type?:"button" | "submit" | "reset" 
};

export const Button = ({ content, color, onClick,type='button' }: ButtonProps) => {
    return (
        <ButtonNextUI
            onClick={onClick}
            className="w-full"
            color={`${color ? color : 'primary'}`}
            type={type}
        >
            {content}
        </ButtonNextUI>
    );
};
