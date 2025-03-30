import { headerBirths } from "@/collections/headerColums";
import { ResponsePartos } from "@/types";
import IconSearch from "@/icons/icono-Revisar.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const TableHistoryBirths = ({ partos }: ResponsePartos) => {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headerBirths.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {partos.map((parto) => (
            <tr key={parto.id}>
              <td>{typeof parto.fecha == "string" ? parto.fecha : ""} </td>
              <td>{parto.observacion} </td>
              <td>
                <Link href={`${pathname}/ver/${parto.id}`}>
                  <IconSearch className={"size-8 cursor-pointer "} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
