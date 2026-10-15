import { useState } from 'react'
import { ArrowRight, BookOpen, Compass, Flame, KeyRound, LockKeyhole, Mail, Sparkles, WandSparkles } from 'lucide-react'
import { useAuth, type AvatarId, type Language } from '../lib/auth'

export function AuthGateway() {
  const { hasSupabase, signIn, signUp, startPreview } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('demo@dsaverse.test')
  const [password, setPassword] = useState('Demo123!')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true); setError(''); setNotice('')
    try {
      if (mode === 'signup') {
        const needsConfirmation = await signUp(email, password, name)
        if (needsConfirmation) setNotice('Check your inbox to confirm your email, then come back and sign in.')
      } else await signIn(email, password)
    } catch (authError) { setError(authError instanceof Error ? authError.message : 'Something went wrong. Try again.') }
    finally { setBusy(false) }
  }

  return <main className="academy-entry">
    <div className="entry-backdrop"><i /><i /><i /><div className="entry-glyph">✳</div></div>
    <header className="entry-brand"><span className="academy-sigil"><Sparkles size={20} /></span><span>DSA<span>verse</span><small>THE ARCANE ACADEMY OF ALGORITHMS</small></span></header>
    <div className="entry-layout"><section className="entry-story"><span className="story-kicker"><i /> YOUR FIRST SPELL STARTS HERE</span><h1>Master the logic.<br /><em>Unlock the realm.</em></h1><p>Every great coder begins with one curious question. Enter the Academy, find your path, and make algorithms feel like second nature.</p><div className="story-map"><div className="story-orbit orbit-a" /><div className="story-orbit orbit-b" /><div className="story-portal"><Sparkles size={28} /></div><span className="story-star star-one">✦</span><span className="story-star star-two">✧</span><span className="story-star star-three">✦</span><span className="map-caption">LOGIC FOREST <i /> WORLD 01</span></div><div className="story-foot"><span><LockKeyhole size={13} /> Your progress is yours alone</span><span>Built for curious minds</span></div></section>
      <section className="auth-panel"><div className="auth-panel-head"><span className="auth-icon"><KeyRound size={17} /></span><div><h2>{mode === 'signup' ? 'Create your apprentice account' : 'Demo Login'}</h2><p>{mode === 'signup' ? 'Your own profile. Your own journey.' : 'Use the sample credentials or continue as a guest.'}</p></div></div>
        <div className="demo-mode-notice"><Sparkles size={15} /><span><strong>DEMO MODE</strong> — data is stored only in this browser.</span></div>
        {mode === 'login' && <div className="demo-credentials"><span>DEMO CREDENTIALS</span><strong>demo@dsaverse.test</strong><strong>Demo123!</strong></div>}
        {hasSupabase && <div className="auth-tabs"><button className={mode === 'signup' ? 'auth-tab-active' : ''} onClick={() => { setMode('signup'); setError(''); setNotice('') }}>Create account</button><button className={mode === 'login' ? 'auth-tab-active' : ''} onClick={() => { setMode('login'); setError(''); setNotice('') }}>Sign in</button></div>}
        <form className="auth-form" onSubmit={submit}>{mode === 'signup' && <label>APPRENTICE NAME<div className="auth-input"><Compass size={15} /><input required maxLength={40} value={name} onChange={(event) => setName(event.target.value)} placeholder="What should we call you?" /></div></label>}<label>EMAIL ADDRESS<div className="auth-input"><Mail size={15} /><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div></label><label>PASSWORD<div className="auth-input"><LockKeyhole size={15} /><input required minLength={8} type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></div></label>{error && <p className="auth-feedback auth-error" role="alert">{error}</p>}{notice && <p className="auth-feedback auth-notice" role="status">{notice}</p>}<button className="auth-submit" disabled={busy || (mode === 'signup' && !hasSupabase)}>{busy ? 'Opening the Academy...' : mode === 'signup' ? 'Begin your journey' : 'Demo Login'}<ArrowRight size={16} /></button></form>
        <div className="auth-divider"><span /> or <span /></div><button className="preview-entry" onClick={() => startPreview('guest')}><Sparkles size={15} /> Continue as Guest <ArrowRight size={14} /></button><p className="preview-boundary">This is a local demo, not real authentication or cloud storage. Your demo and guest progress stay in this browser.</p>
      </section></div>
    <footer className="entry-footer"><span>DSAverse <i>•</i> The Arcane Academy of Algorithms</span><span>Logic first. Magic follows.</span></footer>
  </main>
}

const avatarOptions: { id: AvatarId; label: string; icon: typeof Sparkles }[] = [
  { id: 'apprentice', label: 'Apprentice', icon: Sparkles },
  { id: 'scholar', label: 'Scholar', icon: BookOpen },
  { id: 'wayfinder', label: 'Wayfinder', icon: Compass },
  { id: 'spark', label: 'Spark', icon: Flame },
]

export function OnboardingScreen() {
  const { isPreview, profile, saveOnboarding, user } = useAuth()
  const [name, setName] = useState(profile?.display_name ?? String(user?.user_metadata.display_name ?? ''))
  const [language, setLanguage] = useState<Language>(profile?.language ?? 'EN')
  const [avatar, setAvatar] = useState<AvatarId>(profile?.avatar ?? 'apprentice')
  const [goal, setGoal] = useState<number | null>(profile?.daily_goal_minutes ?? 25)
  const [assessment, setAssessment] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const assessmentCorrect = assessment === 'sequence'

  const begin = async () => {
    if (!name.trim()) { setError('Choose a name for your apprentice first.'); return }
    setBusy(true); setError('')
    try { await saveOnboarding({ display_name: name.trim(), language, avatar, daily_goal_minutes: goal, assessment_score: assessment === null ? null : Number(assessmentCorrect) }) }
    catch (saveError) { setError(saveError instanceof Error ? saveError.message : 'Could not save your profile.') }
    finally { setBusy(false) }
  }

  return <main className="academy-entry onboarding-entry"><div className="entry-backdrop"><i /><i /><i /><div className="entry-glyph">✳</div></div><header className="entry-brand"><span className="academy-sigil"><Sparkles size={20} /></span><span>DSA<span>verse</span><small>THE ARCANE ACADEMY OF ALGORITHMS</small></span></header><section className="onboarding-panel"><div className="onboarding-kicker"><span>FIRST STEPS</span><i /> WORLD 01 · LOGIC FOREST</div><h1>{isPreview ? 'Set up your demo apprentice.' : 'Let’s shape your journey.'}</h1><p className="onboarding-subtitle">{isPreview ? 'This profile and progress stay separate from account data.' : 'A few quick choices. You can change these later.'}</p>
    <label className="onboarding-name">APPRENTICE NAME<input maxLength={40} value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label>
    <div className="onboarding-section"><span>CHOOSE YOUR AVATAR</span><div className="avatar-options">{avatarOptions.map(({ id, label, icon: Icon }) => <button key={id} className={avatar === id ? 'avatar-option avatar-picked' : 'avatar-option'} onClick={() => setAvatar(id)}><i><Icon size={19} /></i><span>{label}</span></button>)}</div></div>
    <div className="onboarding-split"><div className="onboarding-section"><span>LEARNING LANGUAGE</span><div className="language-options"><button className={language === 'EN' ? 'language-picked' : ''} onClick={() => setLanguage('EN')}>English</button><button className={language === 'HI' ? 'language-picked' : ''} onClick={() => setLanguage('HI')}>Hinglish</button></div></div><div className="onboarding-section"><span>DAILY GOAL <small>OPTIONAL</small></span><div className="goal-options">{[15, 25, 45].map((value) => <button key={value} className={goal === value ? 'goal-picked' : ''} onClick={() => setGoal(goal === value ? null : value)}>{value}m</button>)}</div></div></div>
    <details className="assessment"><summary><WandSparkles size={15} /> Optional: take a one-question warm-up <span>skip anytime</span></summary><p>In a sequence of steps, what makes an algorithm stop repeating?</p><div className="assessment-options">{[{ id: 'more', label: 'Add more steps' }, { id: 'sequence', label: 'A condition becomes false' }, { id: 'random', label: 'A random pause' }].map((option) => <button key={option.id} className={assessment === option.id ? 'assessment-picked' : ''} onClick={() => setAssessment(option.id)}>{option.label}</button>)}</div>{assessment !== null && <small>{assessmentCorrect ? 'Exactly. A stopping condition prevents an endless loop.' : 'Not quite. A loop ends when its condition becomes false.'}</small>}</details>
    {error && <p className="auth-feedback auth-error" role="alert">{error}</p>}<button className="auth-submit onboarding-submit" disabled={busy} onClick={() => void begin()}>{busy ? 'Saving your journey...' : 'Enter Logic Forest'}<ArrowRight size={16} /></button><div className="onboarding-safe"><LockKeyhole size={12} /> {isPreview ? 'Preview only · no account required' : 'Profile and progress are private to your account'}</div>
  </section><footer className="entry-footer"><span>DSAverse <i>•</i> The Arcane Academy of Algorithms</span><span>Every expert started somewhere.</span></footer></main>
}