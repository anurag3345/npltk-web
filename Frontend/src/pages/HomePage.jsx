import { Link, useNavigate } from 'react-router-dom'
import CodeBlock    from '../components/CodeBlock'
import SimpleButton from '../components/SimpleButton'
import { features } from '../data/features'

const HERO_CODE = `from npltk import Tokenizer

# Initialize tokenizer
tokenizer = Tokenizer()
tokens = tokenizer.tokenize("नेपाल सुन्दर छ")
# ["नेपाल", "सुन्दर", "छ"]`

const POS_CODE = `from npltk import POSTagger

tagger = POSTagger()
result = tagger.tag("म घर जान्छु")
# [("म", "PP"), ("घर", "NN"), ("जान्छु", "VBZ")]`

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      {/* ── Hero ── */}
      <div style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 64px' }}>
          <div
            style={{
              fontSize: 12,
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#b800d8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Nepali Language Processing · Python
          </div>

          <h1
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: '#250735',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 16,
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            NPLTK
          </h1>

          <p
            style={{
              fontSize: 18,
              color: '#6b7280',
              fontWeight: 400,
              marginBottom: 20,
              maxWidth: 520,
              lineHeight: 1.5,
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            A lightweight NLP toolkit for the Nepali language.
          </p>

          <p
            style={{
              fontSize: 15,
              color: '#6b7280',
              maxWidth: 540,
              lineHeight: 1.7,
              marginBottom: 32,
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}
          >
            NPLTK provides production-ready tools for tokenization, morphological
            analysis, part-of-speech tagging, and named entity recognition — built
            specifically for Nepali text.
          </p>

          {/* Install bar */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#f4f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: 5,
              padding: '8px 14px',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 13,
              color: '#111118',
              marginBottom: 32,
            }}
          >
            <span style={{ color: '#9ca3af' }}>$</span>
            <span>pip install npltk</span>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}>
            <SimpleButton variant="primary" onClick={() => navigate('/docs')}>
              Documentation →
            </SimpleButton>
            <SimpleButton variant="outline" onClick={() => navigate('/playground')}>
              Try Playground
            </SimpleButton>
          </div>

          {/* Hero code example */}
          <div style={{ maxWidth: 520 }}>
            <CodeBlock code={HERO_CODE} language="python" filename="example.py" />
          </div>
        </div>
      </div>

      {/* ── Features grid ── */}
      <div style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'IBM Plex Mono, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#9ca3af',
              marginBottom: 28,
            }}
          >
            Core Modules
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            {features.map((f, i) => (
              <div
                key={f.tag}
                style={{
                  padding: '20px 22px',
                  borderRight: (i + 1) % 3 !== 0 ? '1px solid #e5e7eb' : 'none',
                  borderBottom:
                    i < features.length - 3 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 11,
                    color: '#b800d8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: 6,
                  }}
                >
                  {f.tag}
                </div>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    marginBottom: 4,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  {f.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#6b7280',
                    lineHeight: 1.5,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why NPLTK + second code example ── */}
      <div style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '64px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'IBM Plex Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#9ca3af',
                marginBottom: 16,
              }}
            >
              Why NPLTK
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#250735',
                marginBottom: 14,
                letterSpacing: '-0.01em',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Built for Nepali, not adapted.
            </h2>
            <p
              style={{
                fontSize: 14.5,
                color: '#374151',
                lineHeight: 1.75,
                marginBottom: 12,
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              Existing NLP toolkits treat Nepali as an afterthought. NPLTK is
              designed ground-up for Devanagari script, Nepali morphology, and
              the linguistic patterns specific to the language.
            </p>
            <p
              style={{
                fontSize: 14.5,
                color: '#374151',
                lineHeight: 1.75,
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              No dependencies on English-centric corpora. No transliteration
              hacks. Just clean, accurate Nepali NLP.
            </p>
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'IBM Plex Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#9ca3af',
                marginBottom: 16,
              }}
            >
              Quick Example
            </div>
            <CodeBlock code={POS_CODE} language="python" filename="pos_example.py" />
          </div>
        </div>
      </div>

      {/* ── Open source banner ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'IBM Plex Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#9ca3af',
                marginBottom: 6,
              }}
            >
              Open Source
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#250735',
                marginBottom: 4,
                letterSpacing: '-0.01em',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              MIT Licensed · Community Driven
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Free to use, modify, and distribute. Contributions welcome.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <SimpleButton variant="outline" onClick={() => navigate('/opensource')}>
              Learn More
            </SimpleButton>
            <SimpleButton
              variant="primary"
              href="https://github.com/npltk/npltk"
            >
              View on GitHub
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  )
}
