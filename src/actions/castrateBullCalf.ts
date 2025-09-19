"use serve";

import { ResponseErrorNext } from "@/types";
/* import { submitForm } from '@/utils/submitForm';
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function castrateBullCalf(  id: number, ): Promise<
  void | ResponseErrorNext | undefined
> {
  /*     const response = await submitForm<number,void>('caparCria', 'GET', undefined, id); */
  
  return { error: { message: "disable", status: 404 } };
}
