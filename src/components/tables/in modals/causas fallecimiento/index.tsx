import { headerCausaFallecimiento } from "@/collections/headerColums";
import { ResponseCausasFallecimiento } from "@/types";
import IconEdit from "@/icons/icono-editar.svg";
import Link from "next/link";

export const TableCausasFallecimiento = ({
  causas_fallecimiento,
}: ResponseCausasFallecimiento) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headerCausaFallecimiento.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {causas_fallecimiento.map(({ id, causa }) => (
            <tr key={id}>
              <td>{causa} </td>
              <td>
                <Link href={`/fallecimientos/causa/actualizar/${id}`}>
                  <IconEdit className="size-6" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
