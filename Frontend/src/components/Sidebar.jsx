import { useState, useEffect } from 'react'
import { docSections } from '../data/docs'

// Group sections by their "group" key
function groupSections(sections) {
  return sections.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = []
    acc[s.group].push(s)
    return acc
  }, {})
}

export default function Sidebar() {
  const [active, setActive] = useState('installation')
  const groups = groupSections(docSections)

  // Highlight sidebar link on scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const section of [...docSections].reverse()) {
        const el = document.getElementById('doc-' + section.id)
        if (el && el.getBoundingClientRect().top <= 80) {
          setActive(section.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setActive(id)
    document.getElementById('doc-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid #e5e7eb',
        padding: '28px 0',
        position: 'sticky',
        top: 56,
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
      }}
    >
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'IBM Plex Mono, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#9ca3af',
              padding: '0 20px',
              marginBottom: 6,
              marginTop: 20,
            }}
          >
            {group}
          </div>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '5px 20px',
                fontSize: 13.5,
                color: active === item.id ? '#250735' : '#6b7280',
                fontWeight: active === item.id ? 500 : 400,
                borderLeft: active === item.id ? '2px solid #b800d8' : '2px solid transparent',
                background: active === item.id ? '#faf5fb' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif',
                transition: 'color 0.12s, background 0.12s',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </aside>
  )
}
