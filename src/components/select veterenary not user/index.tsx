import { UserVeterinary, type veterinario } from "@/types";
import { Button, Select, type Selection, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import SaveIcon from "@/icons/icono-save.svg";
import { createUserVeterinary } from "@/actions/userVeterinary";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { messageErrorApi } from "@/utils/handleErrorResponseNext";

type SelectVeterinaryNotUserProps = {
  veterinarios: veterinario[];
};

export const SelectVeterinaryNotUser = ({
  veterinarios,
}: SelectVeterinaryNotUserProps) => {
  const [value, setValue] = useState<Selection>(new Set([]));
  const [isLoadiaing, setIsLoading] = useState(false);
  const router = useRouter();

  const registerUserVeterinary = async () => {
    const idVeterinario = Number.parseInt(Array.from(value)[0] as string);

    if (!idVeterinario) return toast.error("Debe seleccionar un veterinario");

    try {
      setIsLoading(true);
      const res = await createUserVeterinary(idVeterinario);
      /* manejar error del backend y mostrar mensaje */
      if (typeof res == "object" && "error" in res!)
        return toast.error(messageErrorApi(res));

      const { nombre, usuario } = res;
      toast.success(
        `Se ha registrado el usuario ${usuario} para el veterinario ${nombre}`,
      );
      setValue(new Set([]));
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error as string);
    }
  };
  return (
    <>
      <Select
        className="max-w-60"
        variant="underlined"
        color="primary"
        onSelectionChange={(keys) => {
          setValue(keys);
        }}
        classNames={{
          label: "text-current font-bold",
          value: "text-current",
          popoverContent: "bg-base-100",
        }}
      >
        {veterinarios.map(({ id, nombre }) => (
          <SelectItem key={id}>{nombre}</SelectItem>
        ))}
      </Select>
      <Button
        isIconOnly
        aria-label="Guardar"
        variant="flat"
        onClick={() => registerUserVeterinary()}
        isLoading={isLoadiaing}
      >
        <SaveIcon />
      </Button>
    </>
  );
};
