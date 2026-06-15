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
import { emailStyles } from './email-styles';

interface WelcomeEmailProps {
  username: string;
  userEmail: string;
}

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

function WelcomeEmailTemplate({
  username,
  userEmail,
}: Readonly<WelcomeEmailProps>) {
  return (
    <Html>
      <Head />
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <EmailTemplateAppLogo />
          <Heading style={emailStyles.heading}>
            Welcome to {serverSideConfig.APP_NAME}!
          </Heading>
          <Text style={emailStyles.paragraph}>Hi {username},</Text>
          <Text style={emailStyles.paragraph}>
            Thank you for joining {serverSideConfig.APP_NAME}! We&apos;re
            excited to help you stay organized and boost your productivity with
            our beautiful task management app.
          </Text>
          <Section style={emailStyles.buttonContainer}>
            <Button style={emailStyles.button} href={serverSideConfig.APP_URL}>
              Get Started
            </Button>
          </Section>
          <Text style={emailStyles.paragraph}>
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
          <Text style={emailStyles.paragraph}>
            If you have any questions, feel free to reply to this email or
            contact our support team.
          </Text>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>
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
