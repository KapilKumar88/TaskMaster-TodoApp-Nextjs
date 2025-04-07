import { auth } from '@/auth';
import Unauthorized from '@/components/common/unauthorized';
import { TodoList } from '@/components/dashboard/todo-list';
import { getDefaultDateTime } from '@/lib/utils';
import { getTaskListOfGivenPeriod } from '@/services/task.service';
import { TaskStatus } from '@prisma/client';

export default async function ActiveTask() {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }

  const defaultDates = getDefaultDateTime();
  const taskList = await getTaskListOfGivenPeriod({
    userId: userSession?.user.id,
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate,
    status: TaskStatus.OVERDUE,
  });

  return <TodoList tasks={taskList} />;
}
