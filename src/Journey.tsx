import { useEffect, useState } from 'react'
import { AlertTriangle, ArrowRight, LoaderCircle, LogOut } from 'lucide-react'
import { AuthGateway, OnboardingScreen } from './components/AuthScreens'
import { GameBoard } from './components/GameBoard'
import App from './App'
import { AuthProvider, useAuth } from './lib/auth'

function JourneyGate() {
  const auth = useAuth()
  const [showHub, setShowHub] = useState(false)
  const [hubXp, setHubXp] = useState(0)
  useEffect(() => { setShowHub(false); setHubXp(0) }, [auth.profile?.id])
  if (auth.loading) return <main className="journey-loading"><span><LoaderCircle size={22} /></span><p>Restoring your place in the Academy...</p></main>
  if (!auth.user && !auth.isPreview) return <AuthGateway />
  if (auth.user && !auth.profile) return <main className="journey-error"><div><AlertTriangle size={22} /></div><span>PROFILE CONNECTION NEEDS ATTENTION</span><h1>Your account is safe.</h1><p>We couldn't load the profile table. Apply the Supabase migration in <code>supabase/migrations</code>, then reload. Your sign-in session has not been reset.</p><button onClick={() => window.location.reload()}>Retry connection <ArrowRight size={15} /></button><button className="journey-signout" onClick={() => void auth.signOut()}><LogOut size={14} /> Sign out</button></main>
  if (!auth.profile?.onboarding_complete) return <OnboardingScreen />
  const exit = () => { if (auth.isPreview) auth.exitPreview(); else void auth.signOut() }
  if (showHub) return <App initialLanguage={auth.profile.language} initialXp={hubXp} demoMode={auth.isPreview} onLanguageChange={auth.setLanguage} onReturnToAcademy={() => setShowHub(false)} onExit={exit} />
  return <GameBoard profile={auth.profile} userId={auth.isPreview ? auth.profile.id : auth.user?.id ?? null} preview={auth.isPreview} onLanguageChange={auth.setLanguage} onOpenHub={(xp) => { setHubXp(xp); setShowHub(true) }} onExit={exit} />
}

export default function Journey() {
  return <AuthProvider><JourneyGate /></AuthProvider>
}