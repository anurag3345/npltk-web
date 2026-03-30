import SectionTitle from './SectionTitle'
import TokenList from './TokenList'
import InfoCard from './InfoCard'
import RowsCard from './RowsCard'
import Row from './Row'
import Badge from './Badge'

export default function PipelineRenderer({ data }) {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <SectionTitle>Text</SectionTitle>
        <InfoCard>
          <div style={{ display: 'grid', gap: 10 }}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#6b7280',
                  marginBottom: 4,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                Original Text
              </div>
              <div
                style={{
                  color: '#111118',
                  fontSize: 14,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                {data.original_text || '-'}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#6b7280',
                  marginBottom: 4,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                Normalized Text
              </div>
              <div
                style={{
                  color: '#111118',
                  fontSize: 14,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                {data.normalized_text || '-'}
              </div>
            </div>
          </div>
        </InfoCard>
      </div>

      <div>
        <SectionTitle>Tokens</SectionTitle>
        <TokenList items={data.tokens} emptyText="No tokens found." />
      </div>

      <div>
        <SectionTitle>Filtered Tokens</SectionTitle>
        <TokenList items={data.filtered_tokens} emptyText="No filtered tokens found." />
      </div>

      <div>
        <SectionTitle>Stop Word Info</SectionTitle>
        <InfoCard>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <Badge tone="red">Removed: {data.stopword_info?.removed_count ?? 0}</Badge>
            <Badge tone={data.stopword_info?.changed ? 'green' : 'default'}>
              Changed: {data.stopword_info?.changed ? 'Yes' : 'No'}
            </Badge>
          </div>

          <TokenList
            items={data.stopword_info?.removed_words}
            emptyText="No stop words removed."
          />
        </InfoCard>
      </div>

      <div>
        <SectionTitle>Lemmas</SectionTitle>
        <TokenList items={data.lemmas} emptyText="No lemmas found." />
      </div>

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