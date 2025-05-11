import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import type { CausaFallecimiento, ModalProps } from "@/types";
import { Controller, useForm } from "react-hook-form";
import type { CreateDeathCastle } from "@/types/forms";
import { createDeathCastleShema } from "@/validations/deathCastle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { createDeathCattle } from "@/actions/fallecimientos";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { getDateNow } from "@/utils/getDateNow";
import { formDeadCattle } from "@/collections/formsInputs";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { Select } from "@/components/select";
import { converToSelectOptions } from "@/utils/convertResponseInOptionsSelect";
import { ButtonCreateItem } from "@/ui/ButtonCreate";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";
import { useFormManager } from "@/hooks/useFormManager";

export const ModalDeathCattle = ({
  isOpen,
  onOpen,
  onOpenChange,
  dataHeader,
  causas_fallecimeinto,
}: ModalProps & { causas_fallecimeinto: CausaFallecimiento[] }) => {
  const params = useParams<{ id: string }>();

  const { handleSubmitForm, errors, register, formRef, control } =
    useFormManager<CreateDeathCastle, number | undefined>({
      schema: createDeathCastleShema,
      typeForm: "create",
      id: Number.parseInt(params.id),
      submitCreateWithIdAction: createDeathCattle,
      messageOnSuccess: () => "crearFallecimiento",
      messageResponseLast: true,
    });

  return (
    <LayoutModal
      icon="dead"
      titleModal={"Nuevo fallecimiento"}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      dataHeader={dataHeader}
      refForm={formRef}
    >
      <form
        ref={formRef}
        action={handleSubmitForm}
        className="m-auto flex flex-col gap-4 w-2/4 "
        id={"form-createDeathCattle"}
      >
        {formDeadCattle.map(({ id, label, required, type, endContent }) => (
          <>
            <div key={id}>
              {type != "select" && id != "fecha" && (
                <Input
                  id={id}
                  label={label}
                  type={type}
                  endContent={endContent}
                  register={register}
                  size="lg"
                  errors={errors}
                  required={required}
                />
              )}

              {type == "select" && (
                <div className="w-full flex gap-2 items-center">
                  <ButtonCreateItem
                    tittle="Nueva causa de fallecimiento"
                    small={true}
                    href={"/fallecimientos/causa/crear"}
                  />
                  <Controller
                    name={id}
                    control={control}
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
                </div>
              )}
              {id == "fecha" && (
                <Input
                  id={id}
                  label={label}
                  type={type}
                  endContent={endContent}
                  register={register}
                  size="lg"
                  errors={errors}
                  required={required}
                  defaultValue={getDateNow()}
                />
              )}
            </div>
          </>
        ))}
      </form>
    </LayoutModal>
  );
};
