import { useEffect, useState } from 'react'
import { AlertCircle, ArrowRight, Compass, KeyRound, Mail, Sparkles } from 'lucide-react'
import { useAuth } from '../lib/auth'

const HOUSES = [
  {
    id: 'Gryffindor',
    name: 'Gryffindor',
    trait: 'Brave & Chivalrous',
    crest: '🦁',
    color: '#f87171',
    avatar: 'scholar'
  },
  {
    id: 'Slytherin',
    name: 'Slytherin',
    trait: 'Cunning & Ambitious',
    crest: '🐍',
    color: '#92e2b0',
    avatar: 'spark'
  },
  {
    id: 'Ravenclaw',
    name: 'Ravenclaw',
    trait: 'Wise & Analytical',
    crest: '🦅',
    color: '#60a5fa',
    avatar: 'scholar'
  },
  {
    id: 'Hufflepuff',
    name: 'Hufflepuff',
    trait: 'Loyal & Patient',
    crest: '🦡',
    color: '#facc15',
    avatar: 'wayfinder'
  }
] as const

export function AuthGateway() {
  const auth = useAuth() as any
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setLoading(true)

    try {
      if (mode === 'signin') {
        const result = await auth.signIn(email, password)
        if (result && typeof result === 'object' && 'error' in result && result.error) {
          setError(result.error)
        }
      } else {
        const result =
          typeof auth.signUp === 'function' && auth.signUp.length >= 3
            ? await auth.signUp(email, password, 'Apprentice Wizard')
            : await auth.signUp(email, password)

        if (result && typeof result === 'object' && 'error' in result && result.error) {
          setError(result.error)
        } else {
          setNotice('Verification rune sent. Please check your email to activate your spellbook.')
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication incantation failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="academy-entry" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div className="auth-panel" style={{ width: 'min(440px, 100%)', padding: '32px' }}>
        <div className="brand-lockup" style={{ padding: 0, height: 'auto', marginBottom: '20px' }}>
          <div className="brand-mark">
            <Compass size={18} />
          </div>
          <div>
            <span>
              DSA<span className="brand-accent">verse</span>
            </span>
            <small>THE ARCANE ACADEMY OF ALGORITHMS</small>
          </div>
        </div>

        <div className="dash-eyebrow" style={{ marginBottom: '8px' }}>
          <span className="dash-eyebrow-dot" />
          <span>PORTAL AUTHENTICATION</span>
        </div>

        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '22px', fontWeight: 800, margin: '4px 0 16px', color: 'var(--text-main)' }}>
          {mode === 'signin' ? 'Unlock the Spellbook' : 'Enroll in the Academy'}
        </h1>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setMode('signin')}
            style={{
              flex: 1,
              height: '34px',
              borderRadius: '6px',
              border: `1px solid ${mode === 'signin' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
              background: mode === 'signin' ? 'var(--accent-primary-dim)' : 'var(--bg-surface-elevated)',
              color: mode === 'signin' ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              height: '34px',
              borderRadius: '6px',
              border: `1px solid ${mode === 'signup' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
              background: mode === 'signup' ? 'var(--accent-primary-dim)' : 'var(--bg-surface-elevated)',
              color: mode === 'signup' ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.8px', marginBottom: '6px' }}>
              WIZARD EMAIL
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-dim)' }} />
              <input
                type="email"
                required
                placeholder="wizard@arcane.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px 0 36px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-editor)',
                  color: 'var(--text-main)',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.8px', marginBottom: '6px' }}>
              SECRET CIPHER (PASSWORD)
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <KeyRound size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-dim)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px 0 36px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-editor)',
                  color: 'var(--text-main)',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {error && (
            <div style={{ padding: '8px 10px', background: 'rgba(216, 141, 116, 0.12)', border: '1px solid rgba(216, 141, 116, 0.3)', borderRadius: '6px', color: '#d88d74', fontSize: '11px', display: 'flex', gap: '6px', alignItems: 'center' }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {notice && (
            <div style={{ padding: '8px 10px', background: 'var(--accent-primary-dim)', border: '1px solid var(--border-medium)', borderRadius: '6px', color: 'var(--accent-primary)', fontSize: '11px' }}>
              {notice}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="button button-primary"
            style={{ width: '100%', height: '42px', fontSize: '12px', marginTop: '6px' }}
          >
            {loading ? 'Casting Gate Spell...' : mode === 'signin' ? 'Enter Academy Portal' : 'Inscribe Membership'} <ArrowRight size={14} />
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0', color: 'var(--text-dim)', fontSize: '10px' }}>
          <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          <span>OR</span>
          <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>

        <button
          type="button"
          onClick={() => {
            if (typeof auth.enterPreview === 'function') {
              auth.enterPreview()
            }
          }}
          style={{
            width: '100%',
            height: '38px',
            borderRadius: '6px',
            border: '1px solid var(--border-medium)',
            background: 'var(--accent-rune-dim)',
            color: 'var(--accent-rune)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={14} /> Enter as Demo Apprentice
        </button>
      </div>
    </div>
  )
}

export function OnboardingScreen() {
  const auth = useAuth() as any
  const [name, setName] = useState(auth.profile?.display_name || '')
  const [selectedHouse, setSelectedHouse] = useState<string>('Gryffindor')
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN')
  const [submitting, setSubmitting] = useState(false)

  // Live-sync document theme whenever the user clicks a house in the Sorting Ceremony
  useEffect(() => {
    const houseKey = selectedHouse.toLowerCase()
    document.documentElement.setAttribute('data-house', houseKey)
    document.body.setAttribute('data-house', houseKey)
  }, [selectedHouse])

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    const houseObj = HOUSES.find((h) => h.id === selectedHouse) || HOUSES[0]

    if (typeof auth.updateProfile === 'function') {
      await auth.updateProfile({
        display_name: name.trim(),
        language,
        avatar: houseObj.avatar,
        house: houseObj.id,
        onboarding_complete: true
      })
    }
    setSubmitting(false)
  }

  return (
    <div
      className="academy-entry"
      data-house={selectedHouse.toLowerCase()}
      style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}
    >
      <div className="auth-panel" style={{ width: 'min(580px, 100%)', padding: '32px' }}>
        <div className="dash-eyebrow" style={{ marginBottom: '10px' }}>
          <span className="dash-eyebrow-dot" />
          <span>THE SORTING CEREMONY • ACADEMY ENROLLMENT</span>
        </div>

        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '26px', fontWeight: 800, margin: '4px 0 8px', color: 'var(--text-main)' }}>
          Welcome to the Arcane Academy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
          Before taking your seat in the Grand Hall, inscribe your wizard moniker and step forward to be sorted into your House.
        </p>

        <form onSubmit={handleComplete} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.8px', marginBottom: '6px' }}>
              WIZARD MONIKER
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Harry Potter, Hermione Granger..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-editor)',
                color: 'var(--text-main)',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.8px', marginBottom: '8px' }}>
              CHOOSE YOUR HOUSE
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {HOUSES.map((h) => {
                const isSelected = selectedHouse === h.id
                return (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHouse(h.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: `1px solid ${isSelected ? h.color : 'var(--border-subtle)'}`,
                      background: isSelected ? `${h.color}1c` : 'var(--bg-surface-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: isSelected ? `0 0 16px ${h.color}33` : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{h.crest}</span>
                    <div>
                      <strong style={{ display: 'block', color: isSelected ? '#ffffff' : 'var(--text-muted)', fontSize: '13px' }}>
                        {h.name}
                      </strong>
                      <span style={{ display: 'block', color: isSelected ? h.color : 'var(--text-dim)', fontSize: '10px' }}>
                        {h.trait}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.8px', marginBottom: '8px' }}>
              PREFERRED DIALECT (LANGUAGE)
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setLanguage('EN')}
                style={{
                  flex: 1,
                  height: '36px',
                  borderRadius: '6px',
                  border: `1px solid ${language === 'EN' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  background: language === 'EN' ? 'var(--accent-primary-dim)' : 'var(--bg-surface-elevated)',
                  color: language === 'EN' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('HI')}
                style={{
                  flex: 1,
                  height: '36px',
                  borderRadius: '6px',
                  border: `1px solid ${language === 'HI' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  background: language === 'HI' ? 'var(--accent-primary-dim)' : 'var(--bg-surface-elevated)',
                  color: language === 'HI' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                हिंदी (Hinglish)
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="button button-primary"
            style={{
              width: '100%',
              height: '44px',
              fontSize: '12px',
              marginTop: '8px'
            }}
          >
            {submitting ? 'Sorting into House...' : 'Don the Sorting Hat & Enter Academy'} <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  )
}