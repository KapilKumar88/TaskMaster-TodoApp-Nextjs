import { auth } from "@/auth";
import Unauthorized from "@/components/common/unauthorized";
import { TodoList } from "@/components/dashboard/todo-list";
import { getTaskByStatusOfCurrentWeek } from "@/services/task.service";
import { TaskStatus } from "@prisma/client";

export default async function CompletedTask() {
  const userSession = await auth();

  if (userSession === null) {
    return <Unauthorized />;
  }

  const taskList = await getTaskByStatusOfCurrentWeek(
    userSession?.user.id,
    TaskStatus.COMPLETED
  );
  return <TodoList tasks={taskList} />;
}
