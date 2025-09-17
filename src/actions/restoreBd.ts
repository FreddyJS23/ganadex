"use serve";

import { RestoreLastBackup } from "@/services/restoreBd";
import { ResponseErrorNext } from "@/types";

export async function restoreBd(): Promise<void | ResponseErrorNext | undefined> {
  try {
    await RestoreLastBackup();
  } catch (error) {
    const { message } = error as Error;
    return { error: { message: message, status: 500 } };
  }
}
