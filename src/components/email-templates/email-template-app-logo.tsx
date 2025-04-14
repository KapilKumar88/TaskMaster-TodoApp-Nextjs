const logoDiv: React.CSSProperties = {
  position: 'relative',
  width: '3rem',
  height: '3rem',
  backgroundImage: 'linear-gradient(to bottom right, #0097A7, #6610F2)',
  borderRadius: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
};

const logoDivSpan: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};
export default function EmailTemplateAppLogo() {
  return (
    <div style={logoDiv}>
      <span style={logoDivSpan}>T</span>
    </div>
  );
}
