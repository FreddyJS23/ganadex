'use client';

import { formBeef, } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';
import { Select } from '@/components/select';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBeef, } from '@/types/forms';
import { toast } from 'sonner';
import { createBeefShema } from '@/validations/beefShema';
import { createBeef } from '@/actions/createBeef';


export default function Page() {
    
        const {
            register,
            formState: { errors },
            handleSubmit,
            control,
        } = useForm<CreateBeef>({
            resolver: zodResolver(createBeefShema)
        });

        const actionBeef: () => void = handleSubmit(
            async (data) => {
                try {
                    const response = await createBeef(data) as string | number;
                    toast.success(`Res numero ${response} ha sido registrado`);
                } catch (error) {
                const  message  = error as string;
                    return toast.error(message);
                }
            },
        );
    
    return (
        <>
            <TitlePage title="Registrar res" />

            <form
                action={actionBeef}
                className="grid grid-cols-2 m-auto max-w-5xl p-1 gap-4 gap-y-7 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 "
            >
                {formBeef.map(
                    ({
                        id,
                        label,
                        required,
                        type,
                        select,
                        endContent,
                    }) => (
                        <>
                            {
                                <div key={id}>
                                    {type != 'select' && (
                                        <Input
                                            id={id}
                                            label={label}
                                            type={type}
                                            endContent={endContent}
                                            register={register}
                                            errors={errors}
                                            required={required}
                                        />
                                    )}
                                    {/*  select normal */}
                                    {type == 'select' && select && (
                                        <Controller
                                        name={id}
                                        control={control}
                                        render={({field})=>
                                        <Select
                                        field={field}
                                        id={id}
                                        items={select}
                                        label={label}
                                        errors={errors}
                                        required={required}
                                        />}
                                        /> 
                                    )}
                                </div>
                            }
                        
                        </>
                    ),
                )}
                <div className="col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2">
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
}
