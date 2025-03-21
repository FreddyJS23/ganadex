'use client';

import {
    formCastle,
    formDeadCattle,
    formSaleCattle,
} from '@/collections/formsInputs';
import { Input } from '@/components/Inputs';
import { Button } from '@/ui/Button';
import { Select as SelectNextUI, SelectItem } from '@nextui-org/select';
import { Chip } from '@nextui-org/chip';
import { Select } from '@/components/select';
import { Controller, useForm } from 'react-hook-form';
import { castleShema, castleShemaWitDeath, castleShemaWithSale } from '@/validations/castleShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCastle } from '@/types/forms';
import { createCastle } from '@/actions/vaca';
import { toast } from 'sonner';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Checkbox, Selection } from '@nextui-org/react';
import { AvailableVaccines, CausaFallecimiento, Comprador, ListaVacunas, ResponseCompradores, ResponseGanado } from '@/types';
import { converToSelectOptions } from '@/utils/convertResponseInOptionsSelect';
import { getDateNow } from '@/utils/getDateNow';
import { CreateListVaccination } from '@/components/create list vaccination';
import { ToolTipTipoGanado } from '@/components/tooltip';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';
import { useRouter } from 'next/navigation';


type FormCowProps = {
    compradores: Comprador[];
    listaVacunas: AvailableVaccines[];
    numero_disponible:number;
    causas_fallecimeinto:CausaFallecimiento[]
}

export const FormCow = ({ compradores,listaVacunas,numero_disponible,causas_fallecimeinto }: FormCowProps) => {
    /* states of the castle */
    const [states, setStates] = useState<Selection>(new Set('1'));

    /* Lista de vacunas */
    const [listVaccines, setListVaccines] = useState<ListaVacunas[]>([]);

    const router = useRouter();
    const form = useRef<HTMLFormElement | null>(null);
    const containerInputsForm = useRef<HTMLDivElement[]>([]);
    const [shema, setshema] = useState<typeof castleShema|typeof castleShemaWitDeath|typeof castleShemaWithSale>(castleShema)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        control,
    } = useForm<CreateCastle>({
        resolver: zodResolver(shema),
        defaultValues: { estado_id: ['1'], peso_2year: 1, numero: numero_disponible },
    });
console.log(numero_disponible)
    const actionCastle: () => void = handleSubmit(async (data) => {
    
            const response = (await createCastle(data,listVaccines));
         
            /* manejar error del backedn y mostar mensaje */
            if(typeof response == 'object' && 'error' in response!) return toast.error(messageErrorApi(response)) 
            
            const dataResponse=response as string | number
           
            form.current?.reset();
            router.refresh();
            setListVaccines([])
            setStates(new Set('1'));
            setShowinputDead(false);
            setShowinputSale(false);
            toast.success(
                `La cabeza ganado de numero ${dataResponse} ha sido registrado`,
            );
       
    });

    /* actualizar numero del input al obtener nuevo numero */
    useEffect(() => {
        setValue('numero', numero_disponible);
    }, [numero_disponible,setValue]);

    /* select states of the castle */
    const { id, label, required, select } = formCastle[formCastle.length - 1];

    const [showinputDead, setShowinputDead] = useState(false);
    const [showinputSale, setShowinputSale] = useState(false);

    const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const valuesStates = e.target.value.split(',');
        /* state sale */
        if (valuesStates.some((value) => value == '5')) {
            setshema(castleShemaWithSale)
            setStates(new Set('5'));
            setValue('estado_id', ['5']);
            setShowinputSale(true);
            setShowinputDead(false);
        } else if (valuesStates.some((value) => value == '2')) {
            /* state dead */
            setshema(castleShemaWitDeath)
            setStates(new Set('2'));
            setValue('estado_id', ['2']);
            setShowinputSale(false);
            setShowinputDead(true);
        } else {
            /* other states */
            setShowinputDead(false);
            setShowinputSale(false);
            setshema(castleShema)
            setValue('estado_id', valuesStates);
            setStates(new Set(valuesStates));
        }
    };

    const handleSelectionTypeCattleChange = (select: number | string) => {
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

     // campos select tipo origen para coloca campo fecha ingreso en origen externo
     const {id: dateEntryId, label: dateEntryLabel,required: dateEntryRequired} = formCastle[4];

     const [origen, setOrigen] = useState< 1 | 2>(1);
          
     const handleSelectionOrigenChange = (select:string | number) => {
        setOrigen(select as 1 | 2)
     };


    /* control de check para mostrar campos seccion vacuna */
    const [isSelected, setIsSelected] = useState(false);
    return (
        <form
            ref={form}
            action={actionCastle}
            className="grid grid-cols-2 m-auto max-w-5xl p-1 gap-4 gap-y-7 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 "
        >
            {formCastle.map(
                ({ id, label, required, type, select, endContent,tooltipTipoGanado }) => (
                    /* estos campos no estaran en el conjunto de inputs del bucle, ya que se usando manualmente con el indice */
                    <>
                        {id != 'estado_id' && id != 'fecha_ingreso' && (
                            <div
                                key={id}
                                id={id}
                            >
                                {type != 'select' && id != 'origen_id' &&  (
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
                                {type == 'select' && select &&  (
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
                                                tooltipTipoGanado={id != 'origen_id' && tooltipTipoGanado}
                                                handleSelectionChange={id == 'origen_id' ? handleSelectionOrigenChange : handleSelectionTypeCattleChange}
                                            />
                                        )}
                                    />
                                )}
                            </div>
                        )}
                    </>
                ),
            )}

            {/* campo fecha ingreso condiciona si se selecciono origen externo */}
            {origen == 2 && (
                                    <Input
                                        id={dateEntryId}
                                        label={dateEntryLabel}
                                        type={'date'}
                                        register={register}
                                        errors={errors}
                                        required={dateEntryRequired}
                                    />
                                )}

            {/* lista de vacunas */}
                <div className='col-span-full md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-2'>
                <div className='flex flex-col items-center gap-2'>
                    <Checkbox title='Añadir vacunas'  isSelected={isSelected} onValueChange={setIsSelected}>
                        Vacunas
                    </Checkbox>
                 <CreateListVaccination vaccinesSelect={listaVacunas}  listVaccines={listVaccines} setListVaccines={setListVaccines} isChecked={isSelected} />
                </div>
                </div>
                            
             
            {/* inputs dead cattle */}
            {showinputDead &&
                formDeadCattle.map(
                    ({ id, label, required, type, endContent }) => (
                        <>
                            <div key={id}>
                                {type == 'text' && (
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
                                            items={converToSelectOptions(causas_fallecimeinto)}
                                            label={label}
                                            errors={errors}
                                            required={required}
                                        />
                                    )}
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
                formSaleCattle.map(
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
