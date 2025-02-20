'use client';

import { DetailsWeights } from '@/collections';
import { formWeights } from '@/collections/formsInputs';
import { Details } from '@/components/details';
import { Input } from '@/components/Inputs';
import { Pesos } from '@/types';
import { updateWeight } from '@/types/forms';
import { weightsShema } from '@/validations/weightsShema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import IconEdit from '@/icons/icono-editar.svg';
import IconSave from '@/icons/icono-save.svg';
import IconExit from '@/icons/icono-error.svg';
import { updateWeightCastle } from '@/actions/vaca';
import { updateWeightBull } from '@/actions/toro';
import { CircularProgress } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { updateWeightBeef } from '@/actions/ganado_descarte';
import { messageErrorApi } from '@/utils/handleErrorResponseNext';

type DetailsWeightsProps = {
    id: number;
    pesos: Pesos;
    typeModelWeight: 'ganado' | 'toro' | 'descarte';
    weightConfig?: number;
    disableEdit?: boolean;
};

export const WeightsEditable = ({
    id,
    pesos: pesosGanado,
    typeModelWeight,
    weightConfig,
    disableEdit=false,
}: DetailsWeightsProps) => {
    <IconEdit
        className="size-6 cursor-pointer"
        onClick={() => setEditable(!editable)}
    />;
    const router = useRouter();
    const form = useRef<HTMLFormElement | null>(null);
    const [editable, setEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pesos, setPesos] = useState(pesosGanado);

    const keysWeight = Object.keys(DetailsWeights) as Array<
        keyof typeof DetailsWeights
    >;
    const convertWeightToNumber = (weight: string | null) => {
        return parseInt(weight ? weight : '');
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<updateWeight>({
        resolver: zodResolver(weightsShema),
        defaultValues: {
            peso_2year: convertWeightToNumber(pesos.peso_2year),
            peso_destete: convertWeightToNumber(pesos.peso_destete),
            peso_nacimiento: convertWeightToNumber(pesos.peso_nacimiento),
            peso_actual: parseInt(pesos.peso_actual ? pesos.peso_actual : ''),
        },
    });

    const updatesFunctions={
        ganado:updateWeightCastle,
        toro:updateWeightBull,
        descarte:updateWeightBeef
    }
    const updateFunction=updatesFunctions[typeModelWeight]

    const actionUpdateWeight: () => void = handleSubmit(async (data) => {
        setIsLoading(true);
       
            const response= await updateFunction(id, data)
              /* manejar error del backedn y mostar mensaje */
              if('error' in response) {
                 setEditable(false);
            setIsLoading(false);
                return toast.error(messageErrorApi(response)) }

            //En caso de que el nuevo peso sea igual o mayor que el de la configuracion, actualizar para desbloquear las tabs
            if (
                response && typeModelWeight == 'ganado' && weightConfig &&
                parseInt(response.peso_actual as string) >= weightConfig
            )
                router.refresh();

            setPesos(response);
            setEditable(false);
            setIsLoading(false);
            toast.success(`Los pesos han sido actualizados`);
       
    });

    const handleClickSave = () => {
        //dispara evento submit del form
        form?.current?.dispatchEvent(new Event('submit'));
    };

    return (
        <>
            <div className="flex gap-4 self-center text-xl font-bold mb-2">
                <h3 className="">Pesos</h3>
               {!disableEdit && <span className="flex gap-4 items-center">
                    {editable ? (
                        <IconExit
                            className="size-7 cursor-pointer"
                            onClick={() => setEditable(!editable)}
                        />
                    ) : (
                        <IconEdit
                            className="size-6 cursor-pointer"
                            onClick={() => setEditable(!editable)}
                        />
                    )}
                    {editable &&
                        (isLoading ? (
                            <CircularProgress aria-label="Loading..." />
                        ) : (
                            <button
                                type="submit"
                                onClick={() => handleClickSave()}
                                form="form-weights"
                            >
                                <IconSave className="size-6" />
                            </button>
                        ))}
                </span>}
            </div>

            {editable ? (
                <form
                    action={actionUpdateWeight}
                    ref={form}
                    id="form-weights"
                    className="flex gap-6 flex-wrap justify-between sm:gap-4"
                >
                    <>
                        {formWeights.map(
                            ({ id, label, required, type, endContent }) => (
                                <div className="w-44" key={id}>
                                    <Input
                                        key={id}
                                        id={id}
                                        size="sm"
                                        variant="bordered"
                                        required={required}
                                        label={label}
                                        type={type}
                                        defaultValue={convertWeightToNumber(
                                            pesos[id],
                                        ).toString()}
                                        endContent={endContent}
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                            ),
                        )}
                    </>
                </form>
            ) : (
                <div className="flex gap-6 flex-wrap justify-between sm:gap-4">
                    <>
                        {keysWeight.map((keyWeight) => (
                            <Details
                                key={keyWeight}
                                tittle={DetailsWeights[keyWeight]}
                                content={pesos[keyWeight]}
                            />
                        ))}
                    </>
                </div>
            )}
        </>
    );
};
