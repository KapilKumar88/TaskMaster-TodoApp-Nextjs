import { TodoList } from '@/components/dashboard/todo-list';
import { getTaskListOfGivenPeriod } from '@/services/task.service';
import { auth } from '@/auth';
import Unauthorized from '@/components/common/unauthorized';
import { getDefaultDateTime } from '@/lib/utils';

export default async function Task() {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }
  const defaultDates = getDefaultDateTime();
  const importantTaskList = await getTaskListOfGivenPeriod({
    userId: userSession?.user.id,
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate,
    fetchImportantTasks: true,
  });

  return <TodoList tasks={importantTaskList} />;
}
