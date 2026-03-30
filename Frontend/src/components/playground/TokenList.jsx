import TokenPill from './TokenPill'

export default function TokenList({ items, emptyText }) {
  if (!items?.length) {
    return <span style={{ color: '#9ca3af' }}>{emptyText}</span>
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map((item, index) => (
        <TokenPill key={`${item}-${index}`}>{item}</TokenPill>
      ))}
    </div>
  )
}