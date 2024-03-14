'use client';

import { formBirth } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';

export default function Page() {
  
  const submit=()=>{}
    return (
        <>
            <TitlePage title="Registrar parto" />

            <form
                action=""
                className="flex flex-col items-center gap-8 p-4 m-auto "
            >
                <div className="flex gap-6 w-full flex-col justify-center max-w-80 sm:justify-evenly sm:flex-row sm:flex-wrap sm:max-w-fit ">
                    {formBirth.map(
                        ({ id, label, required, type, endContent, select }) => (
                            <div key={id} className={'sm:w-44'}>
                                {type != 'select' && (
                                    <Input
                                        key={id}
                                        id={id}
                                        label={label}
                                        required={required}
                                        type={type}
                                        endContent={endContent}
                                    />
                                )}

                                {type == 'select' && (
                                    <Select
                                        key={id}
                                        id={id}
                                        label={label}
                                        required={required}
                                        items={select ? select : []}
                                    />
                                )}
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
