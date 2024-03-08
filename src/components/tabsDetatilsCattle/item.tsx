import { Button } from '@/ui/Button';

type ContainerContentTabProps = {
    children: JSX.Element[];
};

export const ContainerContentTab = ({ children }: ContainerContentTabProps) => {
    return (
        <div className="grid grid-cols-2 bg-base-100 shadow-[0px_0px_6px_-3px] shadow-primary rounded-lg gap-4 p-4 sm:grid-cols-3 lg:flex w-full">
            {children}
            <div className="col-span-full place-self-center">
                <Button content="Ver historial" />
            </div>
        </div>
    );
};
