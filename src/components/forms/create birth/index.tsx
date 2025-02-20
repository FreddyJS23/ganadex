'use client';

import { createBirth } from '@/actions/parto';
import { formBirth } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { Textarea } from '@/components/Textarea';
import { ResponseVeterinariosSelect, veterinario } from '@/types';
import { CreateAdminBirth, CreateBaseBirth } from '@/types/forms';
import { Button } from '@/ui/Button';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';
import { getDateNow } from '@/utils/getDateNow';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';
import { createAdminBirthShema, createBaseBirthShema } from '@/validations/birthShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormCreateBirthProps = {
    veterinarios: veterinario[];
    numero_disponible:number;
    isAdmin:boolean
};



export const FormCreateBirth = ({
    veterinarios,
    numero_disponible,
    isAdmin
}: FormCreateBirthProps) => {
    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<CreateBaseBirth | CreateAdminBirth>({
        resolver: zodResolver(isAdmin ? createAdminBirthShema : createBaseBirthShema),
        defaultValues: {  numero: numero_disponible,fecha:getDateNow()}
    });
    const router = useRouter();
    const { id: cattleId } = useParams<{ id: string }>();
console.log(errors)
    const actionCreateBirth: () => void = handleSubmit(async (data) => {
       
           const response= await createBirth(data, parseInt(cattleId));
            /* manejar error del backedn y mostar mensaje */
            if(typeof response == 'object' && 'error' in response!) return toast.error(messageErrorApi(response)) 
           toast.success(`Parto creado`);
            router.back();
            router.refresh();
      
    });

    return (
        <>
            <form
                action={actionCreateBirth}
                className="flex flex-col items-center gap-8 p-4 m-auto "
            >
                <div className="flex gap-6 flex-col justify-center max-w-80 sm:justify-evenly sm:flex-row sm:flex-wrap sm:max-w-fit ">
                    {formBirth.map(({ id, label, required, type, select,endContent }) => (
                        <div key={id} className={'sm:w-44'}>
                            {id == 'observacion' && (
                                <Textarea
                                    key={id}
                                    id={id}
                                    label={label}
                                    required={required}
                                    errors={errors}
                                    register={register}
                                />
                            )}
                            {type != 'select' && id != 'observacion' && id != 'fecha' && (
                                <Input
                                    key={id}
                                    id={id}
                                    label={label}
                                    required={required}
                                    type={type}
                                    errors={errors}
                                    register={register}
                                    endContent={endContent}
                                    defaultValue={id== 'numero' ? String(numero_disponible) : undefined}

                                />
                            )}

                            {id == 'fecha' && (
                                <Input
                                    key={id}
                                    id={id}
                                    label={label}
                                    required={required}
                                    defaultValue={getDateNow()}
                                    type="date"
                                    errors={errors}
                                    register={register}
                                />
                            )}

                            {type == 'select' && id != 'personal_id'&& (
                                <Controller
                                    name={id}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id={id}
                                            items={
                                             
                                                select!
                                            }
                                            label={label}
                                            errors={errors}
                                            required={required}
                                        />
                                    )}
                                />
                            )}
                           
                            {type == 'select' && id == 'personal_id'&& isAdmin && (
                                <Controller
                                    name={id}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id={id}
                                            items={
                                            
                                            converToSelectOptions(
                                                veterinarios as [],
                                            )
                                                    
                                            }
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
