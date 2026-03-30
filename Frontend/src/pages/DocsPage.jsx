import CodeBlock from '../components/CodeBlock'
import logoImage from '../assets/npltk logo.png'

function H2({ id, children }) {
  return (
    <h2
      id={'doc-' + id}
      style={{
        fontSize: 20,
        fontWeight: 600,
        color: '#250735',
        letterSpacing: '-0.01em',
        marginBottom: 10,
        marginTop: 36,
        paddingTop: 36,
        borderTop: '1px solid #e5e7eb',
        scrollMarginTop: 72,
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}
    >
      {children}
    </h2>
  )
}

function P({ children }) {
  return (
    <p
      style={{
        fontSize: 14.5,
        color: '#374151',
        lineHeight: 1.75,
        marginBottom: 14,
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}
    >
      {children}
    </p>
  )
}

function InlineCode({ children }) {
  return (
    <code
      style={{
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: 12.5,
        background: '#f4f4f6',
        border: '1px solid #e5e7eb',
        padding: '1px 5px',
        borderRadius: 3,
      }}
    >
      {children}
    </code>
  )
}

const CODES = {
  installPip: '$ pip install npltk',
  installEditable: '$ pip install -e .',
  quickStart: `from npltk import create_tokenizer, Lemmatizer
from npltk.stop_word.remover import StopWordRemover

text = "नेपाल एक सुन्दर देश हो।"

tokenizer = create_tokenizer(mode="hybrid")
tokens = tokenizer.tokenize(text)

remover = StopWordRemover()
filtered_tokens, info = remover.remove(tokens)

lemmatizer = Lemmatizer()
lemmas = [lemmatizer.lemmatize(t.text) for t in filtered_tokens]

print([t.text for t in tokens])
print([t.text for t in filtered_tokens])
print(lemmas)
print(info)`,
  authorsCredits: `__author__ = [
    "Anurag Sharma",
    "Anita Budha Magar",
    "Apeksha Parajuli",
    "Apeksha Katwal"
]
__credits__ = [
    "Pukar Karki (Project Supervisor)"
]`,
  tokenizerCtor:
    'create_tokenizer(mode="hybrid" | "rule", split_into_sentences=True, keep_punct=True, model_path=None, subword=True, preprocess=None, fallback_to_rule=True)',
  tokenizerMethods: `tokenize(text)
tokenize_sentences(text)
detokenize(tokens)`,
  modelPath: 'src/npltk/tokenizer/models/nepali_tokenizer.model',
  normalization: `from npltk.normalizer import build_normalizer

raw = "  नेपाल।।  "
result = build_normalizer().normalize(raw)

print(result.text)
for t in result.transforms:
    print(t.rule, t.before, "->", t.after)`,
  lemmatizerCtor: 'Lemmatizer(dictionary_path=None, cache_size=4096, min_root_len=2)',
  lemmatizerMethods: `lemmatize(word)
lemmatize_many(words)`,
  stopwordCtor: 'StopWordRemover(stopword_file=None)',
  stopwordMethod: 'remove(tokens)',
}

export default function DocsPage() {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 780 }}>
      <div
        style={{
          width: '100%',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          marginBottom: 20,
          background: '#fafafa',
        }}
      >
        <img
          src={logoImage}
          alt="npltk logo"
          style={{
            display: 'block',
            width: '100%',
            maxHeight: 280,
            objectFit: 'contain',
            padding: 20,
          }}
        />
      </div>

      <h1
        id="doc-top"
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#250735',
          letterSpacing: '-0.02em',
          marginBottom: 8,
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        Documentation
      </h1>

      <div id="doc-overview" style={{ scrollMarginTop: 72 }}>
        <H2 id="overview">npltk</H2>
        <P>Nepali Language Processing Toolkit for Python.</P>
        <P>This package provides core building blocks for Nepali text processing:</P>
        <ul style={{ marginBottom: 14, color: '#374151', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 14.5, lineHeight: 1.7 }}>
          <li>text normalization pipeline</li>
          <li>sentence and token-level tokenization (rule + hybrid)</li>
          <li>lemmatization (dictionary + suffix-rule based)</li>
          <li>stop-word removal using a Nepali stopword list</li>
        </ul>
        <P>Project authors and credits:</P>
        <CodeBlock code={CODES.authorsCredits} language="python" filename="metadata.py" />
      </div>

      <div id="doc-installation" style={{ scrollMarginTop: 72 }}>
        <H2 id="installation">Installation</H2>
        <CodeBlock code={CODES.installPip} language="bash" filename="terminal" />
        <P>For local development:</P>
        <CodeBlock code={CODES.installEditable} language="bash" filename="terminal" />
      </div>

      <div id="doc-quickstart" style={{ scrollMarginTop: 72 }}>
        <H2 id="quickstart">Quick Start</H2>
        <CodeBlock code={CODES.quickStart} language="python" filename="quickstart.py" />
      </div>

      <div id="doc-tokenizer" style={{ scrollMarginTop: 72 }}>
        <H2 id="tokenizer">Tokenizer Methods</H2>
        <P>Main constructor:</P>
        <CodeBlock code={CODES.tokenizerCtor} language="python" filename="constructor" />
        <P>Main methods:</P>
        <CodeBlock code={CODES.tokenizerMethods} language="python" filename="methods" />
        <P>
          Hybrid mode uses the packaged SentencePiece model file in{' '}
          <InlineCode>{CODES.modelPath}</InlineCode>.
        </P>
        <P>
          If hybrid initialization fails and <InlineCode>fallback_to_rule=True</InlineCode>, it
          automatically falls back to the rule tokenizer.
        </P>
      </div>

      <div id="doc-normalization" style={{ scrollMarginTop: 72 }}>
        <H2 id="normalization">Normalization Example</H2>
        <CodeBlock code={CODES.normalization} language="python" filename="normalization_example.py" />
      </div>

      <div id="doc-lemmatizer" style={{ scrollMarginTop: 72 }}>
        <H2 id="lemmatizer">Lemmatizer Methods</H2>
        <P>Main class:</P>
        <CodeBlock code={CODES.lemmatizerCtor} language="python" filename="class_signature" />
        <P>Main methods:</P>
        <CodeBlock code={CODES.lemmatizerMethods} language="python" filename="methods" />
        <P>
          Compatibility alias: <InlineCode>HybridLemmatizer</InlineCode>
        </P>
      </div>

      <div id="doc-stopword" style={{ scrollMarginTop: 72 }}>
        <H2 id="stopword">Stopword Methods</H2>
        <P>Class:</P>
        <CodeBlock code={CODES.stopwordCtor} language="python" filename="class_signature" />
        <P>Method:</P>
        <CodeBlock code={CODES.stopwordMethod} language="python" filename="methods" />
      </div>

      <div id="doc-requirements" style={{ scrollMarginTop: 72 }}>
        <H2 id="requirements">Requirements</H2>
        <ul style={{ marginBottom: 14, color: '#374151', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 14.5, lineHeight: 1.7 }}>
          <li>Python 3.7+</li>
          <li>sentencepiece</li>
        </ul>
      </div>

      <div id="doc-license" style={{ scrollMarginTop: 72 }}>
        <H2 id="license">License</H2>
        <P>MIT</P>
      </div>
    </div>
  )
}
