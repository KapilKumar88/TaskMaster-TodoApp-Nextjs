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
import { Task, TaskPriority } from '@prisma/client';
import moment from 'moment';
import { capitalizeFirstLetters } from '@/lib/utils';

interface DueTaskEmailProps {
  username: string;
  tasks: Array<Task & { category: { name: string } }>;
}

export const DueTaskEmail = ({ username, tasks }: DueTaskEmailProps) => {
  const previewText = `Task Due Soon`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailTemplateAppLogo />
          <Heading style={heading}>Task Due Soon</Heading>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            This is a reminder that you have below task due soon:
          </Text>
          {/* Task Details */}
          {tasks.map((taskDetails) => {
            const dueDateTime = taskDetails.dueDateTime
              ? moment(taskDetails.dueDateTime).format('lll')
              : 'N/A';
            let backgroundColor = '#10b981';
            if (taskDetails.priority === TaskPriority.HIGH) {
              backgroundColor = '#ef4444';
            } else if (taskDetails.priority === TaskPriority.MEDIUM) {
              backgroundColor = '#f59e0b';
            }

            return (
              <Section key={taskDetails.id} style={taskSection}>
                <div style={taskHeader}>
                  <Text style={taskTitle}>{taskDetails.title}</Text>
                  <div
                    style={{
                      ...priorityBadge,
                      backgroundColor: backgroundColor,
                    }}
                  >
                    {taskDetails.priority}
                  </div>
                </div>

                {taskDetails.description && (
                  <Text style={taskDescription}>{taskDetails.description}</Text>
                )}

                <div style={taskDetailsStyle}>
                  <div style={taskDetailItem}>
                    <Text style={taskDetailLabel}>Due:</Text>
                    <Text style={taskDetailValue}>{dueDateTime}</Text>
                  </div>
                  <div style={taskDetailItem}>
                    <Text style={taskDetailLabel}>Category:</Text>
                    <Text style={taskDetailValue}>
                      {capitalizeFirstLetters(
                        taskDetails?.category?.name ?? '',
                      )}
                    </Text>
                  </div>
                </div>
              </Section>
            );
          })}

          <Section style={buttonContainer}>
            {tasks?.length > 1 && (
              <Button
                style={button}
                href={`${serverSideConfig.APP_URL}/dashboard`}
              >
                View All Task
              </Button>
            )}
            {tasks?.length === 1 && (
              <Button
                style={button}
                href={`${serverSideConfig.APP_URL}/dashboard/tasks/${tasks[0].id}`}
              >
                View Task
              </Button>
            )}
          </Section>

          <Text style={paragraph}>
            You can mark this task as complete or reschedule it if needed.
            Remember to update your task status to keep your dashboard
            organized.
          </Text>

          <Hr style={hr} />
        </Container>
      </Body>
    </Html>
  );
};

export default async function DueTaskMailHtmlTemplate({
  username,
  tasks,
}: DueTaskEmailProps) {
  return await render(<DueTaskEmail username={username} tasks={tasks} />);
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

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#404040',
};

const taskSection = {
  margin: '20px 0',
  padding: '15px',
  backgroundColor: 'rgba(243, 244, 246, 0.8)',
  borderRadius: '5px',
  borderLeft: '4px solid #ef4444',
};

const taskHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '10px',
};

const taskTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0',
  flex: '1',
};

const priorityBadge = {
  fontSize: '12px',
  fontWeight: '500',
  color: 'white',
  padding: '2px 8px',
  borderRadius: '9999px',
  display: 'inline-block',
  textTransform: 'uppercase' as const,
};

const taskDescription = {
  fontSize: '14px',
  color: '#4b5563',
  margin: '10px 0',
};

const taskDetailsStyle = {
  marginTop: '15px',
};

const taskDetailItem = {
  display: 'flex',
  margin: '5px 0',
};

const taskDetailLabel = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#4b5563',
  margin: '0',
  width: '80px',
};

const taskDetailValue = {
  fontSize: '14px',
  color: '#1f2937',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#ef4444',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '30px 0',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  color: '#ef4444',
};
