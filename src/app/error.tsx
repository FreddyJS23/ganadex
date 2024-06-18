'use client'; // Error components must be Client Components

import { useEffect } from 'react';

interface Props {
    error: Error & { digest?: string };

    /** To recover by trying to re-render the segment */
    reset: () => void;
}

export default function Error({ error, reset }: Props) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={reset}>Try again</button>
        </div>
    );
}
