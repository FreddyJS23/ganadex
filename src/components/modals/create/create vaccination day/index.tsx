import { createVaccinationDay } from "@/actions/planSanitario";
import { formVaccinationDay } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import type { AvailableVaccines, DayVaccination, ModalProps } from "@/types";
import type { CreateVaccinacionDay } from "@/types/forms";
import { createVaccinationDayShema } from "@/validations/VaccinationDay";
import { Controller } from "react-hook-form";
import { LayoutModal } from "../..";
import { useFormManager } from "@/hooks/useFormManager";
import { SelectVaccines } from "@/components/selects/select vaccines";
import { ButtonCreateItem } from "@/ui/ButtonCreate";

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
                <div className="w-full flex gap-2 items-center">
                  <ButtonCreateItem
                    tittle="Nueva vacuna"
                    small={true}
                    href={"/vacuna/registrar"}
                  />
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
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
    </LayoutModal>
  );
};
