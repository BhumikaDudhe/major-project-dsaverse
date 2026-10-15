import { useEffect, useState } from 'react'
import { AlertTriangle, ArrowRight, LoaderCircle, LogOut } from 'lucide-react'
import { AuthGateway, OnboardingScreen } from './components/AuthScreens'
import App from './App'
import { AuthProvider, useAuth } from './lib/auth'

function JourneyGate() {
  const auth = useAuth()
  const [hubXp, setHubXp] = useState(0)

  useEffect(() => {
    setHubXp(auth.profile?.assessment_score ? auth.profile.assessment_score * 50 : 100)
  }, [auth.profile?.id])

  if (auth.loading) {
    return (
      <main className="journey-loading">
        <span><LoaderCircle size={22} className="animate-spin" /></span>
        <p>Entering the Arcane Academy of Algorithms...</p>
      </main>
    )
  }

  // 1. First: Require Login with Email & Password or Demo
  if (!auth.user && !auth.isPreview) {
    return <AuthGateway />
  }

  if (auth.user && !auth.profile) {
    return (
      <main className="journey-error">
        <div><AlertTriangle size={22} /></div>
        <span>PROFILE CONNECTION PENDING</span>
        <h1>Welcome to the Academy.</h1>
        <p>Connecting your wizard profile to the local spellbook. Click retry below.</p>
        <button onClick={() => window.location.reload()}>
          Enter Academy <ArrowRight size={15} />
        </button>
        <button className="journey-signout" onClick={() => void auth.signOut()}>
          <LogOut size={14} /> Sign out
        </button>
      </main>
    )
  }

  if (!auth.profile?.onboarding_complete) {
    return <OnboardingScreen />
  }

  const exit = () => {
    if (auth.isPreview) auth.exitPreview()
    else void auth.signOut()
  }

  // 2. Straight to Dashboard / App Hub
  return (
    <App
      initialLanguage={auth.profile.language}
      initialXp={hubXp}
      demoMode={auth.isPreview}
      onLanguageChange={auth.setLanguage}
      onReturnToAcademy={() => {}}
      onExit={exit}
    />
  )
}

export default function Journey() {
  return (
    <AuthProvider>
      <JourneyGate />
    </AuthProvider>
  )
}