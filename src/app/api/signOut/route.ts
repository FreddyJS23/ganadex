import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { signOut as signOutAuthJs } from "@/auth";
import { signOutApi } from "@/services/signOutApi";

export async function GET(): Promise<NextResponse> {
  try {
    await signOutApi();
  } catch (error) {
    console.error("Error al cerrar sesión en el servidor:");
  }

  await signOutAuthJs({ redirect: false });

  return redirect("/login");
}
