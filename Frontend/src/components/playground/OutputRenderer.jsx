import SectionTitle from './SectionTitle'
import TokenList from './TokenList'
import RowsCard from './RowsCard'
import Row from './Row'
import InfoCard from './InfoCard'
import Badge from './Badge'
import PipelineRenderer from './PipelineRenderer'

export default function OutputRenderer({ feature, data }) {
  if (!data) {
    return (
      <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
        Output will appear here after you press Run.
      </span>
    )
  }

  if (feature === 'pipeline') {
    return <PipelineRenderer data={data} />
  }

  if (feature === 'tokenizer') {
    return (
      <div>
        <SectionTitle>Tokens</SectionTitle>
        <TokenList items={data.tokens} emptyText="No tokens found." />
      </div>
    )
  }

  if (feature === 'stopwords') {
    return (
      <div style={{ display: 'grid', gap: 20 }}>
        <div>
          <SectionTitle>Filtered Tokens</SectionTitle>
          <TokenList items={data.filtered_tokens} emptyText="No filtered tokens found." />
        </div>

        <div>
          <SectionTitle>Removal Info</SectionTitle>
          <InfoCard>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              <Badge tone="red">Removed: {data.info?.removed_count ?? 0}</Badge>
              <Badge tone={data.info?.changed ? 'green' : 'default'}>
                Changed: {data.info?.changed ? 'Yes' : 'No'}
              </Badge>
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#6b7280',
                  marginBottom: 8,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                Removed Words
              </div>
              <TokenList
                items={data.info?.removed_words}
                emptyText="No stop words removed."
              />
            </div>
          </InfoCard>
        </div>
      </div>
    )
  }

  if (feature === 'lemmatizer') {
    return (
      <div>
        <SectionTitle>Lemmas</SectionTitle>
        <TokenList items={data.lemmas} emptyText="No lemmas found." />
      </div>
    )
  }

  if (feature === 'pos') {
    return (
      <div>
        <SectionTitle>POS Tags</SectionTitle>
        <RowsCard>
          {data.pos_tags?.length ? (
            data.pos_tags.map((item, index) => (
              <Row
                key={`${item.token}-${index}`}
                left={item.token}
                right={item.tag}
                rightTone="purple"
              />
            ))
          ) : (
            <div style={{ padding: '14px 0', color: '#9ca3af' }}>No POS tags found.</div>
          )}
        </RowsCard>
      </div>
    )
  }

  if (feature === 'ner') {
    return (
      <div style={{ display: 'grid', gap: 20 }}>
        <div>
          <SectionTitle>NER Tags</SectionTitle>
          <RowsCard>
            {data.ner_tags?.length ? (
              data.ner_tags.map((item, index) => (
                <Row
                  key={`${item.token}-${index}`}
                  left={item.token}
                  right={item.tag}
                  rightTone="purple"
                />
              ))
            ) : (
              <div style={{ padding: '14px 0', color: '#9ca3af' }}>No NER tags found.</div>
            )}
          </RowsCard>
        </div>

        <div>
          <SectionTitle>Entities</SectionTitle>
          <InfoCard>
            {data.entities?.length ? (
              <div style={{ display: 'grid', gap: 10 }}>
                {data.entities.map((entity, index) => (
                  <div
                    key={`${entity.text}-${index}`}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: 12,
                      background: '#ffffff',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: '#111118',
                          fontFamily: 'IBM Plex Sans, sans-serif',
                        }}
                      >
                        {entity.text}
                      </span>
                      <Badge tone="green">{entity.label}</Badge>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        flexWrap: 'wrap',
                        fontSize: 12.5,
                        color: '#6b7280',
                        fontFamily: 'IBM Plex Mono, monospace',
                      }}
                    >
                      <span>start: {entity.start}</span>
                      <span>end: {entity.end}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ color: '#9ca3af' }}>No entities found.</span>
            )}
          </InfoCard>
        </div>
      </div>
    )
  }

  return (
    <pre
      style={{
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}