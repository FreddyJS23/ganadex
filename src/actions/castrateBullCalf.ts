"use serve";

import { ResponseErrorNext } from "@/types";
/* import { submitForm } from '@/utils/submitForm';
 */
export async function castrateBullCalf(/*  id: number, */): Promise<
  void | ResponseErrorNext | undefined
> {
  /*     const response = await submitForm<number,void>('caparCria', 'GET', undefined, id); */
  return { error: { message: "disable", status: 404 } };
}
