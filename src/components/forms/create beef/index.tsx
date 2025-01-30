'use client';

import {
    formDeadCattle as formDeadBeef,
    formSaleCattle as formSaleBeef,
} from '@/collections/formsInputs';
import { formBeef } from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { Select } from '@/components/select';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBeef } from '@/types/forms';
import { toast } from 'sonner';
import {
    createDiscardedCattleShema,
    createDiscardedCattleWithDeadthShema,
    createDiscardedCattleWithSaleShema,
} from '@/validations/discardedCattleShema';
import { createBeef } from '@/actions/ganado_descarte';
import { ChangeEvent, useRef, useState } from 'react';
import { Select as SelectNextUI, SelectItem } from '@nextui-org/select';
import { Comprador } from '@/types';
import { Chip, Selection } from '@nextui-org/react';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';

type FormBeffProps = {
    compradores: Comprador[];
    numero_disponible:number;
};

export const FormBeef = ({ compradores,numero_disponible }: FormBeffProps) => {
    const form = useRef<HTMLFormElement | null>(null);

    const [shema, setshema] = useState<
        | typeof createDiscardedCattleShema
        | typeof createDiscardedCattleWithSaleShema
        | typeof createDiscardedCattleWithDeadthShema
    >(createDiscardedCattleShema);
    /* states of the bull */
    const [states, setStates] = useState<Selection>(new Set('1'));

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
    } = useForm<CreateBeef>({
        resolver: zodResolver(shema),
        defaultValues: { estado_id: ['1'], numero: numero_disponible },
    });

    const handleSelectionTypeBeefChange = (select: number | string) => {
        /* pocision del container campo peso dos años */
        const inputWeight2year = form.current?.querySelector(
            '#peso_2year',
        ) as HTMLDivElement;

        if (select == 1) {
            /* se usa el setValue porque el resetField no funciona, no borra el valor en el input */
            setValue('peso_2year', undefined);
            inputWeight2year.classList.add('hidden');
        } else inputWeight2year.classList.remove('hidden');
    };

    const actionBeef: () => void = handleSubmit(async (data) => {
        try {
            const response = (await createBeef(data)) as string | number;
            form.current?.reset();
            setStates(new Set('1'));
            setShowinputDead(false);
            setShowinputSale(false);
            toast.success(
                `GanadoDescarte numero ${response} ha sido registrado`,
            );
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    });

    /* select states of the castle */
    const { id, label, required, select } = formBeef[formBeef.length - 1];

    const [showinputDead, setShowinputDead] = useState(false);
    const [showinputSale, setShowinputSale] = useState(false);

    const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const valuesStates = e.target.value.split(',');
        /* state sale */
        if (valuesStates.some((value) => value == '5')) {
            setshema(createDiscardedCattleWithSaleShema);
            setStates(new Set('5'));
            setValue('estado_id', ['5']);
            setShowinputSale(true);
            setShowinputDead(false);
        } else if (valuesStates.some((value) => value == '2')) {
            /* state dead */
            setshema(createDiscardedCattleWithDeadthShema);
            setStates(new Set('2'));
            setValue('estado_id', ['2']);
            setShowinputDead(true);
            setShowinputSale(false);
        } else {
            /* other states */
            setShowinputDead(false);
            setShowinputSale(false);
            setshema(createDiscardedCattleShema);
            setValue('estado_id', valuesStates);
            setStates(new Set(valuesStates));
        }
    };

    return (
        <form
            ref={form}
            action={actionBeef}
            className="grid grid-cols-2 m-auto max-w-5xl p-1 gap-4 gap-y-7 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 "
        >
            {formBeef.map(
                ({ id, label, required, type, select, endContent }) => (
                    <>
                        {id != 'estado_id' &&
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
                                        defaultValue={id== 'numero' ? String(numero_disponible) : undefined}
                                    />
                                )}
                                {/*  select normal */}
                                {type == 'select' && select && (
                                    <Controller
                                        name={id}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                field={field}
                                                id={id}
                                                items={select}
                                                label={label}
                                                errors={errors}
                                                required={required}
                                                handleSelectionChange={
                                                    handleSelectionTypeBeefChange
                                                }
                                            />
                                        )}
                                    />
                                )}
                            </div>
                        }
                    </>
                ),
            )}
            {/* inputs dead cattle */}
            {showinputDead &&
                formDeadBeef.map(
                    ({ id, label, required, type, endContent }) => (
                        <>
                            <div key={id}>
                                {id == 'causa' && (
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
                                {id == 'fecha' && (
                                    <Input
                                    /* El id se debe cambiar ya que se usa una shema validacion diferente
                                        al original */      
                                    id={'fecha_fallecimiento'}
                                        label={label}
                                        type={type}
                                        endContent={endContent}
                                        register={register}
                                        errors={errors}
                                        required={required}
                                    />
                                )}
                            </div>
                        </>
                    ),
                )}

            {/* inputs sale cattle */}
            {showinputSale &&
                formSaleBeef.map(
                    ({ id, label, required, type, endContent }) => (
                        <>
                            <div key={id}>
                            {type != 'select' && type != 'date' && (
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
                                {type == 'date' && (
                                    <Input
                                        /* El id se debe cambiar ya que se usa una shema validacion diferente
                                        al original */    
                                        id={'fecha_venta'}
                                        label={label}
                                        type={type}
                                        endContent={endContent}
                                        register={register}
                                        errors={errors}
                                        required={required}
                                    />
                                )}
                                {type == 'select' && (
                                    <Controller
                                        name={id}
                                        /*Se interpone un any ya que esta heredando el tipo del formulario completo
                            ocasionando conflicto de tipos ya que los campos del formulario no estan presentes  */
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        control={control as any}
                                        render={({ field }) => (
                                            <Select
                                                field={field}
                                                id={id}
                                                items={converToSelectOptions(
                                                    compradores as [],
                                                )}
                                                label={label}
                                                errors={errors}
                                                required={required}
                                            />
                                        )}
                                    />
                                )}
                            </div>
                        </>
                    ),
                )}

            {/*   select multiple */}
            {
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
                                    selectedKeys={states}
                                    labelPlacement="outside"
                                    isRequired={required}
                                    onChange={handleSelectionChange}
                                    isInvalid={errors[id] && true}
                                    errorMessage={
                                        errors[id] && errors[id]?.message
                                    }
                                    classNames={{
                                        innerWrapper: 'h-fit',
                                        trigger: 'h-fit',
                                        label: 'top-4 text-current  font-bold',
                                        popoverContent: 'bg-base-100',
                                    }}
                                    renderValue={(items) => {
                                        return (
                                            <div className="flex flex-wrap gap-2 p-2 md:p-4">
                                                {items.map((item) => (
                                                    <Chip
                                                        color="primary"
                                                        key={item.key}
                                                        className="text-xs md:text-base"
                                                    >
                                                        {item.data?.label}
                                                    </Chip>
                                                ))}
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
            }

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
    );
};
