import { Input } from "@/components/Inputs";
import { LayoutModal } from "..";
import type { ModalProps } from "@/types";
import { useForm } from "react-hook-form";
import type { CreateCustomer } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerShema } from "@/validations/Customer";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { createCustomer } from "@/actions/comprador";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";

export const ModalCreateCustomer = ({
  isOpen,
  onOpen,
  onOpenChange,
  referer,
}: ModalProps & { referer?: string | null }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCustomer>({
    resolver: zodResolver(createCustomerShema),
  });

  const router = useRouter();
  const formRef = useRef(null);

  const actionCreateCustomer: () => void = handleSubmit(async (data) => {
    const response = await createCustomer(data);

    /*ver si es tipo objecto para evitar conflictos de tipo para manejar error del backend y mostrar mensaje */
    if (typeof response == "object")
      if ("error" in response) return toast.error(messageErrorApi(response));

    toast.success(`${response} ha sido registrado como nuevo comprador`);

    /* ya que esta ruta puede ser usada por intercesión de ruta o una ruta normal la navegación sera diferente.
    Los datos registrados deben estar lo mas reciente posible, por lo que
    se hace una navegación para refrescar dependiendo del path donde se llame */

    //rutas dentro de su modulo (/revisiones/tipo)
    if (!referer) {
      router.refresh();
      return router.push(`/venta_ganado/historial`);
    }
    const pathOrigin = referer.split("/");
    //eliminar parte del dominio, ejemplo de referer: http://localhost:3000/venta_ganado/vender/35
    const segmentPath = pathOrigin.slice(3);
    const lastSegment = parseInt(segmentPath[segmentPath.length - 1]);
    //reconstruir ruta que hizo referencia
    const newRoute = segmentPath.join("/");
    //si es un numero es porque se esta creando fuera de su modulo (comprador/registrar)
    if (typeof lastSegment == "number") {
      return router.replace(`/${newRoute}`);
    }

    router.refresh();
    return router.push(`/venta_ganado/historial`);
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Crear nuevo comprador"}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        action={actionCreateCustomer}
        id={"form-createCustomer"}
        className="m-auto w-2/4 "
      >
        <Input
          id="nombre"
          label="Comprador"
          required
          type="text"
          size="lg"
          errors={errors}
          register={register}
        />
      </form>
    </LayoutModal>
  );
};
