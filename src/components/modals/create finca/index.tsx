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
import { useSession } from 'next-auth/react';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';

type ModalCreateFincaProps = ModalProps & {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (open: boolean) => void;
    /**verificar si es la primera finca para redireccionar de una vez y no mostrarle el modal de seleccion de finca,
     ya que es inncesario crear una finca y despues solo mostrale un select con una sola finca
     */
    primeraFinca: boolean;
};


export const ModalCreateFinca = ({
    isOpen,
    onOpen,
    onOpenChange,
    primeraFinca=false,
}: ModalCreateFincaProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateFinca>({
        resolver: zodResolver(createFincaShema),
    });

    const router = useRouter();
    const formRef = useRef(null);
    const { update, data: session } = useSession();

    const actionCreateFinca: () => void = handleSubmit(async (data) => {
        
            const finca = await createFinca(data);
              
            /* manejar error del backedn y mostar mensaje */
              if(typeof finca == 'object' && 'error' in finca) return toast.error(messageErrorApi(finca)) 
            
            toast.success(
                `${finca} creada exitosamente`,
            );
            /* actualizar sesion ya que hay una finca en sesion */
            if(primeraFinca) {
                await update({
                ...session,
                user: { ...session?.user, sesion_finca: true },
            });
            router.push('/api/verificar_sesion_finca');
            }
            else {
                router.back();
                router.refresh();
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
                    id="nombre"
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
