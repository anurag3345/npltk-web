export default function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: '#6b7280',
        marginBottom: 10,
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}
    >
      {children}
    </div>
  )
}