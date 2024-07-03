import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { Comprador, ModalProps } from '@/types';
import { Select } from '@/components/select';
import { Controller, useForm } from 'react-hook-form';
import { createSaleCattleShema } from '@/validations/saleCattle';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSaleCattle } from '@/types/forms';
import { createSaleCattle } from '@/actions/createSaleCattle';
import { toast } from 'sonner';
import { endpointsReports } from '@/collections/endPointsApi';
import { Button } from '@/ui/Button';
import IconPrint from '@/icons/icono-imprimir.svg';

export const ModalSaleCattle = ({
    isOpen,
    onOpen,
    onOpenChange,
    selectCompradores,
}: ModalProps & { selectCompradores: Comprador[] }) => {
    const itemsSelect: { value: string | number; label: string }[] = [];

    selectCompradores.map(({ id, nombre }) =>
        itemsSelect.push({ value: id, label: nombre }),
    );
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<CreateSaleCattle>({
        resolver: zodResolver(createSaleCattleShema),
    });

    const router = useRouter();
    const formRef = useRef(null);
    const params = useParams<{ id: string }>();

    const generateReportSale = async (
        endPoint: keyof typeof endpointsReports,
    ) => {
        try {
            const getFile = await fetch(`/api/reportes/${endPoint}`);
            toast.success(`Generando nota de venta...`);
            const file = await getFile.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(file as Blob);
            link.download = `Reporte_${endPoint}.pdf`;
            link.click();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    };

    const actionCreateSaleCattle: () => void = handleSubmit(async (data) => {
        try {
            const saleCattle = await createSaleCattle(
                data,
                parseInt(params.id),
            );
            toast.success(
                `Se ha realizado la venta del ganado ${saleCattle} `,
                {
                    action: (
                        <div className="max-w-24">
                            <Button
                                content={<IconPrint className={'size-6'} />}
                                onClick={async () =>
                                    await generateReportSale('notaVenta')
                                }
                            />
                        </div>
                    ),
                },
            );
            router.back();
            router.refresh();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    });

    return (
        <LayoutModal
            icon="cattleV2"
            titleModal={'Venta de ganado'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                id="form-createSaleCattle"
                action={actionCreateSaleCattle}
                className="m-auto flex flex-col gap-4 w-2/4 "
                method="post"
                ref={formRef}
            >
                <Input
                    id="precio"
                    label="Precio"
                    required
                    type="number"
                    endContent="dolar"
                    size="lg"
                    errors={errors}
                    register={register}
                />
                <Controller
                    name="comprador_id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            id="comprador_id"
                            label="Compradores"
                            required
                            description="Compradores disponibles, creados previamente"
                            items={itemsSelect}
                            errors={errors}
                            field={field}
                        />
                    )}
                />
            </form>
        </LayoutModal>
    );
};
