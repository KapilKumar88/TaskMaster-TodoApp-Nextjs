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
      <Body style={main}>
        <Container style={container}>
          <EmailTemplateAppLogo />
          <Heading style={heading}>Reset Your Password</Heading>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            We received a request to reset your password for your{' '}
            {serverSideConfig.APP_NAME} account. Click the button below to reset
            it. This link is only valid for 60 minutes.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
          </Section>

          <Text style={paragraph}>
            If you didn't request a password reset, you can safely ignore this
            email. Your password will not be changed.
          </Text>

          <Text style={paragraph}>
            For security reasons, this password reset link will expire in 60
            minutes. If you need a new link, you can request another password
            reset.
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
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

// Styles
const main = {
  backgroundColor: '#f9f9f9',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(10px)',
  maxWidth: '600px',
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  color: '#6366f1',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#404040',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#6366f1',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  backgroundImage: 'linear-gradient(to right, #14b8a6, #6366f1)',
};

const infoSection = {
  margin: '20px 0',
  padding: '15px',
  backgroundColor: 'rgba(243, 244, 246, 0.8)',
  borderRadius: '5px',
};

const infoHeader = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#4b5563',
  margin: '0 0 10px 0',
};

const infoItem = {
  margin: '10px 0',
};

const infoLabel = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#4b5563',
  margin: '0',
};

const infoValue = {
  fontSize: '14px',
  color: '#1f2937',
  margin: '0',
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '30px 0',
};

const footer = {
  color: '#8c8c8c',
  fontSize: '14px',
  lineHeight: '24px',
};
