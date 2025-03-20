import { auth } from "@/auth";
import { sendResponse } from "@/lib/utils";
import { getUserTaskList } from "@/services/task.service";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return sendResponse({
      status: "error",
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('filter')

  const taskList = await getUserTaskList({
    userId: req.auth.user.id,
    filter: query
  });

  return sendResponse({
    data: taskList,
    message: "Data retrieved successfully",
  });
});
