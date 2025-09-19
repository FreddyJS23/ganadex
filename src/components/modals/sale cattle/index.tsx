import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import type { Comprador, ModalProps } from "@/types";
import { Select } from "@/components/select";
import { Controller, useForm } from "react-hook-form";
import { createSaleCattleShema } from "@/validations/saleCattle";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateSaleCattle } from "@/types/forms";
import { createSaleCattle, ventaGanadoLote } from "@/actions/ventaGanado";
import { toast } from "sonner";
import type { endpointsReports } from "@/collections/endPointsApi";
import { Button } from "@/ui/Button";
import IconPrint from "@/icons/icono-imprimir.svg";
import { getDateNow } from "@/utils/getDateNow";
import { formSaleCattle } from "@/collections/formsInputs";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { ButtonCreateItem } from "@/ui/ButtonCreate";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";

type ModalBaseProps = Pick<ModalProps, "isOpen" | "onOpen" | "onOpenChange"> & {
  selectCompradores: Comprador[];
  /** identificar cuando el modal es para vender un solo animal o varios */
};
type ModalManyItemsProps = ModalBaseProps & {
  itemsIds: number[];
  onClose: () => void;
  resetItemsIds: () => void;
};

type ModalSaleProps =
  | (ModalBaseProps & { sale?: "single" })
  | (ModalManyItemsProps & { sale?: "multiple" });

export const ModalSaleCattle = (props: ModalSaleProps) => {
  const {
    isOpen,
    onOpen,
    onOpenChange,
    selectCompradores,
    sale = "single",
  } = props;

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
    defaultValues: { fecha: getDateNow() },
  });

  const router = useRouter();
  const formRef = useRef(null);
  const params = useParams<{ id: string }>();
  const { activateLoading, disableLoading } = useLoadingButtonModal();

  const generateReportSale = async (
    endPoint: keyof typeof endpointsReports,
  ) => {
    try {
      activateLoading();
      const getFile = await fetch(`/api/reportes/${endPoint}`);
      toast.success(`Generando nota de venta...`);
      const file = await getFile.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(file as Blob);
      link.download = `Reporte_${endPoint}.pdf`;
      link.click();
    } catch (error) {
      const message = error as string;
      return toast.error(message);
    } finally {
      disableLoading();
    }
  };

  const actionCreateSaleCattle: () => void = handleSubmit(async (data) => {
    activateLoading();
    const saleCattle =
      sale === "single"
        ? //crear venta individual
          await createSaleCattle(data, Number(params.id))
        : //crear venta de lote,se usa del prop para no tener error de typescript
          sale === "multiple" &&
          props.sale === "multiple" &&
          (await ventaGanadoLote(data, props.itemsIds));
    /* manejar error del backend y mostrar mensaje */
    if (typeof saleCattle == "object" && "error" in saleCattle) {
      disableLoading();
      return toast.error(messageErrorApi(saleCattle));
    }

    //mensaje para venta individual
    if (sale === "single") {
      disableLoading();
      toast.success(`Se ha realizado la venta del ganado ${saleCattle} `, {
        action: (
          <div className="max-w-24">
            <Button
              content={<IconPrint className={"size-6"} />}
              onClick={async () => await generateReportSale("notaVenta")}
            />
          </div>
        ),
      });
      disableLoading;
      router.back();
      router.refresh();
    }
    //mensaje para venta de lote
    else if (props.sale === "multiple") {
      if (props.itemsIds.length == saleCattle) {
        toast.success(`Se han vendido ${props.itemsIds.length} animales`);
        router.refresh();
        props.resetItemsIds();
        props.onClose();
      } else
        toast.error(
          `No se han podido vender ${props.itemsIds.length} animales`,
        );
    }
  });

  return (
    <LayoutModal
      icon="cattleV2"
      titleModal={
        sale === "single" ? "Venta de ganado" : "Vender animales seleccionado"
      }
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
        {formSaleCattle.map(({ id, label, required, type, endContent }) => (
          <>
            <div key={id}>
              {type != "select" && type != "date" && (
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
              {type == "date" && (
                <Input
                  id={id}
                  label={label}
                  type={type}
                  endContent={endContent}
                  register={register}
                  errors={errors}
                  required={required}
                  defaultValue={getDateNow()}
                />
              )}
              {type == "select" && (
                <div className="w-full flex gap-2 items-center">
                  <ButtonCreateItem
                    tittle="Nuevo comprador"
                    small={true}
                    href={"/comprador/registrar"}
                  />

                  <Controller
                    name={id}
                    /*Se interpone un any ya que esta heredando el tipo del formulario completo
                                        ocasionando conflicto de tipos ya que los campos del formulario no están presentes  */
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    control={control as any}
                    render={({ field }) => (
                      <Select
                        field={field}
                        id={id}
                        items={itemsSelect}
                        label={label}
                        errors={errors}
                        required={required}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </>
        ))}
      </form>
    </LayoutModal>
  );
};
