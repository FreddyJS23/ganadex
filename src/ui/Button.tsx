import { Button as ButtonNextUI } from '@nextui-org/button';
import { useFormStatus } from 'react-dom';

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
    form?:string
};

export const Button = ({ content, color, onClick,type='button',form }: ButtonProps) => {
    const { pending } = useFormStatus();
   if(form) {return (
        <ButtonNextUI
            onClick={onClick}
            className="w-full"
            color={`${color ? color : 'primary'}`}
            type={type}
            isLoading={type == 'submit' && pending}
             form={form} 
        >
            {content}
        </ButtonNextUI>
    );}
   else{ return (
        <ButtonNextUI
            onClick={onClick}
            className="w-full"
            color={`${color ? color : 'primary'}`}
            type={type}
            isLoading={type == 'submit' && pending}
        >
            {content}
        </ButtonNextUI>
    );}
};
