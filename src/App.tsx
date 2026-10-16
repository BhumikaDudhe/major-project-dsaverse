import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { Dashboard } from './components/Dashboard'
import { LearningPath } from './components/LearningPath'
import { Visualizer } from './components/Visualizer'
import { Arena } from './components/Arena'
import { Quests } from './components/Quests'
import { StudyPlanner } from './components/StudyPlanner'
import { Mentor } from './components/Mentor'
import { GameBoard } from './components/GameBoard'
import { GrimoireBuilder } from './components/GrimoireBuilder'
import { useAuth } from './lib/auth'
import type { Language, View } from './data'

type Props = {
  initialLanguage: Language
  initialXp: number
  demoMode: boolean
  onLanguageChange: (language: Language) => Promise<void>
  onReturnToAcademy: () => void
  onExit: () => void
}

export default function App({
  initialLanguage,
  initialXp,
  demoMode,
  onLanguageChange,
  onExit
}: Props) {
  // Starts directly on Hogwarts / Arcane Dashboard
  const [view, setView] = useState<View>('dashboard')
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [xp, setXp] = useState(initialXp)
  const [completedQuests, setCompletedQuests] = useState<string[]>([])
  const auth = useAuth()

  const awardXp = (amount: number) => setXp((current) => current + amount)

  useEffect(() => {
    const openMentor = () => setView('mentor')
    window.addEventListener('open-mentor', openMentor)
    return () => window.removeEventListener('open-mentor', openMentor)
  }, [])

  return (
    <AppShell
      view={view}
      onNavigate={setView}
      language={language}
      onToggleLanguage={() => {
        const next = language === 'EN' ? 'HI' : 'EN'
        setLanguage(next)
        void onLanguageChange(next)
      }}
      xp={xp}
      demoMode={demoMode}
      onReturnToAcademy={() => setView('dashboard')}
      onExit={onExit}
    >
      {view === 'dashboard' && (
        <Dashboard
          language={language}
          xp={xp}
          completedQuests={completedQuests}
          onCompleteQuest={(id) => {
            if (!completedQuests.includes(id)) {
              setCompletedQuests([...completedQuests, id])
              awardXp(50)
            }
          }}
          onNavigate={setView}
        />
      )}
      {view === 'gamezone' && auth.profile && (
        <div style={{ padding: '1rem' }}>
          <GameBoard
            profile={auth.profile}
            userId={auth.isPreview ? auth.profile.id : auth.user?.id ?? null}
            preview={auth.isPreview}
            onLanguageChange={auth.setLanguage}
            onOpenHub={() => setView('dashboard')}
            onExit={() => setView('dashboard')}
          />
        </div>
      )}
      {view === 'grimoire' && (
        <GrimoireBuilder language={language} onEarnXp={() => awardXp(40)} />
      )}
      {view === 'learn' && <LearningPath language={language} onOpenVisualizer={() => setView('visualizer')} />}
      {view === 'visualizer' && <Visualizer language={language} onEarnXp={() => awardXp(15)} />}
      {view === 'arena' && <Arena language={language} onEarnXp={() => awardXp(30)} />}
      {view === 'quests' && <Quests language={language} />}
      {view === 'planner' && <StudyPlanner language={language} />}
      {view === 'mentor' && <Mentor language={language} />}
    </AppShell>
  )
}