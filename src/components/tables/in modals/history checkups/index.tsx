import { headerCheckups } from '@/collections/headerColums';
import { ResponseRevisiones } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';

export const TableHistoryCheckUps = ({ revisioness }: ResponseRevisiones) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerCheckups.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {revisioness.map(({ id, fecha, diagnostico }) => (
                        <tr key={id}>
                            <td>{fecha.toISOString()} </td>
                            <td>{diagnostico} </td>
                            <td>
                                <IconSearch className={'size-8 '} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
