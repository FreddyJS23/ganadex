import { headerCheckups } from "@/collections/headerColums";
import { ResponseRevisiones } from "@/types";
import IconSearch from "@/icons/icono-Revisar.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TableHistoryCheckUps = ({ revisiones }: ResponseRevisiones) => {
  const pathname = usePathname();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {headerCheckups.map(({ label }) => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {revisiones.map((revision) => (
              <tr key={revision.id}>
                <td>
                  {typeof revision.fecha == "string" ? revision.fecha : ""}{" "}
                </td>
                <td>
                  <div>
                    {
                      /* diagnostico desconocido  */
                      typeof revision?.diagnostico == "string" ? (
                        revision?.diagnostico
                      ) : /* tiene diagnostico pero no tiene codigo */
                      !revision?.diagnostico.codigo ? (
                        revision?.diagnostico.tipo
                      ) : (
                        /* diagnostico tiene codigo */
                        <div className="flex flex-col gap">
                          <span className="text-primary font-bold">
                            {revision?.diagnostico.codigo}
                          </span>
                          <span className="">{revision?.diagnostico.tipo}</span>
                        </div>
                      )
                    }
                  </div>
                </td>
                <td>
                  <Link href={`${pathname}/ver/${revision.id}`}>
                    <IconSearch className={"size-8 cursor-pointer "} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
