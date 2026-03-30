/**
 * MemberItem
 * Props:
 *   initials – 2-letter avatar string  e.g. "AR"
 *   name     – full name
 *   role     – short role title
 *   desc     – one-sentence description
 *   links    – array of { label, href }
 */
export default function MemberItem({ initials, name, role, desc, links = [] }) {
  return (
    <div
      style={{
        background: '#fff',
        padding: '22px 24px',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#250735',
          color: '#fff',
          fontSize: 13,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          fontFamily: 'IBM Plex Sans, sans-serif',
          letterSpacing: '-0.02em',
          flexShrink: 0,
        }}
      >
        {initials}
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 14.5,
          fontWeight: 600,
          marginBottom: 2,
          fontFamily: 'IBM Plex Sans, sans-serif',
          color: '#111118',
        }}
      >
        {name}
      </div>

      {/* Role */}
      <div
        style={{
          fontSize: 12,
          fontFamily: 'IBM Plex Mono, monospace',
          color: '#b800d8',
          marginBottom: 8,
          letterSpacing: '0.01em',
        }}
      >
        {role}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 13,
          color: '#6b7280',
          lineHeight: 1.55,
          marginBottom: 12,
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        {desc}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 10 }}>
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 12,
              color: '#6b7280',
              borderBottom: '1px solid #e5e7eb',
              fontFamily: 'IBM Plex Sans, sans-serif',
              textDecoration: 'none',
              transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
