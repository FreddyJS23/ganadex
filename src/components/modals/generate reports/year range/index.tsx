"use client";

import { Input } from "@/components/Inputs";
import { LayoutModal } from "../..";
import { ModalProps } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { toast } from "sonner";
import { endpointsReportsAnnual } from "@/collections/endPointsApi";
import { generateReportsYear } from "@/actions/generate report year";
import { yearsToGenerateReportShema } from "@/validations/yearsTotGenerateReportShema";
import { YearToReports } from "@/types/forms";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";

export const ModalGenerateReportYear = ({
  onOpen,
  onOpenChange,
  type,
}: ModalProps & { type: keyof typeof endpointsReportsAnnual }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<YearToReports>({
    resolver: zodResolver(yearsToGenerateReportShema),
  });

  const formRef = useRef(null);
  const {activateLoading,disableLoading}= useLoadingButtonModal();
  

  const actionGenerateReportYear: () => void = handleSubmit(async (data) => {
   
      activateLoading();

    try {
      const file = await generateReportsYear(data, type);
      toast.success(`Generando reporte...`);

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file as Blob);
      link.download = `Reporte_${type}.pdf`;
      link.click();
    } catch (error) {
      const message = error as string;
      return toast.error(message);
    }
    finally {
      disableLoading();
    }
  });
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  return (
    <LayoutModal
      icon="bullCalf"
      titleModal={"Año a filtrar el resumen"}
      footer={true}
      isOpen={true}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        action={actionGenerateReportYear}
        id={"form-report" + type}
        className="m-auto w-2/4 "
      >
        <Input
          id="year"
          label="Año"
          required
          type="number"
          size="lg"
          errors={errors}
          register={register}
          defaultValue={year.toString()}
        />
      </form>
    </LayoutModal>
  );
};
