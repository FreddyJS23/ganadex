'use client';

import { Button } from '@/ui/Button';
import { Input } from '../Inputs';
import { Tab, Tabs } from '@nextui-org/tabs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authenticate } from '@/actions/login';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Login } from '@/types/forms';

export const TabLogin = () => {
    const [selected, setSelected] = useState<string | number>('login');
    const router = useRouter();

    const {
        register,
        formState: { errors },
    } = useForm<Login>();

    return (
        <Tabs
            size="md"
            aria-label="Tabs login"
            selectedKey={selected}
            onSelectionChange={setSelected}
            color="primary"
            classNames={{
                tabList: 'bg-[#e8dea0] dark:bg-[#9aff90]',
                tab: 'font-bold',
            }}
        >
            <Tab key="login" title="Ingresar" className="w-full">
                <form
                    className="flex flex-col gap-4 bg-base-100 pb-4 px-8 sm:p-2 sm:items-center"
                    action={(formData) => {
                        toast.promise(authenticate(formData), {
                            success: (data) => {
                                data?.redirect && router.push(data.redirect);
                                return `${data?.message}`;
                            },
                            error: (data: Error) => {
                                return `${data?.message}`;
                            },
                        });
                    }}
                >
                    <div className="sm:max-w-64 sm:w-60">
                        <Input
                            id="usuario"
                            required
                            type="text"
                            label="Usuario"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="sm:max-w-64 sm:w-60">
                        <Input
                            id="password"
                            required
                            type="password"
                            label="Contraseña"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="flex gap-2 justify-end mt-4 sm:w-60">
                        <Button
                            onClick={() => {
                                return;
                            }}
                            color="primary"
                            content="Ingresar"
                            type="submit"
                        />
                    </div>
                </form>
            </Tab>
            <Tab key="registrar" title="Registrar" className="w-full">
                <form className="flex flex-col gap-4 bg-base-100 pb-4 px-2 sm:max-w-96 sm:m-auto">
                    <div className="flex gap-3">
                        <Input
                            id="nombre"
                            required
                            type="text"
                            label="Nombre"
                        />
                        <Input
                            id="apellido"
                            required
                            type="text"
                            label="Apellido"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Input
                            id="usuario"
                            required
                            type="text"
                            label="Usuario"
                        />
                        <Input
                            id="correo"
                            required
                            type="text"
                            label="Correo"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Input
                            id="password"
                            required
                            type="text"
                            label="Contraseña"
                        />
                        <Input
                            id="password2"
                            required
                            type="password"
                            label="Repita la Contraseña"
                        />
                    </div>

                    <div className="flex gap-2 justify-end mt-4">
                        <Button
                            onClick={onClick}
                            color="primary"
                            content="Registrarse"
                        />
                    </div>
                </form>
            </Tab>
        </Tabs>
    );
};
