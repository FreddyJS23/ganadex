'use client';

import { createCheckUp } from '@/actions/revision';
import { formCheckUp } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { Textarea } from '@/components/Textarea';
import { ResponseVeterinariosSelect } from '@/types';
import { CreateCheckUp } from '@/types/forms';
import { Button } from '@/ui/Button';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';
import { getDateNow } from '@/utils/getDateNow';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';
import { createCheckUpShema } from '@/validations/checkUpShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const FormCreateCheckUp = ({
    veterinarios,
}: ResponseVeterinariosSelect) => {
    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<CreateCheckUp>({
        resolver: zodResolver(createCheckUpShema),
    });
    const router = useRouter();
    const { id: cattleId } = useParams<{ id: string }>();

    const actionCreatecheckUp: () => void = handleSubmit(async (data) => {
        
           const response= await createCheckUp(data, parseInt(cattleId));
            /* manejar error del backedn y mostar mensaje */
            if(typeof response == 'object' && 'error' in response) return toast.error(messageErrorApi(response)) 
            
                toast.success(`Revision creada`);
            router.back();
            router.refresh();
        
    });

    return (
        <>
            <form
                action={actionCreatecheckUp}
                className="flex flex-col items-center gap-6 p-4 max-w-2xl m-auto"
            >
                <div className="flex gap-6 md:gap-12">
                    {formCheckUp.map(({ id, label, required, type }) => (
                        <>
                            {id == 'tratamiento' && (
                                <Textarea
                                    key={id}
                                    id={id}
                                    label={label}
                                    required={required}
                                    errors={errors}
                                    register={register}
                                />
                            )}
                            {type == 'text' && id != 'tratamiento' && (
                                <Input
                                    key={id}
                                    id={id}
                                    label={label}
                                    required={required}
                                    type="text"
                                    errors={errors}
                                    register={register}
                                />
                            )}
                            
                            {id == 'fecha' && (
                                <Input
                                    key={id}
                                    id={id}
                                    label={label}
                                    defaultValue={getDateNow()}
                                    required={required}
                                    type="date"
                                    errors={errors}
                                    register={register}
                                />
                            )}


                            {type == 'select' && (
                                <Controller
                                    name={id}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id={id}
                                            items={converToSelectOptions(
                                                veterinarios as [],
                                            )}
                                            label={label}
                                            errors={errors}
                                            required={required}
                                        />
                                    )}
                                />
                            )}
                        </>
                    ))}
                </div>
                <div className="w-full sm:max-w-72">
                    <Button
                        onClick={() => {
                            return;
                        }}
                        type="submit"
                        content="Registrar"
                    />
                </div>
            </form>
        </>
    );
};
