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

interface VerificationEmailProps {
  userName: string;
  verificationLink: string;
}

const EmailVerificationMail = ({
  userName,
  verificationLink,
}: VerificationEmailProps) => {
  const previewText = `Verify your email address`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailTemplateAppLogo />
          <Heading style={heading}>Verify Your Email</Heading>
          <Text style={paragraph}>Hi {userName},</Text>
          <Text style={paragraph}>
            Please click on the below link to verify your email address.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={verificationLink}>
              Verify Email
            </Button>
          </Section>

          <Text style={paragraph}>
            For security reasons, this verification will expire in 60 min.
          </Text>

          <Hr style={hr} />
        </Container>
      </Body>
    </Html>
  );
};

export default async function EmailVerificationMailHtmlTemplate({
  userName,
  verificationLink,
}: VerificationEmailProps) {
  return await render(
    <EmailVerificationMail
      userName={userName}
      verificationLink={verificationLink}
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
