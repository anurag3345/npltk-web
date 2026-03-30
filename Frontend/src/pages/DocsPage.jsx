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

function H3({ children }) {
  return (
    <h3
      style={{
        fontSize: 16,
        fontWeight: 600,
        color: '#250735',
        marginTop: 24,
        marginBottom: 10,
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}
    >
      {children}
    </h3>
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

const LIST_STYLE = {
  marginBottom: 14,
  color: '#374151',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: 14.5,
  lineHeight: 1.7,
  paddingLeft: 20,
}

const CODES = {
  installPip: '$ pip install npltk',
  installEditable: '$ pip install -e .',

  quickStart: `from npltk import create_tokenizer, Lemmatizer, POSTagger, NERTagger
from npltk.stop_word.remover import StopWordRemover
from npltk.normalizer import build_normalizer

text = "राम काठमाडौंमा आफ्नो साथीसँग भेट्न गए।"

# 1. Normalize
normalizer = build_normalizer()
normalized = normalizer.normalize(text).text

# 2. Tokenize
tokenizer = create_tokenizer(mode="hybrid")
tokens = tokenizer.tokenize(normalized)

# 3. Remove stop words
filtered_tokens, info = StopWordRemover().remove(tokens)

# 4. Lemmatize
lemmatizer = Lemmatizer()
lemmas = [lemmatizer.lemmatize(t.text) for t in filtered_tokens]

# 5. POS tagging
pos_tagger = POSTagger()
pos_result = pos_tagger.tag(normalized)

# 6. NER tagging
ner_tagger = NERTagger()
ner_result = ner_tagger.tag(normalized)

print("Tokens:", [t.text for t in tokens])
print("Filtered:", [t.text for t in filtered_tokens])
print("Lemmas:", lemmas)
print("POS:", pos_result)
print("NER:", ner_result)`,

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

  posCtor: 'POSTagger(model_path=None, label_map_path=None, tokenizer_mode="hybrid")',
  posMethods: `tag(text)
tag_tokens(tokens)`,

  nerCtor: 'NERTagger(model_path=None, label_map_path=None, tokenizer_mode="hybrid")',
  nerMethods: `tag(text)
tag_tokens(tokens)`,

  posOutput: `{
  "pos_tags": [
    { "token": "राम", "tag": "NNP" },
    { "token": "काठमाडौंमा", "tag": "POP" },
    { "token": "गए", "tag": "VBF" }
  ]
}`,

  nerOutput: `{
  "ner_tags": [
    { "token": "राम", "tag": "B-PER" },
    { "token": "काठमाडौं", "tag": "B-LOC" }
  ],
  "entities": [
    { "text": "राम", "label": "PER", "start": 0, "end": 2 },
    { "text": "काठमाडौं", "label": "LOC", "start": 3, "end": 13 }
  ]
}`,

  pipelineExample: `from npltk import create_tokenizer, Lemmatizer, POSTagger, NERTagger
from npltk.normalizer import build_normalizer
from npltk.stop_word.remover import StopWordRemover

text = "नेपाल एक सुन्दर देश हो।"

normalizer = build_normalizer()
normalized = normalizer.normalize(text).text

tokenizer = create_tokenizer(mode="hybrid")
tokens = tokenizer.tokenize(normalized)

filtered_tokens, info = StopWordRemover().remove(tokens)

lemmatizer = Lemmatizer()
lemmas = [lemmatizer.lemmatize(t.text) for t in filtered_tokens]

pos = POSTagger().tag(normalized)
ner = NERTagger().tag(normalized)

print({
    "original_text": text,
    "normalized_text": normalized,
    "tokens": [t.text for t in tokens],
    "filtered_tokens": [t.text for t in filtered_tokens],
    "lemmas": lemmas,
    "pos": pos,
    "ner": ner,
})`,
}

export default function DocsPage() {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 860 }}>
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
        <P>
          <strong>npltk</strong> is a Nepali Language Processing Toolkit for Python. It is designed
          to provide practical and package-friendly building blocks for common Nepali NLP tasks such
          as normalization, tokenization, lemmatization, stop-word removal, part-of-speech tagging,
          and named entity recognition.
        </P>
        <P>
          The toolkit focuses on making Nepali text processing easier for students, researchers, and
          developers by exposing simple classes and methods that can be combined into a complete NLP
          pipeline.
        </P>

        <H3>Core features</H3>
        <ul style={LIST_STYLE}>
          <li>text normalization pipeline</li>
          <li>sentence and token-level tokenization (rule + hybrid)</li>
          <li>lemmatization (dictionary + suffix-rule based)</li>
          <li>stop-word removal using a Nepali stopword list</li>
          <li>part-of-speech tagging</li>
          <li>named entity recognition</li>
        </ul>

        <H3>Methods used in the toolkit</H3>
        <ul style={LIST_STYLE}>
          <li>
            <strong>Rule-based normalization</strong> for cleaning and standardizing Nepali text
          </li>
          <li>
            <strong>Rule-based and hybrid tokenization</strong> for sentence and word segmentation
          </li>
          <li>
            <strong>Dictionary lookup + suffix-rule lemmatization</strong> for recovering base
            forms
          </li>
          <li>
            <strong>Stopword filtering</strong> using a curated Nepali stopword list
          </li>
          <li>
            <strong>Sequence labeling for POS tagging</strong> to assign grammatical categories to
            tokens
          </li>
          <li>
            <strong>Sequence labeling for NER</strong> using BIO-style entity tags to detect named
            entities
          </li>
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
        <P>
          This example shows a simple end-to-end workflow using normalization, tokenization,
          stop-word removal, lemmatization, POS tagging, and NER.
        </P>
        <CodeBlock code={CODES.quickStart} language="python" filename="quickstart.py" />
      </div>

      <div id="doc-tokenizer" style={{ scrollMarginTop: 72 }}>
        <H2 id="tokenizer">Tokenizer</H2>
        <P>
          The tokenizer is responsible for splitting raw Nepali text into sentences and tokens. It
          is one of the core entry points of the toolkit and is used by downstream tasks such as
          stop-word removal, lemmatization, POS tagging, and NER.
        </P>

        <H3>Main constructor</H3>
        <CodeBlock code={CODES.tokenizerCtor} language="python" filename="constructor" />

        <H3>Main methods</H3>
        <CodeBlock code={CODES.tokenizerMethods} language="python" filename="methods" />

        <H3>What each tokenizer method does</H3>
        <ul style={LIST_STYLE}>
          <li>
            <InlineCode>tokenize(text)</InlineCode> splits input text into token objects
          </li>
          <li>
            <InlineCode>tokenize_sentences(text)</InlineCode> first separates the text into
            sentence-level units
          </li>
          <li>
            <InlineCode>detokenize(tokens)</InlineCode> reconstructs text from tokens
          </li>
        </ul>

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
        <H2 id="normalization">Normalization</H2>
        <P>
          The normalizer standardizes raw Nepali text before further processing. This may include
          whitespace cleanup, punctuation normalization, and other transformations that make the
          text more consistent for downstream tasks.
        </P>
        <CodeBlock
          code={CODES.normalization}
          language="python"
          filename="normalization_example.py"
        />
      </div>

      <div id="doc-lemmatizer" style={{ scrollMarginTop: 72 }}>
        <H2 id="lemmatizer">Lemmatizer</H2>
        <P>
          The lemmatizer reduces inflected or surface word forms to a more canonical base form. In
          npltk, lemmatization is designed as a hybrid process that can combine dictionary lookup,
          caching, and rule-based suffix handling.
        </P>

        <H3>Main class</H3>
        <CodeBlock code={CODES.lemmatizerCtor} language="python" filename="class_signature" />

        <H3>Main methods</H3>
        <CodeBlock code={CODES.lemmatizerMethods} language="python" filename="methods" />

        <H3>What the lemmatizer class does</H3>
        <ul style={LIST_STYLE}>
          <li>
            <InlineCode>lemmatize(word)</InlineCode> returns the lemma of a single word
          </li>
          <li>
            <InlineCode>lemmatize_many(words)</InlineCode> processes a list of words in batch
          </li>
          <li>can use dictionary matches first for known words</li>
          <li>can fall back to suffix-based rules for unseen word forms</li>
        </ul>

        <P>
          Compatibility alias: <InlineCode>HybridLemmatizer</InlineCode>
        </P>
      </div>

      <div id="doc-stopword" style={{ scrollMarginTop: 72 }}>
        <H2 id="stopword">Stopword Remover</H2>
        <P>
          The stop-word remover filters out high-frequency function words that may not be useful for
          certain downstream tasks such as keyword extraction or lightweight text analysis.
        </P>

        <H3>Class</H3>
        <CodeBlock code={CODES.stopwordCtor} language="python" filename="class_signature" />

        <H3>Method</H3>
        <CodeBlock code={CODES.stopwordMethod} language="python" filename="methods" />

        <H3>What the class does</H3>
        <ul style={LIST_STYLE}>
          <li>accepts token objects as input</li>
          <li>returns filtered tokens and optional removal information</li>
          <li>helps reduce noise before later processing steps</li>
        </ul>
      </div>

      <div id="doc-pos" style={{ scrollMarginTop: 72 }}>
        <H2 id="pos">POS Tagger</H2>
        <P>
          The POS tagger assigns a grammatical category to each token in a sentence. This helps the
          toolkit understand how a word is functioning in context, such as noun, verb, adjective,
          pronoun, postposition, number, particle, or punctuation.
        </P>

        <H3>Main class</H3>
        <CodeBlock code={CODES.posCtor} language="python" filename="class_signature" />

        <H3>Main methods</H3>
        <CodeBlock code={CODES.posMethods} language="python" filename="methods" />

        <H3>What the POS tagger class does</H3>
        <ul style={LIST_STYLE}>
          <li>
            <InlineCode>tag(text)</InlineCode> tokenizes and tags raw input text directly
          </li>
          <li>
            <InlineCode>tag_tokens(tokens)</InlineCode> tags an already tokenized sequence
          </li>
          <li>returns token-tag pairs for grammatical analysis</li>
          <li>is useful for parsing, linguistic analysis, and downstream NLP tasks</li>
        </ul>

        <H3>Example output</H3>
        <CodeBlock code={CODES.posOutput} language="json" filename="pos_output.json" />

        <H3>POS tag types</H3>
        <P>
          Depending on the exact trained label set used in your model, the POS tagger can include
          categories such as:
        </P>
        <ul style={LIST_STYLE}>
          <li>common noun</li>
          <li>proper noun</li>
          <li>adjective</li>
          <li>pronoun</li>
          <li>determiner</li>
          <li>verb and verb subtypes</li>
          <li>adverb</li>
          <li>postposition</li>
          <li>number and numeral classifier</li>
          <li>conjunction</li>
          <li>particle</li>
          <li>question marker</li>
          <li>interjection</li>
          <li>punctuation and symbols</li>
          <li>foreign word / abbreviation / formula / unclassifiable</li>
        </ul>

        <P>
          These types are based on the Nepali POS category set you provided, which includes detailed
          noun, pronoun, determiner, verb, postposition, number, punctuation, and special-symbol
          classes.
        </P>
      </div>

      <div id="doc-ner" style={{ scrollMarginTop: 72 }}>
        <H2 id="ner">Named Entity Recognition (NER)</H2>
        <P>
          The NER component identifies named entities in text such as people, locations,
          organizations, dates, and events. It is useful for information extraction, search,
          question answering, and structured text analysis.
        </P>

        <H3>Main class</H3>
        <CodeBlock code={CODES.nerCtor} language="python" filename="class_signature" />

        <H3>Main methods</H3>
        <CodeBlock code={CODES.nerMethods} language="python" filename="methods" />

        <H3>What the NER class does</H3>
        <ul style={LIST_STYLE}>
          <li>
            <InlineCode>tag(text)</InlineCode> processes raw text and predicts entity tags
          </li>
          <li>
            <InlineCode>tag_tokens(tokens)</InlineCode> predicts entity tags on already tokenized
            input
          </li>
          <li>returns token-level BIO tags</li>
          <li>can also return merged entity spans for easier downstream use</li>
        </ul>

        <H3>NER tag format</H3>
        <P>
          NER commonly uses the <InlineCode>BIO</InlineCode> tagging scheme:
        </P>
        <ul style={LIST_STYLE}>
          <li>
            <InlineCode>B-XXX</InlineCode> = beginning of an entity
          </li>
          <li>
            <InlineCode>I-XXX</InlineCode> = inside or continuation of an entity
          </li>
          <li>
            <InlineCode>O</InlineCode> = outside any named entity
          </li>
        </ul>

        <H3>Common entity types</H3>
        <ul style={LIST_STYLE}>
          <li>
            <InlineCode>PER</InlineCode> — person
          </li>
          <li>
            <InlineCode>LOC</InlineCode> — location
          </li>
          <li>
            <InlineCode>ORG</InlineCode> — organization
          </li>
          <li>
            <InlineCode>DATE</InlineCode> — date
          </li>
          <li>
            <InlineCode>EVENT</InlineCode> — event
          </li>
          <li>
            <InlineCode>TIME</InlineCode> — time
          </li>
          <li>
            <InlineCode>MISC</InlineCode> — miscellaneous entity if your dataset includes it
          </li>
        </ul>

        <H3>Example output</H3>
        <CodeBlock code={CODES.nerOutput} language="json" filename="ner_output.json" />
      </div>

      <div id="doc-pipeline" style={{ scrollMarginTop: 72 }}>
        <H2 id="pipeline">Full Pipeline Example</H2>
        <P>
          The following example shows how multiple components of npltk can be combined into a single
          processing pipeline.
        </P>
        <CodeBlock code={CODES.pipelineExample} language="python" filename="pipeline_example.py" />
      </div>

      <div id="doc-requirements" style={{ scrollMarginTop: 72 }}>
        <H2 id="requirements">Requirements</H2>
        <ul style={LIST_STYLE}>
          <li>Python 3.7+</li>
          <li>sentencepiece</li>
          <li>torch (for model-based POS / NER components if enabled in your package build)</li>
        </ul>
      </div>

      <div id="doc-license" style={{ scrollMarginTop: 72 }}>
        <H2 id="license">License</H2>
        <P>MIT</P>
      </div>
    </div>
  )
}