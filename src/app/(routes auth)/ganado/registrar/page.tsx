'use client';

import { formCastle } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { TitlePage } from '@/ui/TitlePage';
import { Select as SelectNextUI, SelectItem } from '@nextui-org/select';
import { Chip } from '@nextui-org/chip';
import { Select } from '@/components/select';
import { Controller, useForm } from 'react-hook-form';
import { castleShema } from '@/validations/castleShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCastle } from '@/types/forms';
import { createCastle } from '@/actions/createCastle';
import { toast } from 'sonner';
import { useRef } from 'react';


export default function Page() {
    
         const form = useRef<HTMLFormElement | null>(null);
        const {
            register,
            formState: { errors },
            handleSubmit,
            control,
        } = useForm<CreateCastle>({
            resolver: zodResolver(castleShema)
        });

        const actionCastle: () => void = handleSubmit(
            async (data) => {
                try {
                    const response = await createCastle(data) as string | number;
                    form.current?.reset();
                    toast.success(`La cabeza ganado de numero ${response} ha sido registrado`);
                } catch (error) {
                const  message  = error as string;
                    return toast.error(message);
                }
            },
        );
    
    return (
        <>
            <TitlePage title="Registrar cabeza ganado" />

            <form
                ref={form}
                action={actionCastle}
                className="grid grid-cols-2 m-auto max-w-5xl p-1 gap-4 gap-y-7 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 "
            >
                {formCastle.map(
                    ({
                        id,
                        label,
                        required,
                        type,
                        select,
                        endContent,
                    }) => (
                        <>
                            {id != 'estado_id' && (
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
                            )}
                            {/*   select multiple */}
                            {id == 'estado_id' && (
                                <div
                                    key={id}
                                    className="col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2"
                                >
                                    {
                                        <Controller
                                            name={id}
                                            /*Se interpone un any ya que esta heredando el tipo del formulario completo
                                        ocasionando conflicto de tipos ya que los campos del formulario no estan presentes  */
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            control={control as any}
                                            render={({ field }) => (
                                                <SelectNextUI
                                                    {...field}
                                                    label={label}
                                                    items={select}
                                                    selectionMode="multiple"
                                                    variant="underlined"
                                                    color="primary"
                                                    size="lg"
                                                    labelPlacement="outside"
                                                    isRequired={required}
                                                    isInvalid={
                                                        errors[id] && true
                                                    }
                                                    errorMessage={
                                                        errors[id] &&
                                                        errors[id]?.message
                                                    }
                                                    classNames={{
                                                        innerWrapper: 'h-fit',
                                                        trigger: 'h-fit',
                                                        label: 'top-4 text-current  font-bold',
                                                        popoverContent:
                                                            'bg-base-100',
                                                    }}
                                                    renderValue={(items) => {
                                                        return (
                                                            <div className="flex flex-wrap gap-2 p-2 md:p-4">
                                                                {items.map(
                                                                    (item) => (
                                                                        <Chip
                                                                            color="primary"
                                                                            key={
                                                                                item.key
                                                                            }
                                                                            className="text-xs md:text-base"
                                                                        >
                                                                            {
                                                                                item
                                                                                    .data
                                                                                    ?.label
                                                                            }
                                                                        </Chip>
                                                                    ),
                                                                )}
                                                            </div>
                                                        );
                                                    }}
                                                >
                                                    {({ label, value }) => (
                                                        <SelectItem key={value}>
                                                            {label}
                                                        </SelectItem>
                                                    )}
                                                </SelectNextUI>
                                            )}
                                        />
                                    }
                                </div>
                            )}
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
