import OutputRenderer from './OutputRenderer'

export default function PlaygroundOutput({ feature, features, output, running }) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <div
        style={{
          background: '#f8f8f9',
          borderBottom: '1px solid #e5e7eb',
          padding: '9px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 12,
          fontFamily: 'IBM Plex Mono, monospace',
          color: '#6b7280',
        }}
      >
        <span>output</span>
        <span
          style={{
            background: '#f3e8ff',
            color: '#7c3aed',
            fontSize: 11,
            fontFamily: 'IBM Plex Mono, monospace',
            padding: '2px 8px',
            borderRadius: 999,
          }}
        >
          {features.find((f) => f.value === feature)?.label}
        </span>
      </div>

      <div
        style={{
          fontSize: 13,
          padding: 16,
          minHeight: 120,
          color: '#111118',
          lineHeight: 1.7,
        }}
      >
        {running ? (
          <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Processing…</span>
        ) : (
          <OutputRenderer feature={feature} data={output} />
        )}
      </div>
    </div>
  )
}