import { TodoList } from "@/components/dashboard/todo-list";
import { getImportantTaskListOfCurrentWeek } from "@/services/task.service";
import { auth } from "@/auth";
import Unauthorized from "@/components/common/unauthorized";

export default async function Task() {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }
  
  const importantTaskList = await getImportantTaskListOfCurrentWeek(
    userSession?.user.id
  );
  return <TodoList tasks={importantTaskList} />;
}
