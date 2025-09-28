import { Input } from "@/components/Inputs";
import { LayoutModal } from "@/components/modals";

import type { ModalProps } from "@/types";
import type { CreateCustomer } from "@/types/forms";
import { createCustomerShema } from "@/validations/Customer";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/actions/comprador";
import { useFormManager } from "@/hooks/useFormManager";

export const ModalCreateCustomer = ({
  isOpen,
  onOpen,
  onOpenChange,
  referer,
}: ModalProps & { referer?: string | null }) => {
  const router = useRouter();

  const customSuccessAction = () => {
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
    const lastSegment = Number.parseInt(segmentPath[segmentPath.length - 1]);
    //reconstruir ruta que hizo referencia
    const newRoute = segmentPath.join("/");
    //si es un numero es porque se esta creando fuera de su modulo (comprador/registrar)
    if (typeof lastSegment == "number" && !Number.isNaN(lastSegment)) {
      return router.replace(`/${newRoute}`);
    }
    router.refresh();
    return router.back();
  };

  const { handleSubmitForm, errors, register, formRef } = useFormManager<
    CreateCustomer,
    string | number | undefined
  >({
    schema: createCustomerShema,
    typeForm: "create",
    submitCreateAction: createCustomer,
    customSuccessAction: customSuccessAction,
    messageOnSuccess: "crearComprador",
    routerRefresh: false,
    routerBack: false,
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
        action={handleSubmitForm}
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
