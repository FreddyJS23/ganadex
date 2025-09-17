"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {
  ERROR_CORS,
  ERROR_SERVER,
  ERROR_SIGNIN,
} from "@/constants/responseApiMessage";
import { ResponseErrorNext, ResponseLoginAuthJs } from "@/types";

export async function authenticate(
  formData: FormData,
): Promise<ResponseLoginAuthJs | ResponseErrorNext > {
  try {
    await signIn("credentials", {
      usuario: formData.get("usuario"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (isRedirectError(error)) {
      /* Borrar cookies iniciales, ya que al hacer login se guardan nuevas cookies
             enviadas por el backend en la session de authjs, es inncesario tener las cookies antiguas */
      cookies().delete("laravel_session");
      cookies().delete("xsrf_token");

      return {
        login: true,
        message: "Credenciales correctas",
        redirect: "/hacienda",
      };
    }
    if (error instanceof AuthError) {
      const regexMessageErrors = new RegExp(
        `${ERROR_SERVER}|${ERROR_SIGNIN}|${ERROR_CORS}`,
      );
      const messageError = error.message.match(
        regexMessageErrors,
      ) as unknown as string;
      if (messageError){

        if(messageError[0] == ERROR_SERVER) return { error: { message: messageError[0], status: 500 } };
        if(messageError[0] == ERROR_SIGNIN ) return { error: { message: messageError[0], status: 401 } };
        if(messageError[0] == ERROR_CORS)  return { error: { message: messageError[0], status: 403 } };
      } 
      
    }
  }
  return { error: { message: "Error", status: 500 } };
}
