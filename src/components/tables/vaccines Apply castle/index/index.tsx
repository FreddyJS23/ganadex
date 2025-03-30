import { headerHistoryVaccinesApply } from "@/collections/headerColums";
import { AplicacionVacunaHistorial } from "@/types";
import React from "react";

export const VaccinesAppliedCastle = ({
  vacunaciones,
}: { vacunaciones: AplicacionVacunaHistorial[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table text-neutral-content">
        <thead>
          <tr>
            {headerHistoryVaccinesApply.map(({ label }) => (
              <th
                className={"text-lg font-bold text-neutral-content"}
                key={label}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vacunaciones.map(
            ({ cantidad, prox_dosis, ultima_dosis, vacuna }, index) => (
              <tr key={index}>
                <td>{vacuna} </td>
                <td>{cantidad}</td>
                <td>{ultima_dosis}</td>
                <td>{prox_dosis}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};
