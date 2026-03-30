import { useState } from 'react'
import InputArea   from '../components/InputArea'
import SimpleButton from '../components/SimpleButton'

const FEATURES = [
  { value: 'tokenizer',  label: 'Tokenizer' },
  { value: 'stopwords',  label: 'Stop Word Removal' },
  { value: 'lemmatizer', label: 'Lemmatizer' },
  { value: 'pos',        label: 'POS Tagger' },
  { value: 'ner',        label: 'NER' },
]

const API_ENDPOINTS = {
  tokenizer: '/api/tools/tokenize',
  stopwords: '/api/tools/stopwords',
  lemmatizer: '/api/tools/lemmatize',
  pos: '/api/tools/pos',
  ner: '/api/tools/ner',
}

async function runFeature(feature, text) {
  const endpoint = API_ENDPOINTS[feature]
  if (!endpoint) {
    throw new Error(`Unsupported feature: ${feature}`)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.detail || 'Request failed')
  }

  return JSON.stringify(data, null, 2)
}

export default function PlaygroundPage() {
  const [input,   setInput]   = useState('नेपाल सुन्दर छ')
  const [feature, setFeature] = useState('tokenizer')
  const [output,  setOutput]  = useState('')
  const [running, setRunning] = useState(false)
  const [error,   setError]   = useState('')

  const run = async () => {
    if (!input.trim()) return
    setRunning(true)
    setError('')
    setOutput('')

    try {
      const result = await runFeature(feature, input)
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setRunning(false)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: '#250735',
          marginBottom: 6,
          letterSpacing: '-0.02em',
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        Playground
      </h1>
      <p
        style={{
          fontSize: 14,
          color: '#6b7280',
          marginBottom: 32,
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        Try NPLTK modules interactively. Enter Nepali text and select a feature to run.
      </p>

      {/* Input */}
      <InputArea
        value={input}
        onChange={setInput}
        label="input.txt"
        placeholder="Enter Nepali text here…"
        rows={5}
      />

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          margin: '14px 0',
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
          {FEATURES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <SimpleButton variant="primary" onClick={run} disabled={running}>
          {running ? 'Running…' : 'Run →'}
        </SimpleButton>

        {output && !running && (
          <span style={{ fontSize: 12.5, color: '#9ca3af', fontFamily: 'IBM Plex Mono, monospace' }}>
            Done.
          </span>
        )}

        {error && !running && (
          <span style={{ fontSize: 12.5, color: '#b91c1c', fontFamily: 'IBM Plex Mono, monospace' }}>
            Error: {error}
          </span>
        )}
      </div>

      {/* Output panel */}
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          overflow: 'hidden',
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
              borderRadius: 3,
            }}
          >
            {FEATURES.find((f) => f.value === feature)?.label}
          </span>
        </div>

        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 13,
            padding: 16,
            minHeight: 90,
            color: '#111118',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {running ? (
            <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Processing…</span>
          ) : output ? (
            output
          ) : (
            <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
              Output will appear here after you press Run.
            </span>
          )}
        </div>
      </div>

      <p
        style={{
          fontSize: 12.5,
          color: '#9ca3af',
          marginTop: 10,
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        * Connected to FastAPI backend endpoints for tokenization, stop-word
        removal, and lemmatization.
      </p>
    </div>
  )
}
