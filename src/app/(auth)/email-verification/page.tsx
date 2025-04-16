import EmailVerification from '@/components/auth/email-verification';
import { decryptHelper } from '@/lib/helpers/server-helper-fn';
import { verifyUserEmail } from '@/services/user.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Email Verification`,
};

export default async function EmailVerificationPage({
  searchParams,
}: Readonly<{
  searchParams: { token: string };
}>) {
  const [queryParams] = await Promise.all([searchParams]);
  const decryptedObject = JSON.parse(await decryptHelper(queryParams.token));
  const response = await verifyUserEmail(
    decryptedObject?.userId,
    decryptedObject?.token,
    decryptedObject?.expiryTime,
  );

  return <EmailVerification response={response} />;
}
