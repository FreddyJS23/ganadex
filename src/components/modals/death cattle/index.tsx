import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useForm } from 'react-hook-form';
import { CreateDeathCastle } from '@/types/forms';
import { createDeathCastleShema } from '@/validations/deathCastle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { createDeathCattle } from '@/actions/createSaleDeath';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getDateNow } from '@/utils/getDateNow';

export const ModalDeathCattle = ({
    isOpen,
    onOpen,
    onOpenChange,
    dataHeader,
}: ModalProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateDeathCastle>({
        resolver: zodResolver(createDeathCastleShema),
    });

    const router = useRouter();
    const formRef = useRef(null);
    const params = useParams<{ id: string }>();

    const actionCreateDeathCattle: () => void = handleSubmit(async (data) => {
        try {
            const deathCattle = await createDeathCattle(
                data,
                parseInt(params.id),
            );
            toast.success(
                `Se ha realizado el fallecimiento del ganado ${deathCattle} `,
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
            icon="dead"
            titleModal={'Nuevo fallecimiento'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={dataHeader}
            refForm={formRef}
        >
            <form
                ref={formRef}
                action={actionCreateDeathCattle}
                className="m-auto flex flex-col gap-4 w-2/4 "
                id={'form-createDeathCattle'}
            >
                <Input
                    id="causa"
                    label="Causa"
                    required
                    type="text"
                    size="lg"
                    errors={errors}
                    register={register}
                />
                <Input
                    id="fecha"
                    label="Fecha"
                    required
                    type="date"
                    size="lg"
                    defaultValue={getDateNow()}
                    errors={errors}
                    register={register}
                />
            </form>
        </LayoutModal>
    );
};
