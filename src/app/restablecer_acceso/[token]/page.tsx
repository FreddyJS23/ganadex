import { NewPasswordRecovery } from "@/components/forms/new password recovery";
import { PreguntasSeguridad } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ParamsPage = {
  params: { token: string };
};

export default async function Page({ params }: ParamsPage) {
  const { token } = params;

  const questionsSecurityCookie = cookies().get("preguntas")?.value;

  /* redireccionar si no se encuentra la cookie */
  if (!questionsSecurityCookie) {
    return redirect("/login");
  }

  const preguntas: PreguntasSeguridad[] = JSON.parse(questionsSecurityCookie);

  return (
    <section className="flex min-h-screen">
      <article className="flex flex-col gap-4 sm:bg-base-100 p-8 w-full max-w-lg rounded-lg m-auto ">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-2xl">Restablecer contraseña</h1>
          <p className="text-sm">
            Responda las preguntas para recuperar la contraseña
          </p>
        </div>
        <NewPasswordRecovery token={token} preguntas={preguntas} />
      </article>
    </section>
  );
}
