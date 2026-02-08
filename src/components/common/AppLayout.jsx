import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { getGravatarUrl } from './gravatar';

const layoutStyles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
  },
  logoWrap: {
    // No box around logo (user request)
    width: 72,
    height: 72,
    borderRadius: 0,
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    boxShadow: 'none',
  },
  logo: {
    width: 64,
    height: 64,
    objectFit: 'contain',
    animation: 'logoSpin 20s linear infinite',
  },
  title: {
    color: 'rgba(255, 255, 255, 0.92)',
    fontWeight: 800,
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: 999,
    background: 'rgba(102, 126, 234, 0.18)',
    border: '1px solid rgba(187, 134, 252, 0.25)',
    maxWidth: 360,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 999,
    border: '2px solid rgba(255, 255, 255, 0.35)',
    background: 'rgba(255,255,255,0.12)',
    flex: '0 0 auto',
  },
  email: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    fontSize: 13,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    flex: 1,
    padding: '20px 16px 0 16px',
  },
  footer: {
    marginTop: '24px',
    padding: '50px 20px',
    background: 'linear-gradient(135deg, rgba(31, 58, 95, 0.95), rgba(15, 23, 42, 0.95))',
    borderTop: '1px solid rgba(255, 255, 255, 0.10)',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  footerContent: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    gap: 40,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footerCol: {
    flex: '1',
    minWidth: 260,
  },
  footerCenterCol: {
    flex: '1',
    minWidth: 260,
    textAlign: 'center',
  },
  footerRightCol: {
    flex: '1',
    minWidth: 260,
    textAlign: 'right',
  },
  footerHeading: {
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 14,
    color: '#ffffff',
  },
  footerItem: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    lineHeight: 1.6,
  },
  footerHod: {
    fontSize: 18,
    fontWeight: 800,
    color: '#ffffff',
    marginTop: 10,
  },
  footerNote: {
    marginTop: 18,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  backBtn: {
    padding: '8px 12px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.10)',
    border: '1px solid rgba(255,255,255,0.16)',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 700,
    cursor: 'pointer',
  }
};

export default function AppLayout({ children, title = 'TCE Quiz', showBack = false }) {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  })();
  const email = user?.email || '';
  const avatarUrl = getGravatarUrl(email);

  return (
    <div style={layoutStyles.page}>
      <header style={layoutStyles.header}>
        <div style={layoutStyles.left}>
          <div style={layoutStyles.logoWrap}>
            <img src="/logo.png" alt="logo" style={layoutStyles.logo} />
          </div>
          <div style={layoutStyles.title}>{title}</div>
        </div>

        <div style={layoutStyles.right}>
          {showBack && (
            <button style={layoutStyles.backBtn} onClick={() => navigate(-1)}>
              ← Back
            </button>
          )}
          {email && (
            <div style={layoutStyles.userPill}>
              <img src={avatarUrl} alt="profile" style={layoutStyles.avatar} />
              <div style={layoutStyles.email} title={email}>{email}</div>
            </div>
          )}
          <LogoutButton />
        </div>
      </header>

      <main style={layoutStyles.content}>{children}</main>

      <footer style={layoutStyles.footer}>
        <div style={layoutStyles.footerContent}>
          <div style={layoutStyles.footerCol}>
            <div style={layoutStyles.footerHeading}>Developed By</div>
            {['ROSHINI M - IT', 'MATHIVATHANI E - IT', 'SHANMATHI N - IT', 'HARINI R - IT', 'SANCHANA R - IT'].map((n) => (
              <div key={n} style={layoutStyles.footerItem}>• {n}</div>
            ))}
          </div>

          <div style={layoutStyles.footerCenterCol}>
            <div style={layoutStyles.footerHeading}>Head of the Department</div>
            <div style={layoutStyles.footerHod}>Dr. C. DEISY</div>
          </div>

          <div style={layoutStyles.footerRightCol}>
            <div style={layoutStyles.footerHeading}>Under the Guidance of</div>
            <div style={layoutStyles.footerItem}>Department of Information Technology</div>
            <div style={layoutStyles.footerItem}>C.V. NISHA ANGELINE</div>
          </div>
        </div>
        <div style={layoutStyles.footerNote}>© {new Date().getFullYear()} TCE Quiz System</div>
      </footer>
    </div>
  );
}
