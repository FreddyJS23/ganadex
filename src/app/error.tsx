'use client'; // Error components must be Client Components

import { deleteSession } from '@/actions/deleteSession';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
    const [codeError, setCodeError] = useState(0);

    useEffect(() => {
        //number or NAN
        const statusCode = parseInt(error.message.split(' ')[0]);
        setCodeError(isNaN(statusCode) ? 0 : statusCode);
        console.log(error);
    }, [error]);

    return (
        <div>
            {codeError == 0 && <h2>Error inesperado</h2>}
            {codeError == 401 && (
                <h2>Sesión expirada, por favor vuelva a iniciar sesión</h2>
            )}
            {codeError == 403 && <h2>No autorizado</h2>}
            {codeError == 404 && <h2>No encontrado</h2>}
            {codeError == 500 && <h2>Error del servidor</h2>}

            <Link href="/">Volver a inicio</Link>
        </div>
    );
}
