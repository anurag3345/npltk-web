export default function Badge({ children, tone = 'default' }) {
  const styles = {
    default: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #e5e7eb',
    },
    purple: {
      background: '#f3e8ff',
      color: '#7c3aed',
      border: '1px solid #e9d5ff',
    },
    red: {
      background: '#fef2f2',
      color: '#b91c1c',
      border: '1px solid #fecaca',
    },
    green: {
      background: '#ecfdf5',
      color: '#047857',
      border: '1px solid #a7f3d0',
    },
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        fontFamily: 'IBM Plex Mono, monospace',
        ...styles[tone],
      }}
    >
      {children}
    </span>
  )
}