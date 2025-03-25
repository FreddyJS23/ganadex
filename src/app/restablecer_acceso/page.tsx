'use client';

import { Input } from '@/components/Inputs';
import {
    ResponseErrorNext,
    
} from '@/types';
import { Button } from '@/ui/Button';
import { userRecoveryShema } from '@/validations/recoveryPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Page() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<{ usuario: string }>({
        resolver: zodResolver(userRecoveryShema),
    });

    const actionRestablecerContraseña: () => void = handleSubmit(
        async (dataForm) => {
            const res = await fetch('/api/restablecer_acceso', {
                method: 'POST',
                body: JSON.stringify(dataForm),
            });
            if (res.redirected) redirect(res.url);

            const dataError: ResponseErrorNext = await res.json();
            if ('error' in dataError) {
                return toast.error(dataError.error?.message);
            }
        },
    );

    return (
        <section className="flex h-screen  p-2 w-full">
            <article className="flex flex-col gap-4 sm:bg-base-100 w-5/12 p-6 h-3/6 max-w-xl rounded-lg m-auto ">
                <h1 className="font-bold text-2xl">Restablecer contraseña</h1>

                <form
                    action={actionRestablecerContraseña}
                    id="form-restablecer-contraseña"
                    className="flex flex-col gap-6 "
                >
                    <div className="w-11/12 max-w-sm m-auto">
                        <Input
                            id="usuario"
                            required
                            type="text"
                            label="Usuario"
                            register={register}
                            errors={errors}
                            size="lg"
                            description="Ingrese su usuario para intentat recuperar el acceso"
                        />
                    </div>

                    <div className="w-11/12 max-w-sm m-auto">
                        <Button
                            onClick={() => {
                                return;
                            }}
                            type="submit"
                            content="Enviar"
                            form="form-restablecer-contraseña"
                        />
                    </div>
                </form>
            </article>
        </section>
    );
}
