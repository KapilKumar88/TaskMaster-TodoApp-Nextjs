import serverSideConfig from '@/config/server.config';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: serverSideConfig.MAIL.MAIL_HOST,
  auth: {
    user: serverSideConfig.MAIL.MAIL_USERNAME,
    pass: serverSideConfig.MAIL.MAIL_PASSWORD,
  },
  // debug: serverSideConfig.NODE_ENV !== 'production',
  // logger: serverSideConfig.NODE_ENV !== 'production',
  port: parseInt(serverSideConfig.MAIL.MAIL_PORT),
  secure: serverSideConfig.MAIL.MAIL_SECURE === 'true',
});

export default async function sendMail(
  to: string | string[],
  subject: string,
  html: string,
  bcc: string | string[] = [],
  cc: string | string[] = [],
  attachments: Mail.Attachment[] = [],
): Promise<boolean> {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: serverSideConfig.MAIL.MAIL_FROM_ADDRESS,
      to,
      cc,
      bcc,
      subject,
      html,
      attachments,
    });

    return !!info.messageId;
  } catch (error) {
    console.error(
      `Error in sendmail function | ErrorCode: 500`,
      (error as { message: string })?.message,
    );
    return false;
  }
}
