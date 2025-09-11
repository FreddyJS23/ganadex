import { Button } from "@nextui-org/react";
import IconEdit from "@/icons/icono-editar.svg";

const ButtonEdit = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <Button
      isIconOnly={true}
      aria-label="Guardar"
      variant="flat"
      size="sm"
      title={`Editar`}
      onClick={onEdit}
    >
      <IconEdit className="size-6" />
    </Button>
  );
};

export default ButtonEdit;
