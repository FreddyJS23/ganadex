import { headerServicesBull } from '@/collections/headerColums';
import { RedirectInTable } from '@/components/redirectsInTables';
import { ResponseServiciosToro } from '@/types';

export const TableHistoryServicesBull = ({ servicios }: ResponseServiciosToro) => {

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerServicesBull.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio) => (
                        <tr key={servicio.id}>
                            <td>
                                {typeof servicio.fecha == 'string'
                                    ? servicio.fecha
                                    : ''}{' '}
                            </td>
                            <td>{servicio.observacion}</td>
                            <td> <RedirectInTable label={servicio.vaca.numero} id={servicio.vaca.id} redirect='toros'/></td>
                           <td>{servicio.veterinario.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
