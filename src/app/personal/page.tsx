import { TableStaff } from '@/components/tables/staff';
import { ResponseTodoPersonal } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { todo_personal }: ResponseTodoPersonal = await getData(
        'todosPersonal',
    );
    return (
        <section>
            <TitlePage title="Personal" />
            <TableStaff todo_personal={todo_personal} />
        </section>
    );
}
