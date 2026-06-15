import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  render,
  Section,
  Text,
} from '@react-email/components';
import EmailTemplateAppLogo from './email-template-app-logo';
import serverSideConfig from '@/config/server.config';
import { emailStyles } from './email-styles';

interface ForgotPasswordEmailProps {
  username: string;
  userEmail: string;
  resetLink: string;
}

const ForgotPasswordEmail = ({
  username,
  userEmail,
  resetLink,
}: ForgotPasswordEmailProps) => {
  const previewText = `Reset your ${serverSideConfig.APP_NAME} password`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <EmailTemplateAppLogo />
          <Heading style={emailStyles.heading}>Reset Your Password</Heading>
          <Text style={emailStyles.paragraph}>Hi {username},</Text>
          <Text style={emailStyles.paragraph}>
            We received a request to reset your password for your{' '}
            {serverSideConfig.APP_NAME} account. Click the button below to reset
            it. This link is only valid for 60 minutes.
          </Text>

          <Section style={emailStyles.buttonContainer}>
            <Button style={emailStyles.button} href={resetLink}>
              Reset Password
            </Button>
          </Section>

          <Text style={emailStyles.paragraph}>
            If you didn&apos;t request a password reset, you can safely ignore
            this email. Your password will not be changed.
          </Text>

          <Text style={emailStyles.paragraph}>
            For security reasons, this password reset link will expire in 60
            minutes. If you need a new link, you can request another password
            reset.
          </Text>

          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>
            This email was sent to {userEmail} because of a password reset
            request for your {serverSideConfig.APP_NAME} account. This is a
            mandatory service email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default async function ForgotPasswordEmailHtmlTemplate({
  username,
  userEmail,
  resetLink,
}: ForgotPasswordEmailProps) {
  return await render(
    <ForgotPasswordEmail
      username={username}
      userEmail={userEmail}
      resetLink={resetLink}
    />,
  );
}
