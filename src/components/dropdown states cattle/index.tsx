import { EstadosGanado } from '@/types';

export const DropdownStatesCattle = ({
    estados,
}: {
    estados: EstadosGanado[];
}) => {
    const estado1 = estados.length >= 1 && estados[0];
    const estado2 = estados.length >= 2 && estados[1];
    return (
        <div className="flex flex-wrap gap-1 max-w-md">
            {estado1 && (
                <span className="badge badge-primary text-xs  capitalize">
                    {estado1.estado.replace('_', ' ')}
                </span>
            )}
            {estado2 && (
                <span className="badge badge-primary text-xs  capitalize">
                    {estado2.estado.replace('_', ' ')}
                </span>
            )}

            {estados.length >= 3 && (
                <div className="dropdown dropdown-hover dropdown-left">
                    <div tabIndex={0} role="button" className="badge">
                        Ver todos
                    </div>
                    <div
                        tabIndex={0}
                        className="dropdown-content z-[1] p-4 shadow bg-base-100 flex flex-wrap gap-2 rounded-box w-72"
                    >
                        {estados.map(({ id, estado }) => (
                            <span
                                className="badge badge-primary text-xs capitalize"
                                key={id}
                            >
                                {estado.replaceAll('_', ' ')}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
