export default function RowsCard({ children }) {
  return (
    <div
      style={{
        border: '1px solid #eef2f7',
        borderRadius: 8,
        padding: '0 14px',
        background: '#ffffff',
      }}
    >
      {children}
    </div>
  )
}