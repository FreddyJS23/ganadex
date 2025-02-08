import { ModalLogsVeterinary } from "@/components/modals/logs veterinary";
import { ResponseLogsVeterinary } from "@/types";
import { getData } from "@/utils/getData";

type ParamsPage = {
    params: { id: number };
};


export default async function Page({params}:ParamsPage) {
   
    const { logs }: ResponseLogsVeterinary = await getData(
        'logsVeterinario',
        'GET',
        undefined,
        params.id,
    );

    return (
        <>
        <ModalLogsVeterinary logs_veterinario={logs} />
        </>
    );
}