export default function TokenPill({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid #e5e7eb',
        background: '#ffffff',
        fontSize: 13,
        color: '#111118',
        fontFamily: 'IBM Plex Mono, monospace',
      }}
    >
      {children}
    </span>
  )
}