'use client';

import { createServe } from '@/actions/createServe';
import {  formService } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { Textarea } from '@/components/Textarea';
import { ResponseVeterinariosSelect } from '@/types';
import { CreateServe } from '@/types/forms';
import { Button } from '@/ui/Button';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';
import { createServeShema } from '@/validations/serveShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const FormCreateService = ({
    veterinarios,
}: ResponseVeterinariosSelect) => {
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
console.log(errors)

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

    return (
        <>
            <form
                action={actionCreateService}
                className="flex flex-col items-center gap-6 p-4 max-w-2xl m-auto"
            >
                <div className="flex gap-6 md:gap-12 w-full">
                    {formService.map(({ id, label, required, type,select }) => (
                        <>
                            {type != 'select' && id != 'observacion' && (
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

                            {type == 'select' && (
                                <Controller
                                    name={id}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id={id}
                                            items={id == 'tipo' ? select! : converToSelectOptions(veterinarios as [])}
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
