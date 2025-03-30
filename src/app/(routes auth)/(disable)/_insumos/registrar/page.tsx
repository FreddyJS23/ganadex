"use client";

import { createSupply } from "@/actions/insumos";
import { formSupply } from "@/collections/formsInputs";
import { Input } from "@/components/Inputs";
import { CreateSupply } from "@/types/forms";
import { Button } from "@/ui/Button";
import { TitlePage } from "@/ui/TitlePage";
import { createSupplyShema } from "@/validations/supplyShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSupply>({
    resolver: zodResolver(createSupplyShema),
  });

  const form = useRef<HTMLFormElement | null>(null);

  const actionSupply: () => void = handleSubmit(async (data) => {
    try {
      const response = (await createSupply(data)) as string;
      form.current?.reset();
      toast.success(`Insumo ${response} ha sido registrado`);
    } catch (error) {
      const message = error as string;
      return toast.error(message);
    }
  });

  return (
    <>
      <TitlePage title="Registrar Insumo" />

      <form
        ref={form}
        action={actionSupply}
        className="flex flex-col items-center gap-6 p-4 max-w-lg m-auto"
      >
        <div className="flex flex-col gap-6 md:gap-12 sm:flex-row ">
          {formSupply.map(({ id, label, required, type, endContent }) => (
            <Input
              key={id}
              id={id}
              label={label}
              required={required}
              type={type}
              endContent={endContent}
              errors={errors}
              register={register}
            />
          ))}
        </div>
        <div className="w-full sm:max-w-72">
          <Button
            type="submit"
            onClick={() => {
              return;
            }}
            content="Registrar"
          />
        </div>
      </form>
    </>
  );
}
