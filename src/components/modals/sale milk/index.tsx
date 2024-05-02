import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps, PreciosDeLeche } from '@/types';
import { Select } from '@/components/select';
import { CreateSaleMilk } from '@/types/forms';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSaleMilkShema } from '@/validations/saleMilkShema';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createSaleMilk } from '@/actions/createSaleMilk';
import { toast } from 'sonner';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';

export const ModalSaleMilk = ({
    isOpen,
    onOpen,
    onOpenChange,
    selectPrecios,
}: ModalProps & { selectPrecios: PreciosDeLeche[] }) => {
   


const {
    register,
    formState: { errors },
    control,
    handleSubmit,
} = useForm<CreateSaleMilk>({
    resolver: zodResolver(createSaleMilkShema),
});

const router = useRouter();
const formRef = useRef(null);

const actionCreateSaleMilk: () => void = handleSubmit(async (data) => {
    try {
       const saleMilk=await createSaleMilk(data);
        toast.success(`Se ha realizado la venta de ${saleMilk} de leche`);
         router.back();
        router.refresh(); 
    } catch (error) {
        const message = error as string;
        return toast.error(message);
    }
});

    return (
        <LayoutModal
            icon="milk"
            titleModal={'Venta de leche'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                id='form-createSaleMilk'
                ref={formRef}
                action={actionCreateSaleMilk}
                method="post"
                className="m-auto flex flex-col gap-4 w-2/4 "
            >
                <Input
                    id="cantidad"
                    label="Kilogramos"
                    required
                    type="number"
                    endContent="weight-milk"
                    size="lg"
                    register={register}
                    errors={errors}
                />
                <Controller
                    name="precio_id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            id="precio_id"
                            label="Precio"
                            required
                            description="Precios disponibles por kg, creados previamente"
                            items={converToSelectOptions(selectPrecios)}
                            endContent="dolar"
                            errors={errors}
                            field={field}
                        />
                    )}
                />
            </form>
        </LayoutModal>
    );
};
