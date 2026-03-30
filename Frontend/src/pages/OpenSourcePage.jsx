import CodeBlock    from '../components/CodeBlock'
import SimpleButton  from '../components/SimpleButton'

const LICENSE_TEXT = `MIT License
Copyright © 2025 NPLTK Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...`

export default function OpenSourcePage() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 24px' }}>

      <h1
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: '#250735',
          marginBottom: 12,
          letterSpacing: '-0.02em',
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        Open Source
      </h1>

      <p
        style={{
          fontSize: 16,
          color: '#6b7280',
          lineHeight: 1.6,
          marginBottom: 48,
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        NPLTK is free, open-source software maintained by a community of linguists
        and engineers passionate about the Nepali language.
      </p>

      {/* What is NPLTK */}
      <Section title="What is NPLTK?">
        <P>
          NPLTK (Nepali Language Toolkit) is a Python library for natural language
          processing of Nepali text. It provides modular, composable tools for
          tokenization, morphological analysis, part-of-speech tagging, and named
          entity recognition — without requiring cloud APIs or external services.
        </P>
      </Section>

      {/* Why open source */}
      <Section title="Why open source?">
        <P>
          NLP resources for Nepali are scarce and often locked behind proprietary
          systems. We believe language tools should be a public good — freely
          available to researchers, developers, educators, and anyone building
          applications for Nepali speakers.
        </P>
        <P>
          Open-sourcing NPLTK means the community can audit models, improve accuracy,
          add new features, and build on top of it without restriction.
        </P>
      </Section>

      {/* How to contribute */}
      <Section title="How to contribute">
        <ol style={{ listStyle: 'none', margin: '14px 0', counterReset: 'steps' }}>
          {[
            'Fork the repository on GitHub and clone it locally.',
            'Read CONTRIBUTING.md for code style and workflow guidelines.',
            'Open an issue to discuss your proposed change before submitting a PR.',
            'Submit a pull request with tests and documentation updates included.',
            'Participate in code review — all feedback is respectful and constructive.',
          ].map((step, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                marginBottom: 10,
                fontSize: 14,
                color: '#374151',
                fontFamily: 'IBM Plex Sans, sans-serif',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#250735',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 1,
                }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      {/* Ways to help */}
      <Section title="Ways to help">
        <P>Code is not the only contribution. You can also help by:</P>
        <ul style={{ listStyle: 'none', marginTop: 10 }}>
          {[
            'Annotating training data for NER and POS tagging',
            'Reporting bugs and edge cases via GitHub Issues',
            'Improving documentation and adding translations',
            'Sharing the project with the NLP and Nepali dev community',
            'Donating compute resources for model training',
          ].map((item) => (
            <li
              key={item}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                fontSize: 14,
                color: '#374151',
                marginBottom: 7,
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              <span style={{ color: '#b800d8', marginTop: 2 }}>–</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* License */}
      <Section title="License">
        <div
          style={{
            background: '#f8f8f9',
            border: '1px solid #e5e7eb',
            borderRadius: 5,
            padding: '14px 18px',
            fontSize: 12.5,
            color: '#6b7280',
            fontFamily: 'IBM Plex Mono, monospace',
            lineHeight: 1.65,
            whiteSpace: 'pre-wrap',
          }}
        >
          {LICENSE_TEXT}
        </div>
      </Section>

      {/* CTAs */}
      <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <SimpleButton variant="primary" href="https://github.com/anurag3345/npltk">
          <GitHubIcon /> View on GitHub
        </SimpleButton>
        <SimpleButton variant="outline" href="https://github.com/anurag3345/npltk/blob/main/CONTRIBUTING.md">
          Read CONTRIBUTING.md
        </SimpleButton>
      </div>
    </div>
  )
}

/* ── local helpers ── */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
          color: '#250735',
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function P({ children }) {
  return (
    <p
      style={{
        fontSize: 14.5,
        color: '#374151',
        lineHeight: 1.75,
        marginBottom: 10,
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}
    >
      {children}
    </p>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
