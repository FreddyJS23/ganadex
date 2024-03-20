'use client';

import { formStaff } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';

export default function Page() {
    const submit = () => {};
    return (
        <>
            <TitlePage title="Registrar personal" />

            <form
                action=""
                className="flex flex-col items-center gap-6 p-4 m-auto max-w-[827px]"
            >
                <div className="flex flex-col gap-6 flex-wrap justify-around md:gap-12 sm:flex-row ">
                    {formStaff.map(
                        ({ id, label, required, type, endContent }) => (
                            <div key={id} className="sm:w-44">
                                <Input
                                    key={id}
                                    id={id}
                                    label={label}
                                    required={required}
                                    type={type}
                                    endContent={endContent}
                                />
                            </div>
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
