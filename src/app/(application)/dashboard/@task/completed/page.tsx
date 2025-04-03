import { auth } from '@/auth';
import Unauthorized from '@/components/common/unauthorized';
import { TodoList } from '@/components/dashboard/todo-list';
import { getDefaultDateTime } from '@/lib/utils';
import { getImportantTaskListOfGivenPeriod } from '@/services/task.service';
import { TaskStatus } from '@prisma/client';

export default async function CompletedTask() {
  const userSession = await auth();

  if (userSession === null) {
    return <Unauthorized />;
  }

  const defaultDates = getDefaultDateTime();
  const taskList = await getImportantTaskListOfGivenPeriod({
    userId: userSession?.user.id,
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate,
    status: TaskStatus.COMPLETED,
  });

  return <TodoList tasks={taskList} />;
}
