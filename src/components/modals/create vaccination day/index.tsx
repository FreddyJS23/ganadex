import { createVaccinationDay } from "@/actions/planSanitario";
import { formVaccinationDay } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { Select } from "@/components/select";
import type { AvailableVaccines, DayVaccination, ModalProps } from "@/types";
import type { CreateVaccinacionDay } from "@/types/forms";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { createVaccinationDayShema } from "@/validations/VaccinationDay";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { LayoutModal } from "..";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useFormManager } from "@/hooks/useFormManager";
import { SelectVaccines } from "@/components/select vaccines";

export const ModalCreateVaccinationDay = ({
  isOpen,
  onOpen,
  onOpenChange,
  vacunas,
}: ModalProps & { vacunas: AvailableVaccines[] }) => {
  const { handleSubmitForm, errors, register, formRef, control } =
    useFormManager<CreateVaccinacionDay, DayVaccination | undefined>({
      schema: createVaccinationDayShema,
      typeForm: "create",
      submitCreateAction: createVaccinationDay,
      messageOnSuccess: "crearPlanSanitario",
      justMessageOnSuccess: true,
      
    });

  return (
    <LayoutModal
      icon="checkUp"
      titleModal={"Nuevo plan sanitario"}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        id="form-createVaccinationDay"
        action={handleSubmitForm}
        className="flex flex-col items-center gap-6 p-4 m-auto max-w-[827px]"
      >
        <div className="flex flex-col gap-4 flex-wrap justify-around  sm:flex-row ">
          {formVaccinationDay.map(({ id, label, required, type }) => (
            <div key={id} className="sm:w-44">
              {type != "select" && (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  required={required}
                  type={type}
                  register={register}
                  errors={errors}
                />
              )}

              {/*  select normal */}
              {type == "select" && (
                <Controller
                  name={id}
                  control={control}
                  render={({ field }) => (
                    <SelectVaccines
                      errors={errors}
                      field={field}
                      required={required}
                      type="form"
                      vaccinesSelect={vacunas}
                      filterByTipoVacuna="plan_sanitario"
                    />
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </LayoutModal>
  );
};
