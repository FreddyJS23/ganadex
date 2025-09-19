import { headerHistoryVaccines } from "@/collections/headerColums";
import { Vacuna } from "@/types";

export const TableHistoryVaccines = ({ vacunas }: { vacunas: Vacuna[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headerHistoryVaccines.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vacunas.map(({ id, fecha, nombre, prox_dosis }) => (
            <tr key={id}>
              <td>{nombre}</td>
              <td>{fecha}</td>
              <td>{prox_dosis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
