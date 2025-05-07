import 'server-only';
import { Task } from '@prisma/client';
import { sendDueTaskEmailNotification } from '@/lib/helpers/email-helper';
import { EMAIL_NOTIFICATION_TEMPLATE } from '@/lib/enums';
import admin from '@/lib/firebase/firebase-admin';
import serverSideConfig from '@/config/server.config';

export const fcmNotification = (
  userFCMToken: string,
  taskList: Array<Task>,
) => {
  if (userFCMToken) {
    for (const task of taskList) {
      console.log(task, 'task');
      admin.messaging().send({
        token: userFCMToken,
        notification: {
          title: task.title,
          body: task.description,
        },
        data: {
          link: `${serverSideConfig.APP_URL}/dashboard`,
          taskId: task.id?.toString(),
        },
      });
    }
    return true;
  }
  return false;
};

export const emailNotification = async (
  userEmail: string,
  userName: string,
  task: Task & { category: { name: string } },
  mailTemplate: EMAIL_NOTIFICATION_TEMPLATE,
) => {
  if (mailTemplate === EMAIL_NOTIFICATION_TEMPLATE.TASK_DUE) {
    return await sendDueTaskEmailNotification(userEmail, userName, [task]);
  }
  return false;
};
