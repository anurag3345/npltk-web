import { NavLink, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'Docs',        to: '/docs' },
  { label: 'Playground',  to: '/playground' },
  { label: 'Open Source', to: '/opensource' },
  { label: 'Team',        to: '/team' },
]

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: 15,
              color: '#250735',
              letterSpacing: '-0.01em',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            NPLTK
          </span>
          <span
            style={{
              fontSize: 10,
              fontFamily: 'IBM Plex Mono, monospace',
              background: '#250735',
              color: '#fff',
              padding: '1px 6px',
              borderRadius: 3,
              letterSpacing: '0.04em',
            }}
          >
            v0.3.1
          </span>
        </NavLink>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                fontSize: 13.5,
                color: isActive ? '#250735' : '#6b7280',
                fontWeight: isActive ? 500 : 400,
                padding: '5px 10px',
                borderRadius: 5,
                textDecoration: 'none',
                transition: 'color 0.15s',
                fontFamily: 'IBM Plex Sans, sans-serif',
              })}
            >
              {label}
            </NavLink>
          ))}

          {/* GitHub */}
          <a
            href="https://github.com/npltk/npltk"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#6b7280',
              border: '1px solid #e5e7eb',
              padding: '5px 12px',
              borderRadius: 5,
              marginLeft: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.15s, border-color 0.15s',
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
