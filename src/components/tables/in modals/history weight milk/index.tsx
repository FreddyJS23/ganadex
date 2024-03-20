import { headerServices } from '@/collections/headerColums';
import { ResponsePesajesLeche } from '@/types';

export const TableHistoryWeightMilk = ({
    pesajes_leche,
}: ResponsePesajesLeche) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerServices.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pesajes_leche.map(({ id, fecha, pesaje }) => (
                        <tr key={id}>
                            <td>{typeof fecha == 'string' ? fecha : ''} </td>
                            <td>{pesaje} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
