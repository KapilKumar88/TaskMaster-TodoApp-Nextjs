'use server';
import 'server-only';
import sendMail from '../nodemailer';
import WelcomeEmailHtmlTemplate from '@/components/email-templates/welcome-email-template';

export const welcomeEmail = async (username: string, email: string) => {
  try {
    const templateStr = await WelcomeEmailHtmlTemplate(username, email);

    return sendMail(email, 'Welcome Email', templateStr);
  } catch (error) {
    console.error('Internal server error in Welcome Email function', error);
    return false;
  }
};
