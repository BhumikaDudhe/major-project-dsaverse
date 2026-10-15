import { BookOpen, Dices, Flame, Play, Sparkles, Wand2 } from 'lucide-react'
import { useAuth } from '../lib/auth'
import type { Language, View } from '../data'

interface Props {
  language: Language
  xp: number
  completedQuests: string[]
  onCompleteQuest: (id: string) => void
  onNavigate: (view: View) => void
}

export function Dashboard({ language, xp, onNavigate }: Props) {
  const isHi = language === 'HI'
  const auth = useAuth()

  const house = (auth.profile as any)?.house || 'Gryffindor'
  const wizardName = auth.profile?.display_name || 'Aarav'

  const houseCrests: Record<string, string> = {
    Gryffindor: '🦁',
    Slytherin: '🐍',
    Ravenclaw: '🦅',
    Hufflepuff: '🦡'
  }

  const houseRanks: Record<string, string> = {
    Gryffindor: '#4',
    Ravenclaw: '#2',
    Slytherin: '#1',
    Hufflepuff: '#3'
  }

  const currentCrest = houseCrests[house] || '🦁'
  const currentRank = houseRanks[house] || '#4'

  return (
    <div className="page-enter dashboard-container">
      <div className="dash-header">
        <div>
          <div className="dash-eyebrow">
            <span className="dash-eyebrow-dot" />
            <span>THE GRAND HALL • ARCANE ACADEMY OF ALGORITHMS</span>
          </div>
          <h1 className="dash-title">
            {isHi ? `Namaste, Wizard ${wizardName}!` : `Welcome back, Wizard ${wizardName}.`}
          </h1>
          <p className="dash-sub">
            {isHi
              ? 'Aaj ka spell ready hai. Apni wand (code) uthao aur DSA ke secrets unlock karo.'
              : `Represent House ${house} with honor. Solve your daily runes and advance in the ranks.`}
          </p>
        </div>

        <div className="dash-badges">
          <div className="dash-badge-item">
            <span className="dash-badge-label">HOUSE RANK</span>
            <div className="dash-badge-value gold">
              <span style={{ fontSize: '15px' }}>{currentCrest}</span> {house} {currentRank}
            </div>
          </div>
          <div className="dash-badge-divider" />
          <div className="dash-badge-item">
            <span className="dash-badge-label">MANA XP</span>
            <div className="dash-badge-value green">
              <Sparkles size={15} /> {xp} XP
            </div>
          </div>
        </div>
      </div>

      <div className="daily-mission-card">
        <div className="daily-mission-info">
          <div className="mission-tag">
            <Flame size={13} />
            <span>TODAY'S FORBIDDEN INCANTATION (DAILY MISSION)</span>
          </div>
          <h2>{isHi ? 'Day 12: Canteen Ka Order Counter' : 'Canteen Order Frequency Counter'}</h2>
          <p>
            {isHi
              ? 'Level 1 me frequencies count karo aur Level 2 me odd items ko filter karo. Invariance test pass karke extra 50 Mana lo.'
              : 'Step into the Dueling Arena. Count occurrences, refactor into odd filters, and pass the anti-memorization gate.'}
          </p>
        </div>
        <button className="button button-primary mission-action" onClick={() => onNavigate('arena')}>
          <Play size={14} fill="currentColor" /> Enter Arena
        </button>
      </div>

      <div className="chambers-section">
        <div className="chambers-label">EXPLORE THE ACADEMY CHAMBERS</div>

        <div className="chambers-grid">
          <div className="chamber-card" onClick={() => onNavigate('gamezone')}>
            <div className="chamber-top">
              <div className="chamber-icon green">
                <Dices size={20} />
              </div>
              <span className="chamber-pill green">ACTIVE REALM</span>
            </div>
            <h3>The Enchanted Board</h3>
            <span className="chamber-type">Game Zone</span>
            <p>
              Roll the die, climb algorithm ladders, dodge recursion snakes, and collect spell shards across 30 trial tiles.
            </p>
          </div>

          <div className="chamber-card" onClick={() => onNavigate('grimoire')}>
            <div className="chamber-top">
              <div className="chamber-icon gold">
                <BookOpen size={20} />
              </div>
              <span className="chamber-pill gold">STEP-BY-STEP</span>
            </div>
            <h3>The Spellcraft Grimoire</h3>
            <span className="chamber-type">Modular Track</span>
            <p>
              CryptoZombies-style structured learning. Learn constructors, memory scopes, and filters to forge complete engines.
            </p>
          </div>

          <div className="chamber-card" onClick={() => onNavigate('arena')}>
            <div className="chamber-top">
              <div className="chamber-icon amber">
                <Wand2 size={20} />
              </div>
              <span className="chamber-pill amber">FLAGSHIP USP</span>
            </div>
            <h3>The Dueling Arena</h3>
            <span className="chamber-type">Micro-Ladders</span>
            <p>
              Continuous ladder refactoring paired with anti-memorization Concept Invariance gates and 3-Tier Socratic hinting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}