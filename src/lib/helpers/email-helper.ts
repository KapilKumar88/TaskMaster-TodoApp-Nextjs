'use server';
import 'server-only';
import { encryptHelper, generateRandomToken } from './server-helper-fn';
import moment from 'moment';
import { updateEmailVerificationToken } from '@/services/user.service';
import sendMail from '../nodemailer';
import WelcomeEmailHtmlTemplate from '@/components/email-templates/welcome-email-template';
import serverSideConfig from '@/config/server.config';
import EmailVerificationMailHtmlTemplate from '@/components/email-templates/email-verification-template';

export const welcomeEmail = async (username: string, email: string) => {
  try {
    const templateStr = await WelcomeEmailHtmlTemplate(username, email);

    return sendMail(email, 'Welcome Email', templateStr);
  } catch (error) {
    console.error(
      'Internal server error in Welcome Email function',
      (error as Error)?.message,
    );
    return false;
  }
};

export const sendVerificationEmail = async (
  userId: string,
  email: string,
  username: string,
) => {
  try {
    const randomToken = await generateRandomToken();
    const expiryTime = moment().add(60, 'm').unix();
    const encryptedObject = await encryptHelper(
      JSON.stringify({
        token: randomToken,
        expiryTime: expiryTime,
        userId: userId,
      }),
    );

    await updateEmailVerificationToken(randomToken, userId);

    const templateStr = await EmailVerificationMailHtmlTemplate({
      userName: username,
      verificationLink: `${serverSideConfig.APP_URL}/email-verification?token=${encryptedObject}`,
    });

    return sendMail(email, 'Verification Email', templateStr);
  } catch (error) {
    console.error(
      'Internal server error in sendVerificationEmail',
      (error as Error)?.message,
    );
    return false;
  }
};
