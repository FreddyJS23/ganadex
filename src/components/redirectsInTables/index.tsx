import Link from "next/link";
import IconRedirect from "@/icons/icono-redireccionar.svg";

type RedirectInTable = {
  label: number | string | null;
  id: number | string;
  redirect: "ganado" | "toros" | "ganado_descarte";
};

export const RedirectInTable = ({ id, label, redirect }: RedirectInTable) => {
  return (
    <div className="flex gap-2">
      <span>{label}</span>
      <Link href={`/${redirect}/${id}`}>
        <IconRedirect className="size-5" />
      </Link>
    </div>
  );
};
