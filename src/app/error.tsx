"use client"; // Error components must be Client Components

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  ERROR_401,
  ERROR_404,
  ERROR_419,
  ERROR_500,
} from "@/constants/responseApiMessage";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error: errorProp }: ErrorProps) {
  const [error, setError] = useState<{
    code: number;
    nameError: string;
    message: string;
  }>({
    code: 0,
    nameError: "",
    message: "",
  });

  useEffect(() => {
    console.log(errorProp);
    //number or NAN
    if (errorProp.message == ERROR_401)
      setError({
        code: 401,
        nameError: ERROR_401,
        message:
          "Al parecer no tienes los privilegios suficientes para realizar esta acción",
      });
    else if (errorProp.message == ERROR_404)
      setError({
        code: 404,
        nameError: ERROR_404,
        message: "Al parecer el recurso solicitado no existe o fue eliminado",
      });
    else if (errorProp.message == ERROR_419)
      setError({
        code: 419,
        nameError: ERROR_419,
        message: "Por favor, vuelva a iniciar sesión",
      });
    else if (errorProp.message == ERROR_500)
      setError({
        code: 500,
        nameError: ERROR_500,
        message:
          "La comunicación con el servidor ha fallado, por favor intenta nuevamente",
      });
    /* En caso que no sea un error conocido del backend, el error producido probablemente sea del lado del frontend */ else
      setError({
        code: 500,
        nameError: "Error inesperado",
        message: "Por favor vuelva intentarlo, de persistir vuelva al inicio",
      });
  }, [errorProp]);

  /*     <Link href="/">Volver a inicio</Link>
   */ return (
    <section className="flex h-screen m-auto">
      <article className="flex gap-3 m-auto">
        {/* codigo */}
        <div className="text-8xl font-black text-red-600">{error.code}</div>

        <div className="flex flex-col gap-3">
          {/* titulo */}
          <div className="flex gap-1 items-center">
            <Iconwarning />
            <span className="text-2xl font-bold ">
              {capitalizeFirstLetter(error.nameError)}
            </span>
          </div>
          {/* conetent */}
          <span className="text-xl opacity-80">{error.message}</span>
          {/* botones */}
          <div className="flex gap-3">
            {error.code != 419 ? (
              <Button color="primary" size="md" as={Link} href="/">
                Volver a inicio
              </Button>
            ) : (
              <Button color="primary" size="md" onClick={() => signOut()}>
                Volver a inicio
              </Button>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}

const Iconwarning = () => {
  return (
    <svg
      viewBox="0 0 30 31"
      width={30}
      height={31}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6571 19.7461C13.6571 19.5687 13.6921 19.3929 13.7604 19.2291C13.8288 19.0651 13.9288 18.9165 14.0549 18.7915C14.181 18.6666 14.3307 18.5679 14.4951 18.501C14.6596 18.4342 14.8355 18.4006 15.0131 18.4021C15.2749 18.4069 15.5296 18.4887 15.7452 18.6373C15.9607 18.786 16.1279 18.9951 16.2253 19.2381C16.3229 19.4812 16.3464 19.7476 16.2934 20.004C16.2402 20.2605 16.1127 20.4955 15.9267 20.68C15.7407 20.8643 15.5045 20.9897 15.2476 21.0406C14.9907 21.0915 14.7244 21.0654 14.4822 20.9657C14.2399 20.8661 14.0326 20.6973 13.8858 20.4803C13.7391 20.2635 13.6595 20.0081 13.6571 19.7461ZM14.089 16.4701L13.921 10.2062C13.905 10.0556 13.921 9.90333 13.9678 9.75931C14.0145 9.61527 14.0909 9.48266 14.1922 9.3701C14.2935 9.25753 14.4173 9.16753 14.5555 9.10591C14.6939 9.0443 14.8437 9.01245 14.995 9.01245C15.1464 9.01245 15.2962 9.0443 15.4345 9.10591C15.5728 9.16753 15.6966 9.25753 15.7979 9.3701C15.8992 9.48266 15.9756 9.61527 16.0223 9.75931C16.0691 9.90333 16.0851 10.0556 16.0691 10.2062L15.9131 16.4701C15.9131 16.7119 15.8171 16.944 15.646 17.115C15.475 17.286 15.2429 17.3821 15.0011 17.3821C14.7592 17.3821 14.5272 17.286 14.3562 17.115C14.1852 16.944 14.089 16.7119 14.089 16.4701Z"
        fill="#dc2626 "
      />
      <path
        d="M15 26.1661C21.1303 26.1661 26.1 21.1964 26.1 15.0661C26.1 8.93571 21.1303 3.96606 15 3.96606C8.86967 3.96606 3.90002 8.93571 3.90002 15.0661C3.90002 21.1964 8.86967 26.1661 15 26.1661Z"
        stroke="#dc2626"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
