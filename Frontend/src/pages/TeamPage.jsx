import MemberItem  from '../components/MemberItem'
import SimpleButton from '../components/SimpleButton'
import { teamMembers, projectCredits } from '../data/team'

export default function TeamPage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#250735',
            marginBottom: 8,
            letterSpacing: '-0.02em',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          Team
        </h1>
        <p
          style={{
            fontSize: 14.5,
            color: '#6b7280',
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          The people behind NPLTK — contributors, researchers, and maintainers.
        </p>
        <p
          style={{
            fontSize: 13.5,
            color: '#6b7280',
            marginTop: 8,
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          Credits: {projectCredits.join(', ')}
        </p>
      </div>

      {/* Members grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1px',
          background: '#e5e7eb',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {teamMembers.map((member) => (
          <MemberItem key={member.name} {...member} />
        ))}
      </div>

      {/* Contribute CTA */}
      <div
        style={{
          marginTop: 48,
          padding: 24,
          background: '#f8f8f9',
          borderRadius: 6,
          border: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 500,
            marginBottom: 6,
            fontFamily: 'IBM Plex Sans, sans-serif',
            color: '#111118',
          }}
        >
          Become a contributor
        </div>
        <p
          style={{
            fontSize: 13.5,
            color: '#6b7280',
            lineHeight: 1.65,
            marginBottom: 14,
            fontFamily: 'IBM Plex Sans, sans-serif',
          }}
        >
          NPLTK is built by volunteers. If you are a linguist, developer, or
          researcher interested in Nepali NLP, we would love your help.
        </p>
        <SimpleButton
          variant="outline"
          size="sm"
          href="https://github.com/anurag3345/npltk"
        >
          Contribute on GitHub →
        </SimpleButton>
      </div>
    </div>
  )
}
