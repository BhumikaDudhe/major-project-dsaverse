import { useState } from 'react'
import { AlertCircle, ArrowRight, Compass, KeyRound, Mail, Sparkles, UserCheck } from 'lucide-react'
import { useAuth } from '../lib/auth'

const HOUSES = [
  {
    id: 'Gryffindor',
    name: 'Gryffindor',
    trait: 'Brave & Chivalrous',
    crest: '🦁',
    color: '#e11d48',
    avatar: 'scholar'
  },
  {
    id: 'Slytherin',
    name: 'Slytherin',
    trait: 'Cunning & Ambitious',
    crest: '🐍',
    color: '#10b981',
    avatar: 'spark'
  },
  {
    id: 'Ravenclaw',
    name: 'Ravenclaw',
    trait: 'Wise & Analytical',
    crest: '🦅',
    color: '#38bdf8',
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
  const auth = useAuth()
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
        if (result.error) {
          setError(result.error)
        }
      } else {
        const result = await auth.signUp(email, password)
        if (result.error) {
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

        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '22px', fontWeight: 800, margin: '4px 0 16px', color: '#f7f4e9' }}>
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
              border: `1px solid ${mode === 'signin' ? '#92e2b0' : 'rgba(188, 222, 196, 0.14)'}`,
              background: mode === 'signin' ? 'rgba(146, 226, 176, 0.12)' : '#141c19',
              color: mode === 'signin' ? '#92e2b0' : '#8fa394',
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
              border: `1px solid ${mode === 'signup' ? '#92e2b0' : 'rgba(188, 222, 196, 0.14)'}`,
              background: mode === 'signup' ? 'rgba(146, 226, 176, 0.12)' : '#141c19',
              color: mode === 'signup' ? '#92e2b0' : '#8fa394',
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
            <label style={{ display: 'block', color: '#8fa394', fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.8px', marginBottom: '6px' }}>
              WIZARD EMAIL
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={15} style={{ position: 'absolute', left: '12px', color: '#5c6b61' }} />
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
                  border: '1px solid rgba(188, 222, 196, 0.2)',
                  background: '#0d1211',
                  color: '#f7f4e9',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#8fa394', fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.8px', marginBottom: '6px' }}>
              SECRET CIPHER (PASSWORD)
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <KeyRound size={15} style={{ position: 'absolute', left: '12px', color: '#5c6b61' }} />
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
                  border: '1px solid rgba(188, 222, 196, 0.2)',
                  background: '#0d1211',
                  color: '#f7f4e9',
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
            <div style={{ padding: '8px 10px', background: 'rgba(146, 226, 176, 0.12)', border: '1px solid rgba(146, 226, 176, 0.3)', borderRadius: '6px', color: '#92e2b0', fontSize: '11px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0', color: '#5c6b61', fontSize: '10px' }}>
          <span style={{ flex: 1, height: '1px', background: 'rgba(188, 222, 196, 0.1)' }} />
          <span>OR</span>
          <span style={{ flex: 1, height: '1px', background: 'rgba(188, 222, 196, 0.1)' }} />
        </div>

        <button
          type="button"
          onClick={() => auth.enterPreview()}
          style={{
            width: '100%',
            height: '38px',
            borderRadius: '6px',
            border: '1px solid rgba(239, 210, 142, 0.3)',
            background: 'rgba(239, 210, 142, 0.08)',
            color: '#efd28e',
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
  const auth = useAuth()
  const [name, setName] = useState(auth.profile?.display_name || '')
  const [selectedHouse, setSelectedHouse] = useState<string>('Gryffindor')
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN')
  const [submitting, setSubmitting] = useState(false)

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    const houseObj = HOUSES.find((h) => h.id === selectedHouse) || HOUSES[0]

    await auth.updateProfile({
      display_name: name.trim(),
      language,
      avatar: houseObj.avatar,
      house: houseObj.id,
      onboarding_complete: true
    })
    setSubmitting(false)
  }

  return (
    <div className="academy-entry" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div className="auth-panel" style={{ width: 'min(580px, 100%)', padding: '32px' }}>
        <div className="dash-eyebrow" style={{ marginBottom: '10px' }}>
          <span className="dash-eyebrow-dot" />
          <span>THE SORTING CEREMONY • ACADEMY ENROLLMENT</span>
        </div>

        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '26px', fontWeight: 800, margin: '4px 0 8px', color: '#f7f4e9' }}>
          Welcome to the Arcane Academy
        </h1>
        <p style={{ color: '#8fa394', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
          Before taking your seat in the Grand Hall, inscribe your wizard moniker and step forward to be sorted into your House.
        </p>

        <form onSubmit={handleComplete} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
          <div>
            <label style={{ display: 'block', color: '#8fa394', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.8px', marginBottom: '6px' }}>
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
                border: '1px solid rgba(188, 222, 196, 0.2)',
                background: '#0d1211',
                color: '#f7f4e9',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#8fa394', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.8px', marginBottom: '8px' }}>
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
                      border: `1px solid ${isSelected ? h.color : 'rgba(188, 222, 196, 0.14)'}`,
                      background: isSelected ? `${h.color}15` : '#141c19',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: '0.2s'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{h.crest}</span>
                    <div>
                      <strong style={{ display: 'block', color: isSelected ? '#f7f4e9' : '#cfd8d2', fontSize: '13px' }}>
                        {h.name}
                      </strong>
                      <span style={{ display: 'block', color: isSelected ? h.color : '#798a7e', fontSize: '10px' }}>
                        {h.trait}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#8fa394', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.8px', marginBottom: '8px' }}>
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
                  border: `1px solid ${language === 'EN' ? '#92e2b0' : 'rgba(188, 222, 196, 0.14)'}`,
                  background: language === 'EN' ? 'rgba(146, 226, 176, 0.12)' : '#141c19',
                  color: language === 'EN' ? '#92e2b0' : '#8fa394',
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
                  border: `1px solid ${language === 'HI' ? '#92e2b0' : 'rgba(188, 222, 196, 0.14)'}`,
                  background: language === 'HI' ? 'rgba(146, 226, 176, 0.12)' : '#141c19',
                  color: language === 'HI' ? '#92e2b0' : '#8fa394',
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
            style={{ width: '100%', height: '44px', fontSize: '12px', marginTop: '8px' }}
          >
            {submitting ? 'Sorting into House...' : 'Don the Sorting Hat & Enter Academy'} <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  )
}
