'use client';

import { formCheckUp } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';

export default function Page() {
    
     const submit = () => {};
    return (
        <>
            <TitlePage title="Registrar revision" />

            <form
                action=""
                className="flex flex-col items-center gap-6 p-4 max-w-lg m-auto"
            >
                <div className="flex gap-6 md:gap-12">
                    {formCheckUp.map(({ id, label, required }) =>
                        id == 'tratamiento' ? (
                            <Textarea
                                key={id}
                                id={id}
                                label={label}
                                required={required}
                            />
                        ) : (
                            <Input
                                key={id}
                                id={id}
                                label={label}
                                required={required}
                                type="text"
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
