import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useForm } from 'react-hook-form';
import { CreateDeathCastle } from '@/types/forms';
import { createDeathCastleShema } from '@/validations/deathCastle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useRef } from 'react';

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
    
    return (
        <LayoutModal
            icon="dead"
            titleModal={'Nuevo fallecimiento'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={dataHeader}
        >
            <form
                action=""
                method="post"
                className="m-auto flex flex-col gap-4 w-2/4 "
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
            </form>
        </LayoutModal>
    );
};
