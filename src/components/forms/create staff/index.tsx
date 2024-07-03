'use client';

import { createStaff } from '@/actions/createStaff';
import { formStaff } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Select } from '@/components/select';
import { ResponseCargosPersonal } from '@/types';
import { CreateStaff } from '@/types/forms';
import { Button } from '@/ui/Button';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';
import { createStaffShema } from '@/validations/staffShema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const FormCreateStaff = ({
    cargos_personal,
}: ResponseCargosPersonal) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<CreateStaff>({
        resolver: zodResolver(createStaffShema),
    });

    const actionStaff: () => void = handleSubmit(async (data) => {
        try {
            console.log('33');
            const response = (await createStaff(data)) as string;
            toast.success(`${response} ha sido registrado`);
        } catch (error) {
            console.log('33');
            const message = error as string;
            return toast.error(message);
        }
    });

    return (
        <form
            action={actionStaff}
            className="flex flex-col items-center gap-6 p-4 m-auto max-w-[827px]"
        >
            <div className="flex flex-col gap-6 flex-wrap justify-around md:gap-12 sm:flex-row ">
                {formStaff.map(({ id, label, required, type, endContent }) => (
                    <div key={id} className="sm:w-44">
                        {type != 'select' && (
                            <Input
                                key={id}
                                id={id}
                                label={label}
                                required={required}
                                type={type}
                                endContent={endContent}
                                register={register}
                                errors={errors}
                            />
                        )}

                        {/*  select normal */}
                        {type == 'select' && (
                            <Controller
                                name={id}
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        field={field}
                                        id={id}
                                        items={converToSelectOptions(
                                            cargos_personal as [],
                                        )}
                                        label={label}
                                        errors={errors}
                                        required={required}
                                    />
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="w-full sm:max-w-72">
                <Button
                    type="submit"
                    onClick={() => {
                        return;
                    }}
                    content="Registrar"
                />
            </div>
        </form>
    );
};
