import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useForm } from 'react-hook-form';
import { CreateDeathCastle } from '@/types/forms';
import { createDeathCastleShema } from '@/validations/deathCastle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { createDeathCattle } from '@/actions/fallecimientos';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getDateNow } from '@/utils/getDateNow';
import { formDeadCattle } from '@/collections/formsInputs';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';

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
       
            const deathCattle = await createDeathCattle(
                data,
                parseInt(params.id),
            );
           /* manejar error del backedn y mostar mensaje */
           if( typeof deathCattle == 'object' && 'error' in deathCattle) return toast.error(messageErrorApi(deathCattle)) 
            
            toast.success(
                `Se ha realizado el fallecimiento del ganado ${deathCattle} `,
            );
            router.back();
            router.refresh();
        
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
              

                    {formDeadCattle.map(
                    ({ id, label, required, type, endContent }) => (
                        <>
                            <div key={id}>
                                {type != 'select' && id != 'fecha' && (
                                    <Input
                                        id={id}
                                        label={label}
                                        type={type}
                                        endContent={endContent}
                                        register={register}
                                        size='lg'
                                        errors={errors}
                                        required={required}
                                    />
                                )}
                                {id == 'fecha' && (
                                    <Input
                                        id={id}
                                        label={label}
                                        type={type}
                                        endContent={endContent}
                                        register={register}
                                        size='lg'
                                        errors={errors}
                                        required={required}
                                        defaultValue={getDateNow()}
                                    />
                                )}
                            </div>
                        </>
                    ),
                )}

            </form>
        </LayoutModal>
    );
};
