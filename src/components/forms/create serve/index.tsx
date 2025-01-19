'use client';

import { createServe } from '@/actions/createServe';
import { formService } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { SelectBulls } from '@/components/select bulls';
import { Textarea } from '@/components/Textarea';
import { PajuelaToro, ResponseVeterinariosSelect, Toro, ToroDeServicio, veterinario } from '@/types';
import { CreateServe } from '@/types/forms';
import { Button } from '@/ui/Button';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';
import { getDateNow } from '@/utils/getDateNow';
import { createServeShema } from '@/validations/serveShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormCreateServiceProps = {
    veterinarios: veterinario[];
    toros:Toro[]
    pajuelasToro:PajuelaToro[]
};

export const FormCreateService = ({
    veterinarios,
    toros,
    pajuelasToro,
}: FormCreateServiceProps) => {
    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<CreateServe>({
        resolver: zodResolver(createServeShema),
    });
    const router = useRouter();
    const { id: cattleId } = useParams<{ id: string }>();
    console.log(errors);

    const actionCreateService: () => void = handleSubmit(async (data) => {
        try {
            await createServe(data, parseInt(cattleId));
            toast.success(`Servicio creado`);
            router.back();
            router.refresh();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    });

    // campos select tipo servicio
    const [typeService, setTypeService] = useState<'monta' | 'inseminacion'>('monta');
    const {id: tipoId, label: tipoLabel, select: tipoSelect,required: tipoRequired} = formService[1];
    const handleSelectionTypeServiceChange = (select:string | number) => setTypeService(select as 'monta' | 'inseminacion');
    
    //campos select toro
    const {id: toroId, label: toroLabel,required: toroRequired} = formService[2];

    //campos select pajuela toro
    const {id: pajuelaToroId, label: pajuelaToroLabel,required: pajuelaToroRequired} = formService[3];


        /* pocision del container campo peso dos años */
    return (
        <>
            <form
                action={actionCreateService}
                className="flex flex-col items-center gap-6 p-4 max-w-2xl m-auto"
            >
                <div className="grid  md:gap-12 lg:grid-cols-3 w-full">
                    {formService.map(
                        ({ id, label, required, type, }) => (
                            <>
                                {type != 'select' && id != 'observacion' && id != 'fecha' && (
                                    <Input
                                        key={id}
                                        id={id}
                                        label={label}
                                        type={type}
                                        required={required}
                                        errors={errors}
                                        register={register}
                                    />
                                )}

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

                                {type == 'select' && id == 'personal_id' && (
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
                            </>
                        ),
                    )}
                                {/* select tipo servicio */}
                                    <Controller
                                        name={tipoId}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                field={field}
                                                handleSelectionChange={handleSelectionTypeServiceChange}
                                                id={tipoId}
                                                items={
                                                         converToSelectOptions(
                                                              tipoSelect as [],
                                                          )
                                                }
                                                label={tipoLabel}
                                                errors={errors}
                                                required={tipoRequired}

                                            />
                                        )}
                                    />

                                      {/* select toros */}
                                    {typeService == 'monta' ? ( <Controller
                                        name={toroId}
                                        control={control}
                                        render={({ field }) => (
                                            <SelectBulls
                                            field={field}
                                                id={toroId}
                                                items={toros}
                                                label={toroLabel}
                                                errors={errors}
                                                required={toroRequired}

                                            />
                                        )}
                                    />)
                                     /* select pajuelas toro */
                                    :(<Controller
                                        name={pajuelaToroId}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                field={field}
                                                handleSelectionChange={handleSelectionTypeServiceChange}
                                                id={pajuelaToroId}
                                                items={
                                                         converToSelectOptions(
                                                              pajuelasToro as [],
                                                          )
                                                }
                                                label={pajuelaToroLabel}
                                                errors={errors}
                                                required={pajuelaToroRequired}
   
                                            />
                                        )}
                                    />
                                        
                                     
                                    )
                                    
                                    }

                                    
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
