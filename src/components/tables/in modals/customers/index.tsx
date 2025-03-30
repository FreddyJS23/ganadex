import { headerCustomers } from "@/collections/headerColums";
import { ResponseCompradores } from "@/types";

export const TableCustomers = ({ compradores }: ResponseCompradores) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headerCustomers.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compradores.map(({ id, nombre }) => (
            <tr key={id}>
              <td>{nombre} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
