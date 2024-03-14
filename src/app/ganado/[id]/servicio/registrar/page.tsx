'use client';

import { formService } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';

export default function Page() {
    const [observacion, tipo, numeroToro] = formService;
 const submit = () => {};

    return (
        <>
            <TitlePage title="Registrar servicio" />

            <form
                action=""
                className="flex flex-col items-center gap-6 p-4 m-auto "
            >
                <div className="flex gap-6 md:gap-12 flex-col w-full  max-w-96 md:flex-row md:max-w-xl lg:max-w-2xl">
                    <Input {...observacion} />
                    <Input {...numeroToro} />
                    {tipo.select && (
                        <Select
                            id={tipo.id}
                            items={tipo.select}
                            label={tipo.label}
                            required={tipo.required}
                        />
                    )}
                </div>
                <div className="w-full sm:max-w-72">
                    <Button onClick={submit} content="Registrar" />
                </div>
            </form>
        </>
    );
}
