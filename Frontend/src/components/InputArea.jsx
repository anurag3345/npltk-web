/**
 * InputArea
 * Props:
 *   value       – controlled value
 *   onChange    – change handler
 *   placeholder – placeholder text
 *   label       – header label string
 *   rows        – min visible rows (default 5)
 */
export default function InputArea({
  value,
  onChange,
  placeholder = 'Enter Nepali text here…',
  label = 'input.txt',
  rows = 5,
}) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      {/* Panel header */}
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
        <span>{label}</span>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Nepali text</span>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        spellCheck={false}
        style={{
          width: '100%',
          padding: '14px 16px',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 14,
          lineHeight: 1.6,
          border: 'none',
          outline: 'none',
          resize: 'vertical',
          background: '#fff',
          color: '#111118',
        }}
      />
    </div>
  )
}
