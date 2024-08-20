'use client'; // Error components must be Client Components

import { deleteSession } from '@/actions/deleteSession';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [codeError, setCodeError] = useState(0);

    useEffect(() => {
        // Log the error to an error reporting service
        const codeStatusError = error.message.split(
            ' ',
        )[2] as unknown as number;
        deleteSession();
        setCodeError(codeStatusError);
    }, [error]);

    return (
        <div>
            {codeError == 401 ? (
                <h2>Sesión expirada, por favor vuelva a iniciar sesión</h2>
            ) : (
                <h2>Error inesperado</h2>
            )}
            <p>Error {codeError}, {codeError == 401 && 'redireccionando...'}</p>
            {codeError != 401 && <Link href="/">Volver a inicio</Link>}
        </div>
    );
}
