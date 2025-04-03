import { auth } from '@/auth';
import { sendResponse } from '@/lib/utils';
import { getUserTaskList } from '@/services/task.service';

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return sendResponse({
      status: 'error',
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('filter');
  const pageNumber = searchParams.get('page');
  const pageLimit = searchParams.get('limit');

  const taskList = await getUserTaskList({
    userId: req.auth.user.id,
    filter: query,
    pageNumber: parseInt(pageNumber ?? '1'),
    pageLimit: parseInt(pageLimit ?? '10'),
  });

  return sendResponse({
    data: taskList,
    message: 'Data retrieved successfully',
  });
});

export const PATCH = auth(async function PATCH(req) {
  if (!req.auth) {
    return sendResponse({
      status: 'error',
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const bodyData = req.body;

  console.log(bodyData);

  return sendResponse({
    data: [],
    message: 'Task updated successfully',
  });
});
