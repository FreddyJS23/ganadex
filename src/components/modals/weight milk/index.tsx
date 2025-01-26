'use client';

import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useDisclosure } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { CreateWeightMilk } from '@/types/forms';
import { createWeightMilkShema } from '@/validations/WeightMilkShema';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { createWeightMilk } from '@/actions/weightMilk';

export const ModalWeightMilk = ({
    dataHeader,
}: Pick<ModalProps, 'dataHeader'>) => {
    const { onOpen, onOpenChange } = useDisclosure();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateWeightMilk>({
        resolver: zodResolver(createWeightMilkShema),
    });

    const router = useRouter();
    const formRef = useRef(null);
    const params = useParams<{ id: string }>();

    const actionCreateWeightMilk: () => void = handleSubmit(async (data) => {
        try {
            const weightMilk = await createWeightMilk(
                data,
                parseInt(params.id),
            );
            toast.success(
                `Pesaje de ${weightMilk}KG de la vaca ${dataHeader} ha sido registrado`,
            );
            router.back();
            router.refresh();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    });

    return (
        <LayoutModal
            icon="weight"
            titleModal={'Pesaje de leche este mes vaca '}
            dataHeader={dataHeader}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                action={actionCreateWeightMilk}
                id="form-weightMilkCattle"
                ref={formRef}
                className="m-auto w-2/4 "
            >
                <Input
                    id="peso_leche"
                    label="Pesaje"
                    required
                    type="number"
                    endContent="weight-milk"
                    size="lg"
                    register={register}
                    errors={errors}
                />
            </form>
        </LayoutModal>
    );
};
