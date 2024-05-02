import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { Comprador, ModalProps } from '@/types';
import { Select } from '@/components/select';
import { Controller, useForm } from 'react-hook-form';
import { createSaleCattleShema } from '@/validations/saleCattle';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSaleCattle } from '@/types/forms';

export const ModalSaleCattle = ({
    isOpen,
    onOpen,
    onOpenChange,
    selectCompradores,
}: ModalProps & { selectCompradores: Comprador[] }) => {
    const itemsSelect: { value: string | number; label: string }[] = [];

    selectCompradores.map(({ id, nombre }) =>
        itemsSelect.push({ value: id, label: nombre }),
    );
   const {
       register,
       formState: { errors },
       handleSubmit,
       control
   } = useForm<CreateSaleCattle>({
       resolver: zodResolver(createSaleCattleShema),
   });

   const router = useRouter();
   const formRef = useRef(null);


    return (
        <LayoutModal
            icon="cattleV2"
            titleModal={'Venta de ganado'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form
                action=""
                method="post"
                className="m-auto flex flex-col gap-4 w-2/4 "
            >
                <Input
                    id="price"
                    label="Precio"
                    required
                    type="number"
                    endContent="dolar"
                    size="lg"
                    errors={errors}
                    register={register}
                />
                <Controller
                    name="comprador_id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            id="comprador_id"
                            label="Compradores"
                            required
                            description="Compradores disponibles, creados previamente"
                            items={itemsSelect}
                            errors={errors}
                            field={field}
                        />
                    )}
                />
            </form>
        </LayoutModal>
    );
};
