export const emailStyles = {
  main: {
    backgroundColor: '#f9f9f9',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  },
  container: {
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '30px 0',
    color: '#6366f1',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#404040',
  },
  buttonContainer: {
    textAlign: 'center' as const,
    margin: '30px 0',
  },
  button: {
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
  },
  hr: {
    borderColor: '#e6e6e6',
    margin: '30px 0',
  },
  footer: {
    color: '#8c8c8c',
    fontSize: '14px',
    lineHeight: '24px',
  },
};
