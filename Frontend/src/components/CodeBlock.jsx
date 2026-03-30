import { useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'

/**
 * CodeBlock
 * Props:
 *   code     – raw code string (required)
 *   language – "python" | "bash" | "text" (default: "python")
 *   filename – label shown in header (optional)
 */
export default function CodeBlock({ code = '', language = 'python', filename }) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) Prism.highlightElement(codeRef.current)
  }, [code, language])

  const handleCopy = () => {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div
      style={{
        background: '#f4f4f6',
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        overflow: 'hidden',
        margin: '16px 0',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid #e5e7eb',
          background: '#f0f0f2',
          fontSize: 12,
          fontFamily: 'IBM Plex Mono, monospace',
          color: '#6b7280',
        }}
      >
        <span>{filename || language}</span>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: copied ? '#059669' : '#9ca3af',
            fontSize: 12,
            fontFamily: 'IBM Plex Mono, monospace',
            transition: 'color 0.2s',
          }}
        >
          {copied ? 'copied ✓' : 'copy'}
        </button>
      </div>

      {/* Code body */}
      <pre
        style={{
          margin: 0,
          padding: '16px 18px',
          overflowX: 'auto',
          background: 'transparent',
        }}
      >
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
