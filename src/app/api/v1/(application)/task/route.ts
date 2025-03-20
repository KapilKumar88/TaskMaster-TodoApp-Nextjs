import { auth } from "@/auth";
import { sendResponse } from "@/lib/utils";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return sendResponse({
      status: "error",
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  return sendResponse({
    data: [],
    message: "Data retrieved successfully",
  });
});
