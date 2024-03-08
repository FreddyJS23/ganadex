import { Button as ButtonNextUI } from '@nextui-org/button';

type ButtonProps = {
    content: string;
};

export const Button = ({ content }: ButtonProps) => {
    return (
        <ButtonNextUI className="w-full" color="primary">
            {content}
        </ButtonNextUI>
    );
};
