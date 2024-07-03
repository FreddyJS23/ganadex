'use client';

import IconBackup from '@/icons/icono-descargar.svg';
import { toast } from 'sonner';

export const ButtonBackupBd = () => {
    const generateBackup = async () => {
        try {
            const getFile = await fetch(`/api/backup`);
            toast.success(`Generando respaldo...`);
            const file = await getFile.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(file as Blob);
            link.download = `backup.zip`;
            link.click();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    };

    return (
        <button onClick={() => generateBackup()}>
            <IconBackup className={'size-8'} />
        </button>
    );
};
