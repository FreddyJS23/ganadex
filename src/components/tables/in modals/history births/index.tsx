import { headerBirths } from '@/collections/headerColums';
import {  ResponsePartos } from '@/types';
import IconSearch from '@/icons/icono-Revisar.svg';

export const TableHistoryBirths = ({ partos }: ResponsePartos) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {headerBirths.map(({ label }) => (
                            <th key={label}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {partos.map(({ id,fecha,observacion }) => (
                        <tr key={id}>
                            <td>{fecha.toISOString()} </td>
                            <td>{observacion} </td>
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
