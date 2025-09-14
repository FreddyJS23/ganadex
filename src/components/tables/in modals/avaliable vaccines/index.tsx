import { headerVaccines } from "@/collections/headerColums";
import { ModalCreateEditVaccine } from "@/components/modals/create-edit Vaccine";
import ButtonEdit from "@/ui/ButtonEdit";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Vaccine } from "@/types";


export const TableAvailableVaccines = ({
  vacunas,
}: { vacunas: Vaccine[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVaccine, setSelectedVaccine] =
    useState<Vaccine | null>(null);

  const handleEditClick = (vaccine: Vaccine) => {
    setSelectedVaccine(vaccine);
    onOpen();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headerVaccines.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vacunas.map((vaccine) => (
            <tr key={vaccine.id}>
              <td>{vaccine.nombre}</td>
              <td>
                {vaccine.tipo_vacuna == "medica" ? "Médica" : "Plan sanitario"}
              </td>
              <td>
                <ButtonEdit onEdit={() => handleEditClick(vaccine)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedVaccine && (
        <ModalCreateEditVaccine
          isOpen={isOpen}
          onClose={onClose}
          id={selectedVaccine?.id}
          type="update"
          vaccine={selectedVaccine}
        />
      )}
    </div>
  );
};
