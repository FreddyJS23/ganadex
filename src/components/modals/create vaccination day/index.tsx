import { createVaccinationDay } from '@/actions/planSanitario';
import { formVaccinationDay } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { AvailableVaccines, ModalProps, } from '@/types';
import { CreateVaccinacionDay } from '@/types/forms';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';
import { createVaccinationDayShema } from '@/validations/VaccinationDay';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LayoutModal } from '..';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';

export const ModalCreateVaccinationDay = ({
    isOpen,
    onOpen,
    onOpenChange,
    vacunas,
}: ModalProps & { vacunas: AvailableVaccines[] }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<CreateVaccinacionDay>({
        resolver: zodResolver(createVaccinationDayShema),
    });

    const router = useRouter();
    const formRef = useRef(null);

    const actionVaccinationDay: () => void = handleSubmit(async (data) => {
       
            
       const response= await createVaccinationDay(data);
        /* manejar error del backedn y mostar mensaje */
        if(typeof response == 'object' && 'error' in response) return toast.error(messageErrorApi(response)) 
            toast.success(`Plan sanitario registrado`);
            router.back();
            router.refresh();
       
    });

    return (
        <LayoutModal
            icon="checkUp"
            titleModal={'Nuevo plan sanitario'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                ref={formRef}
                id='form-createVaccinationDay'
                action={actionVaccinationDay}
                className="flex flex-col items-center gap-6 p-4 m-auto max-w-[827px]"
            >
                <div className="flex flex-col gap-4 flex-wrap justify-around  sm:flex-row ">
                    {formVaccinationDay.map(({ id, label, required, type }) => (
                        <div key={id} className="sm:w-44">
                            {type != 'select' && (
                                <Input
                                    key={id}
                                    id={id}
                                    label={label}
                                    required={required}
                                    type={type}
                                    register={register}
                                    errors={errors}
                                />
                            )}

                            {/*  select normal */}
                            {type == 'select' && (
                                <Controller
                                    name={id}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id={id}
                                            items={converToSelectOptions(
                                                vacunas as [],
                                            )}
                                            label={label}
                                            errors={errors}
                                            required={required}
                                        />
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </form>
        </LayoutModal>
    );
};
