import { auth } from "@/app/auth";
import { handleResponse } from "@/utils/handleResponseApi";
import { Session } from "next-auth";

export async function signOutApi() {
  const url = process.env.API_URL + "logout";
  const session = (await auth()) as Session;

  const { user } = session;

  /*  const {token,cookieCsrf}=user */
  const { token } = user;

  const optionFetch: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: process.env.ORIGIN,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };
  try {
    const response = await fetch(url, optionFetch);
    const { data, status } = await handleResponse(response);
    if (status == 200) {
      return status;
    } else if (status == 422 || status == 401 || status == 500)
      throw { status: status, data: data };
  } catch (e) {
    console.log(e);
    throw "Error";
  }
}
