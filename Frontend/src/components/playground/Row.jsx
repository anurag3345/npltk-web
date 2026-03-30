import Badge from './Badge'

export default function Row({ left, right, rightTone = 'default' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 0',
        borderBottom: '1px solid #f1f5f9',
      }}
    >
      <span
        style={{
          fontSize: 14,
          color: '#111118',
          fontFamily: 'IBM Plex Mono, monospace',
          wordBreak: 'break-word',
        }}
      >
        {left}
      </span>
      <Badge tone={rightTone}>{right}</Badge>
    </div>
  )
}