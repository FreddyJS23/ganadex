'use serve';

import { endpointsReports } from '@/collections/endPointsApi';
import { ResponseError } from '@/types';
import {  YearToReports } from '@/types/forms';

export async function generateReportsYear(
    formData: YearToReports,
    report: keyof typeof endpointsReports,
): Promise<Blob | ResponseError | undefined> {
    try {
        const file = await fetch(
            `http://localhost:3000/api/reportes_anual/${report}?year=${formData.year}`,
        );
        if (file.status == 200) return await file.blob();
        else throw (file) ?? 'error';
    
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
