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
import { emailStyles } from './email-styles';

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
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <EmailTemplateAppLogo />
          <Heading style={emailStyles.heading}>Verify Your Email</Heading>
          <Text style={emailStyles.paragraph}>Hi {userName},</Text>
          <Text style={emailStyles.paragraph}>
            Please click on the below link to verify your email address.
          </Text>

          <Section style={emailStyles.buttonContainer}>
            <Button style={emailStyles.button} href={verificationLink}>
              Verify Email
            </Button>
          </Section>

          <Text style={emailStyles.paragraph}>
            For security reasons, this verification will expire in 60 min.
          </Text>

          <Hr style={emailStyles.hr} />
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
