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

export const ModalDeathCattle = ({
  isOpen,
  onOpen,
  onOpenChange,
  dataHeader,
  causas_fallecimeinto,
}: ModalProps & { causas_fallecimeinto: CausaFallecimiento[] }) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CreateDeathCastle>({
    resolver: zodResolver(createDeathCastleShema),
    defaultValues: { fecha: getDateNow() },
  });

  const router = useRouter();
  const formRef = useRef(null);
  const params = useParams<{ id: string }>();

  const actionCreateDeathCattle: () => void = handleSubmit(async (data) => {
    const deathCattle = await createDeathCattle(
      data,
      Number.parseInt(params.id),
    );
    /* manejar error del backend y mostrar mensaje */
    if (typeof deathCattle == "object" && "error" in deathCattle)
      return toast.error(messageErrorApi(deathCattle));

    toast.success(
      `Se ha realizado el fallecimiento del ganado ${deathCattle} `,
    );
    router.back();
    router.refresh();
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
        action={actionCreateDeathCattle}
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
