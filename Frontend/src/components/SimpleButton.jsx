/**
 * SimpleButton
 * Props:
 *   variant  – "primary" | "outline" (default: "primary")
 *   size     – "sm" | "md" (default: "md")
 *   onClick  – click handler
 *   href     – renders as <a> when provided
 *   children
 */
export default function SimpleButton({
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  children,
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 5,
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid transparent',
    fontFamily: 'IBM Plex Sans, sans-serif',
    textDecoration: 'none',
    transition: 'background 0.15s, border-color 0.15s, color 0.15s',
  }

  const sizes = {
    sm: { padding: '5px 12px', fontSize: 13 },
    md: { padding: '8px 16px', fontSize: 13.5 },
  }

  const variants = {
    primary: {
      background: '#250735',
      color: '#fff',
      borderColor: '#250735',
    },
    outline: {
      background: 'transparent',
      color: '#111118',
      borderColor: '#e5e7eb',
    },
    accent: {
      background: '#b800d8',
      color: '#fff',
      borderColor: '#b800d8',
    },
  }

  const style = { ...base, ...sizes[size], ...variants[variant] }

  if (href) {
    return (
      <a href={href} style={style} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button style={style} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
