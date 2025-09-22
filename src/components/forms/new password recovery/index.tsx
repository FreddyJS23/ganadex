"use client";

import { Input } from "@/components/Inputs";
import {
  PreguntasSeguridad,
  ResponseErrorNext,
  ResponseRegistroExitoso,
} from "@/types";
import { RecoveryPassword } from "@/types/forms";
import { Button } from "@/ui/Button";
import { recoveryPasswordShema } from "@/validations/recoveryPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const NewPasswordRecovery = ({
  preguntas,
  token,
}: {
  preguntas: PreguntasSeguridad[];
  token: string;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RecoveryPassword>({
    resolver: zodResolver(recoveryPasswordShema),
    defaultValues: { respuestas: [] },
  });

  /* campos array preguntas */

  const actionRecoveryPassword: () => void = handleSubmit(async (data) => {
    const getResponses = data.respuestas.map(({ respuesta }) => respuesta);

    const sendData = { password: data.password, respuestas: getResponses };

    const response = await fetch(`/api/restablecer_acceso/${token}`, {
      method: "POST",
      body: JSON.stringify(sendData),
    });

    const dataResponse: ResponseErrorNext | ResponseRegistroExitoso =
      await response.json();

    if ("error" in dataResponse) {
      return toast.error(dataResponse.error?.message);
    }

    toast.success(dataResponse.message);
    router.push("/login");
  });

  return (
    <form
      action={actionRecoveryPassword}
      className="flex flex-col gap-4  pb-4 px-8 sm:p-2 sm:items-center"
      id="form-recovery-password"
      ref={formRef}
    >
      {preguntas.map(({ id, pregunta }, index) => (
        <div className="flex flex-col gap-3 w-full" key={id}>
          <Input
            id={`respuestas.${index}.respuesta`}
            required
            type="text"
            label={pregunta}
            register={register}
            errors={errors}
            size="lg"
            placeholder="Respuesta"
          />
        </div>
      ))}
      <Input
        id="password"
        required
        type="password"
        label="Nueva contraseña"
        register={register}
        errors={errors}
        size="lg"
      />
      <Input
        id="password2"
        required
        type="password"
        label="Repita la Contraseña"
        register={register}
        errors={errors}
        size="lg"
      />

      <Button
        onClick={() => {
          return;
        }}
        type="submit"
        content="Recuperar contraseña"
        form="form-recovery-password"
      />
    </form>
  );
};
