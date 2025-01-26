import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useForm } from 'react-hook-form';
import { CreateCustomer } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCustomerShema } from '@/validations/Customer';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import { createCustomer } from '@/actions/comprador';

export const ModalCreateCustomer = ({
    isOpen,

    onOpen,
    onOpenChange,
}: ModalProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateCustomer>({
        resolver: zodResolver(createCustomerShema),
    });

    const router = useRouter();
    const formRef = useRef(null);

    const actionCreateCustomer: () => void = handleSubmit(async (data) => {
        try {
            const priceMilk = await createCustomer(data);
            toast.success(
                `${priceMilk} ha sido registrado como nuevo comprador`,
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
            titleModal={'Crear nuevo comprador'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                ref={formRef}
                action={actionCreateCustomer}
                id={'form-createCustomer'}
                className="m-auto w-2/4 "
            >
                <Input
                    id="nombre"
                    label="Comprador"
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
