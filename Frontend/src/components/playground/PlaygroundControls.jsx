import SimpleButton from '../SimpleButton'

export default function PlaygroundControls({
  feature,
  setFeature,
  features,
  run,
  running,
  output,
  error,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 14,
        flexWrap: 'wrap',
      }}
    >
      <select
        value={feature}
        onChange={(e) => setFeature(e.target.value)}
        style={{
          padding: '7px 12px',
          border: '1px solid #e5e7eb',
          borderRadius: 5,
          fontSize: 13.5,
          background: '#fff',
          color: '#111118',
          fontFamily: 'IBM Plex Sans, sans-serif',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        {features.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      <SimpleButton variant="primary" onClick={run} disabled={running}>
        {running ? 'Running…' : 'Run →'}
      </SimpleButton>

      {output && !running && (
        <span
          style={{
            fontSize: 12.5,
            color: '#9ca3af',
            fontFamily: 'IBM Plex Mono, monospace',
          }}
        >
          Done.
        </span>
      )}

      {error && !running && (
        <span
          style={{
            fontSize: 12.5,
            color: '#b91c1c',
            fontFamily: 'IBM Plex Mono, monospace',
          }}
        >
          Error: {error}
        </span>
      )}
    </div>
  )
}