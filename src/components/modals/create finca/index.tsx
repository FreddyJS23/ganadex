import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useForm } from 'react-hook-form';
import { CreateFinca } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFincaShema } from '@/validations/finca';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import { createFinca } from '@/actions/finca';

export const ModalCreateFinca = ({
    isOpen,

    onOpen,
    onOpenChange,
}: ModalProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateFinca>({
        resolver: zodResolver(createFincaShema),
    });

    const router = useRouter();
    const formRef = useRef(null);

    const actionCreateFinca: () => void = handleSubmit(async (data) => {
        try {
            const priceMilk = await createFinca(data);
            toast.success(
                `${priceMilk} creada exitosamente`,
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
            icon="customer"
            titleModal={'Crear finca'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                ref={formRef}
                action={actionCreateFinca}
                id={'form-createFinca'}
                className="m-auto w-2/4 "
            >
                <Input
                    id="finca"
                    label="Nueva finca"
                    required
                    type="text"
                    size="lg"
                    errors={errors}
                    register={register}
                />
            </form>
        </LayoutModal>
    );
};
