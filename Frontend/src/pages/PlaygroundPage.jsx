import { useState } from 'react'
import InputArea from '../components/InputArea'
import PlaygroundControls from '../components/playground/PlaygroundControls'
import PlaygroundOutput from '../components/playground/PlaygroundOutput'

const FEATURES = [
  { value: 'pipeline', label: 'Full Pipeline' },
  { value: 'tokenizer', label: 'Tokenizer' },
  { value: 'stopwords', label: 'Stop Word Removal' },
  { value: 'lemmatizer', label: 'Lemmatizer' },
  { value: 'pos', label: 'POS Tagger' },
  { value: 'ner', label: 'NER' },
]

const API_ENDPOINTS = {
  pipeline: '/api/tools/pipeline',
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

  const payload =
    feature === 'pipeline'
      ? {
          text,
          mode: 'hybrid',
          split_into_sentences: true,
          keep_punct: true,
          subword: true,
          fallback_to_rule: true,
        }
      : { text }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.detail || 'Request failed')
  }

  return data
}

export default function PlaygroundPage() {
  const [input, setInput] = useState('नेपाल सुन्दर छ')
  const [feature, setFeature] = useState('pipeline')
  const [output, setOutput] = useState(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')

  const run = async () => {
    if (!input.trim()) return

    setRunning(true)
    setError('')
    setOutput(null)

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
    <div
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '48px 24px 64px',
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#250735',
            marginBottom: 8,
            letterSpacing: '-0.03em',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          Playground
        </h1>

        <p
          style={{
            fontSize: 14,
            color: '#6b7280',
            lineHeight: 1.7,
            maxWidth: 720,
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          Try NPLTK modules interactively. Enter Nepali text and select a feature
          to run. You can test tokenization, stop-word removal, lemmatization,
          POS tagging, NER, or the full pipeline in one place.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 18,
        }}
      >
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            background: '#ffffff',
            padding: 18,
          }}
        >
          <InputArea
            value={input}
            onChange={setInput}
            label="input.txt"
            placeholder="Enter Nepali text here…"
            rows={6}
          />

          <PlaygroundControls
            feature={feature}
            setFeature={setFeature}
            features={FEATURES}
            run={run}
            running={running}
            output={output}
            error={error}
          />
        </div>

        <PlaygroundOutput
          feature={feature}
          features={FEATURES}
          output={output}
          running={running}
        />
      </div>

      <p
        style={{
          fontSize: 12.5,
          color: '#9ca3af',
          marginTop: 12,
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        * Connected to FastAPI backend endpoints for tokenization, stop-word
        removal, lemmatization, POS tagging, NER, and full pipeline.
      </p>
    </div>
  )
}