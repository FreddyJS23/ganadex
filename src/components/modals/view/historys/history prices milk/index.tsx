import { LayoutModal } from "../..";
import { ModalProps, PreciosDeLeche } from "@/types";
import { TableHistoryPriceMilk } from "@/components/tables/in modals/history price milk";
import { ContainerTableHistory } from "..";

export const ModalHistoryMilk = ({
  isOpen,
  onOpen,
  onOpenChange,
  precios,
}: ModalProps & { precios: PreciosDeLeche[] }) => {
  return (
    <LayoutModal
      icon="price"
      titleModal={"Historial de precio de la leche"}
      footer={false}
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <ContainerTableHistory>
        <TableHistoryPriceMilk precios={precios} />
      </ContainerTableHistory>
    </LayoutModal>
  );
};
