import { Input } from "@/components/Inputs";
import { LayoutModal } from "@/components/modals";

import type { ModalProps } from "@/types";
import { useForm } from "react-hook-form";
import type { CreateHacienda } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { createHaciendaShema } from "@/validations/hacienda";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { createHacienda } from "@/actions/hacienda";
import { getSession, useSession } from "next-auth/react";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";
import { useLoadingButtonModal } from "@/stores/loadingButtonModal";

type ModalCreateHaciendaProps = ModalProps & {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  /**verificar si es la primera hacienda para redireccionar de una vez y no mostrarle el modal de seleccion de hacienda,
     ya que es innecesario crear una hacienda y después solo mostrarle un select con una sola hacienda
     */
  primeraHacienda: boolean;
};

export const ModalCreateHacienda = ({
  isOpen,
  onOpen,
  onOpenChange,
  primeraHacienda = false,
}: ModalCreateHaciendaProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateHacienda>({
    resolver: zodResolver(createHaciendaShema),
  });

  const router = useRouter();
  const formRef = useRef(null);
  const { update, data: session } = useSession();
  const { activateLoading, disableLoading } = useLoadingButtonModal();

  useEffect(() => {
    /* Llamar a la sesión para que el status el hook useSession se actualice y pase a authenticated,
        si no se hace esto el state queda en unauthenticated y no se actualiza, no permitiendo que se llame
        la función update para actualizar la sesión */
    const fetchSession = async () => await getSession();

    fetchSession();
  }, []);

  const actionCreateHacienda: () => void = handleSubmit(async (data) => {
    activateLoading();
    const hacienda = await createHacienda(data);

    /* manejar error del backend y mostrar mensaje */
    if (typeof hacienda == "object" && "error" in hacienda) {
      disableLoading();

      return toast.error(messageErrorApi(hacienda));
    }

    toast.success(`${hacienda.nombre} creada exitosamente`);
    /* actualizar sesión ya que hay una hacienda en sesión */
    if (primeraHacienda) {
      await update({
        ...session,
        user: { ...session?.user, sesion_hacienda: true, hacienda: hacienda },
      });
      disableLoading();
      router.push("/api/verificar_sesion_hacienda");
    } else {
      disableLoading();
      router.back();
      router.refresh();
    }
  });

  return (
    <LayoutModal
      icon="customer"
      titleModal={"Crear hacienda"}
      footer={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      refForm={formRef}
    >
      <form
        ref={formRef}
        action={actionCreateHacienda}
        id={"form-createHacienda"}
        className="m-auto w-2/4 "
      >
        <Input
          id="nombre"
          label="Nueva hacienda"
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
