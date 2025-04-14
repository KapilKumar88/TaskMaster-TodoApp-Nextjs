import serverSideConfig from '@/config/server.config';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  render,
  Section,
  Text,
} from '@react-email/components';
import EmailTemplateAppLogo from './email-template-app-logo';

interface WelcomeEmailProps {
  username: string;
  userEmail: string;
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

const hr = {
  borderColor: '#e6e6e6',
  margin: '30px 0',
};

const list = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '26px',
};

const listItem = {
  margin: '10px 0',
};

const link = {
  color: '#6366f1',
  textDecoration: 'underline',
};

const footer = {
  color: '#8c8c8c',
  fontSize: '14px',
  lineHeight: '24px',
};

function WelcomeEmailTemplate({
  username,
  userEmail,
}: Readonly<WelcomeEmailProps>) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <EmailTemplateAppLogo />
          <Heading style={heading}>
            Welcome to {serverSideConfig.APP_NAME}!
          </Heading>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            Thank you for joining {serverSideConfig.APP_NAME}! We&apos;re
            excited to help you stay organized and boost your productivity with
            our beautiful task management app.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={serverSideConfig.APP_URL}>
              Get Started
            </Button>
          </Section>
          <Text style={paragraph}>
            Here are a few things you can do with {serverSideConfig.APP_NAME}:
          </Text>
          <ul style={list}>
            <li style={listItem}>
              Create and organize tasks with our intuitive interface
            </li>
            <li style={listItem}>
              Set priorities and deadlines to stay on track
            </li>
            <li style={listItem}>Categorize tasks for better organization</li>
            <li style={listItem}>
              Track your productivity with beautiful analytics
            </li>
          </ul>
          <Text style={paragraph}>
            If you have any questions, feel free to reply to this email or
            contact our support team.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            This email was sent to {userEmail}. If you&apos;d prefer not to
            receive these emails, you can{' '}
            <Link href={`${serverSideConfig.APP_URL}/unsubscribe`} style={link}>
              unsubscribe
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default async function WelcomeEmailHtmlTemplate(
  userName: string,
  userEmail: string,
) {
  return await render(
    <WelcomeEmailTemplate username={userName} userEmail={userEmail} />,
  );
}
