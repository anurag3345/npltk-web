import { Link } from 'react-router-dom'

const s = {
  footer: {
    borderTop: '1px solid #e5e7eb',
    padding: '26px 24px',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  left: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'IBM Plex Sans, sans-serif',
  },
  links: {
    display: 'flex',
    gap: 16,
  },
  link: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'IBM Plex Sans, sans-serif',
    textDecoration: 'none',
  },
}

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <span style={s.left}>© 2025 NPLTK Contributors · MIT License</span>
        <div style={s.links}>
          <Link to="/docs"       style={s.link}>Docs</Link>
          <Link to="/opensource" style={s.link}>Open Source</Link>
          <a
            href="https://github.com/anurag3345/npltk"
            target="_blank"
            rel="noreferrer"
            style={s.link}
          >
            GitHub
          </a>
          <a
            href="https://pypi.org/project/npltk"
            target="_blank"
            rel="noreferrer"
            style={s.link}
          >
            PyPI
          </a>
        </div>
      </div>
    </footer>
  )
}
