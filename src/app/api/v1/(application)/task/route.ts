import { auth } from '@/auth';
import { sendResponse } from '@/lib/utils';
import { getUserTaskList } from '@/services/task.service';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
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
    const sortBy = searchParams.get('sort') ?? 'dueDateTime';
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
  } catch (error) {
    return sendResponse({
      status: 'error',
      statusCode: 500,
      message: (error as Error)?.message ?? 'Internal Server Error',
    });
  }
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
