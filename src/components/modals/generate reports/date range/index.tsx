"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "../..";
import { ModalProps } from "@/types";
import { useForm } from "react-hook-form";
import { RangeDatesToReports } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { toast } from "sonner";
import { rangeDatesToReportsShema } from "@/validations/rangeDatesShema";
import { generateReports } from "@/actions/generate report";
import { endpointsReports } from "@/collections/endPointsApi";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";

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

  const { activateLoading, disableLoading } = useLoadingButtonModal();

  const actionGenerateReport: () => void = handleSubmit(async (data) => {
    activateLoading();

    const file = await generateReports(data, type);

    if (typeof file == "object" && "error" in file) {
      disableLoading();
      return toast.error(messageErrorApi(file));
    }

    toast.success(`Generando reporte...`);

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(file);
    link.download = `Reporte_${type}.pdf`;
    link.click();
    disableLoading();
  });
  const dateNow = new Date();
  /* Y-m-d */
  const [formatDate] = dateNow.toISOString().split("T");
  return (
    <LayoutModal
      icon="bullCalf"
      titleModal={"Escoja un rango de fechas para el reporte"}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        action={actionGenerateReport}
        id={"form-report" + type}
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
