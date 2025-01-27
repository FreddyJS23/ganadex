import { UserVeterinary, veterinario } from '@/types';
import { Button, Select, Selection, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import SaveIcon from '@/icons/icono-save.svg';
import { createUserVeterinary } from '@/actions/createUserVeterinary';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type SelectVeterinaryNotUserProps = {
    veterinarios: veterinario[];
};

export const SelectVeterinaryNotUser = ({
    veterinarios,
}: SelectVeterinaryNotUserProps) => {
    const [value, setValue] = useState<Selection>(new Set([]));
    const [isLoadiaing, setIsLoading] = useState(false);
    const router = useRouter();


    const registerUserVeterinary = async () => {
        const idVeterinario =parseInt( Array.from(value)[0] as string);
        
        if(!idVeterinario)return toast.error('Debe seleccionar un veterinario');
        
        try {
            setIsLoading(true);
            const res=await createUserVeterinary(idVeterinario);
            const {nombre,usuario}=res as UserVeterinary
            toast.success(`Se ha registrado el usuario ${usuario} para el veterinario ${nombre}`);
            setIsLoading(false);
            router.refresh();
        } catch (error) {
            setIsLoading(false);
            toast.error(error as string);
        }
    }
    return (
        <>
            <Select
                className="max-w-60"
                variant='underlined'
                color="primary"
                onSelectionChange={(keys) => {
                    setValue(keys);
                }}
                classNames={{
                    label: 'text-current font-bold',
                    value: 'text-current',
                    popoverContent: 'bg-base-100',
                }}
            >
                {veterinarios.map(({ id, nombre }) => (
                    <SelectItem key={id}>{nombre}</SelectItem>
                ))}
            </Select>
            <Button
                isIconOnly
                aria-label="Guardar"
                variant='flat'
                onClick={() => registerUserVeterinary()}
                isLoading={isLoadiaing}
            >
                <SaveIcon />
            </Button>
        </>
    );
};
