import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useForm } from 'react-hook-form';
import { CreateHacienda } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { createHaciendaShema } from '@/validations/hacienda';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { createHacienda } from '@/actions/hacienda';
import { getSession, useSession } from 'next-auth/react';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';

type ModalCreateHaciendaProps = ModalProps & {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (open: boolean) => void;
    /**verificar si es la primera hacienda para redireccionar de una vez y no mostrarle el modal de seleccion de hacienda,
     ya que es inncesario crear una hacienda y despues solo mostrale un select con una sola hacienda
     */
    primeraHacienda: boolean;
};


export const ModalCreateHacienda = ({
    isOpen,
    onOpen,
    onOpenChange,
    primeraHacienda=false,
}: ModalCreateHaciendaProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateHacienda>({
        resolver: zodResolver(createHaciendaShema),
    });

    const router = useRouter();
    const formRef = useRef(null);
    const { update, data: session } = useSession();

    useEffect(() => {
        /* Llamar a la sesion para que el status el hook useSession se actualice y pase a authenticated,
        si no se hace esto el state queda en unauthenticated y no se actualiza, no permitiendo que se llame
        la funcion update para actualizar la sesion */
        const fetchSession = async () => await getSession();

        fetchSession();
      }, []);


    const actionCreateHacienda: () => void = handleSubmit(async (data) => {
        
            const hacienda = await createHacienda(data);
              
            /* manejar error del backedn y mostar mensaje */
              if(typeof hacienda == 'object' && 'error' in hacienda) return toast.error(messageErrorApi(hacienda)) 
            
            toast.success(
                `${hacienda.nombre} creada exitosamente`,
            );
            /* actualizar sesion ya que hay una hacienda en sesion */
            if(primeraHacienda) {
                await update({
                ...session,
                user: { ...session?.user, sesion_hacienda: true,hacienda:hacienda },
            });
            router.push('/api/verificar_sesion_hacienda');
            }
            else {
                router.back();
                router.refresh();
            }
            
       
    });

    return (
        <LayoutModal
            icon="customer"
            titleModal={'Crear hacienda'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                ref={formRef}
                action={actionCreateHacienda}
                id={'form-createHacienda'}
                className="m-auto w-2/4 "
            >
                <Input
                    id="nombre"
                    label="Nueva hacienda"
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
