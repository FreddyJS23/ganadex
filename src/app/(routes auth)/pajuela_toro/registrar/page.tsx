'use client';

import { formPajuelaToro } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  CreatePajuelaToro } from '@/types/forms';
import { toast } from 'sonner';
import { useRef } from 'react';
import { createPajuelaToroSchema } from '@/validations/pajuelaToroShema';
import { createPajuelaToro } from '@/actions/createPajuelaToro';

export default function Page() {
    const form = useRef<HTMLFormElement | null>(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreatePajuelaToro>({
        resolver: zodResolver(createPajuelaToroSchema),
    });

    const actionPajuelaToro: () => void = handleSubmit(async (data) => {
        try {
            const response = (await createPajuelaToro(data)) as string;
            form.current?.reset();
            toast.success(`La pajuela de código ${response} ha sido registrada`);
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    });

    return (
        <>
            <TitlePage title="Registrar pajuela toro" />

            <form
                ref={form}
                action={actionPajuelaToro}
                className="grid grid-cols-1 m-auto max-w-80 p-1 gap-4 gap-y-7 sm:gap-8   "
            >
                {formPajuelaToro.map(({ id, label, required, type }) => (
                    <>
                        {
                            <div className='col-span-full' key={id}>
                                <Input
                                    id={id}
                                    label={label}
                                    type={type}
                                    register={register}
                                    errors={errors}
                                    required={required}
                                    uppercase={id == 'codigo'}
                                />
                            </div>
                        }
                    </>
                ))}
                <div className="col-span-full">
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
