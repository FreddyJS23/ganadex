'use client';

import { Input } from '@/components/Inputs';
import { LayoutModal } from '../..';
import { ModalProps } from '@/types';
import { useForm } from 'react-hook-form';
import { RangeDatesToReports } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { toast } from 'sonner';
import { rangeDatesToReportsShema } from '@/validations/rangeDatesShema';
import { generateReports } from '@/actions/generate report';
import { endpointsReports } from '@/collections/endPointsApi';

export const ModalGenerateReport = ({
    onOpen,
    onOpenChange,
    type,
}: ModalProps & { type: keyof typeof endpointsReports }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<RangeDatesToReports>({
        resolver: zodResolver(rangeDatesToReportsShema),
    });

    const formRef = useRef(null);

    const actionGenerateReport: () => void = handleSubmit(async (data) => {
        try {
            const file = await generateReports(data, type);
            toast.success(`Generando reporte...`);

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(file as Blob);
            link.download = `Reporte_${type}.pdf`;
            link.click();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    });
    const dateNow = new Date();
    /* Y-m-d */
    const [formatDate] = dateNow.toISOString().split('T');
    return (
        <LayoutModal
            icon="bullCalf"
            titleModal={'Escoja un rango de fechas para el reporte'}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form
                ref={formRef}
                action={actionGenerateReport}
                id={'form-report' + type}
                className="m-auto w-2/4 "
            >
                <Input
                    id="start"
                    label="Fecha de inicio"
                    required
                    type="date"
                    size="lg"
                    errors={errors}
                    register={register}
                />
                <Input
                    id="end"
                    label="Fecha fin"
                    required
                    type="date"
                    size="lg"
                    errors={errors}
                    register={register}
                    defaultValue={formatDate}
                />
            </form>
        </LayoutModal>
    );
};
