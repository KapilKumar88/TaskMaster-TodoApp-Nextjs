import { auth } from '@/auth';
import { sendResponse } from '@/lib/utils';
import { getUserTaskList } from '@/services/task.service';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const userSession = await auth();
  if (!userSession) {
    return sendResponse({
      status: 'error',
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('filter') ?? 'all';
  const status = (searchParams.get('status') as TaskStatus) ?? 'all';
  const priority = (searchParams.get('priority') as TaskPriority) ?? 'all';
  const sortBy = searchParams.get('sort') ?? 'dueDate';
  const sortOrder = searchParams.get('order') ?? 'asc';
  const pageNumber = searchParams.get('page');
  const pageLimit = searchParams.get('limit');

  const taskList = await getUserTaskList({
    userId: userSession.user.id,
    filter: query,
    pageNumber: parseInt(pageNumber ?? '1'),
    pageLimit: parseInt(pageLimit ?? '10'),
    status,
    priority,
    sortBy,
    sortOrder,
  });

  return sendResponse({
    data: taskList,
    message: 'Data retrieved successfully',
  });
}

// export const GET = auth(async function GET(req, ) {
//   if (!req.auth) {
//     return sendResponse({
//       status: 'error',
//       statusCode: 401,
//       message: 'Unauthorized',
//     });
//   }

//   const searchParams = req.nextUrl.searchParams;
//   const query = searchParams.get('filter') ?? "";
//   const pageNumber = searchParams.get('page');
//   const pageLimit = searchParams.get('limit');

//   const taskList = await getUserTaskList({
//     userId: req.auth.user.id,
//     filter: query,
//     pageNumber: parseInt(pageNumber ?? '1'),
//     pageLimit: parseInt(pageLimit ?? '10'),
//   });

//   return sendResponse({
//     data: taskList,
//     message: 'Data retrieved successfully',
//   });
// });
