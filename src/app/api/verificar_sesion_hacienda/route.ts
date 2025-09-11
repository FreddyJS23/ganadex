import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function GET(): Promise<NextResponse> {
  const session = (await auth()) as Session;
  const rol = session.user.rol;
  revalidatePath("/", "layout");
  revalidatePath("/dashboard", "layout");
  if (rol == "admin") return redirect("/dashboard", RedirectType.push);
  else if (rol == "veterinario") return redirect("/ganado");

  return NextResponse.json(
    { message: "No se ha podido verificar la sesion" },
    { status: 500 },
  );
}
