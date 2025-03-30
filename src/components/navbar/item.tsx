"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export const NameHacienda = () => {
  useEffect(() => {
    /* Llamar a la sesion para que el status el hook useSession se actualice y pase a authenticated,
    si no se hace esto el state queda en unauthenticated no pudiendo leer la sesion*/
    const fetchSession = async () => await getSession();

    fetchSession();
  }, []);

  const hacienda = useSession().data?.user.hacienda?.nombre;
  const transformNameHacienda = () => {
    /* habra veces que el nombre de hacienda que guarden
         no inicie con hacienda, por eso se agrega */
    if (hacienda?.startsWith("Hacienda")) return hacienda;
    else if (!hacienda) return "Sin sesión en hacienda";
    else return `Hacienda ${hacienda}`;
  };

  return (
    <span className="font-bold text-xl mt-1">{transformNameHacienda()}</span>
  );
};
