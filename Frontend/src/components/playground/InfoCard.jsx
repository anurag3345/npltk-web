export default function InfoCard({ children }) {
  return (
    <div
      style={{
        border: '1px solid #eef2f7',
        borderRadius: 8,
        padding: 14,
        background: '#fcfcfd',
      }}
    >
      {children}
    </div>
  )
}