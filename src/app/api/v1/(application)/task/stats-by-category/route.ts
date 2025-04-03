import { auth } from '@/auth';
import { sendResponse } from '@/lib/utils';
import { allCategoryTaskCount } from '@/services/category.service';

export async function GET() {
  const userSession = await auth();
  if (!userSession) {
    return sendResponse({
      status: 'error',
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const getData = await allCategoryTaskCount(userSession.user.id);

  return sendResponse({
    data: getData,
    message: 'Data retrieved successfully',
  });
}

// export const GET = auth(async function GET(req) {
//   if (!req.auth) {
//     return sendResponse({
//       status: 'error',
//       statusCode: 401,
//       message: 'Unauthorized',
//     });
//   }

//   const getData = await allCategoryTaskCount(req.auth.user.id);

//   return sendResponse({
//     data: getData,
//     message: 'Data retrieved successfully',
//   });
// });
