'use serve';

import { RestoreLastBackup } from '@/services/restoreBd';
import { ResponseError } from '@/types';

export async function restoreBd(): Promise<void | ResponseError | undefined> {
    try {
        await RestoreLastBackup();
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
