'use client';

import { formSupply } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';

export default function Page() {
    const submit = () => {};
    return (
        <>
            <TitlePage title="Registrar Insumo" />

            <form
                action=""
                className="flex flex-col items-center gap-6 p-4 max-w-lg m-auto"
            >
                <div className="flex flex-col gap-6 md:gap-12 sm:flex-row ">
                    {formSupply.map(
                        ({ id, label, required, type, endContent }) => (
                            <Input
                                key={id}
                                id={id}
                                label={label}
                                required={required}
                                type={type}
                                endContent={endContent}
                            />
                        ),
                    )}
                </div>
                <div className="w-full sm:max-w-72">
                    <Button onClick={submit} content="Registrar" />
                </div>
            </form>
        </>
    );
}
