import { headerTypeCheck } from "@/collections/headerColums";
import { ResponseTiposRevision } from "@/types";
import IconEdit from "@/icons/icono-editar.svg";
import Link from "next/link";

export const TableTypeCheck = ({ tipos_revision }: ResponseTiposRevision) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headerTypeCheck.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tipos_revision.map(({ id, tipo, codigo }) => (
            <tr key={id}>
              <td>
                <div>
                  {
                    /* tiene diagnostico pero no tiene codigo */
                    !codigo ? (
                      tipo
                    ) : (
                      /* diagnostico tiene codigo */
                      <div className="flex flex-col gap">
                        <span className="text-primary font-bold">{codigo}</span>
                        <span className="">{tipo}</span>
                      </div>
                    )
                  }
                </div>
              </td>
              {tipo != "Gestación" &&
                tipo != "Descartar" &&
                tipo != "Rutina" &&
                tipo != "Aborto" && (
                  <td>
                    <Link href={`/revisiones/tipo/actualizar/${id}`}>
                      <IconEdit className="size-6" />
                    </Link>
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
