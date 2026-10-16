import { useState } from 'react'
import { Check, ChevronRight, Code2, Feather, Flame, HelpCircle, Play, Scroll, Sparkles, Wand2 } from 'lucide-react'
import { useAuth } from '../lib/auth'
import type { Language } from '../data'

interface LessonChapter {
  id: number
  tier: string
  title: { en: string; hi: string }
  storyGoal: { en: string; hi: string }
  theory: { en: string; hi: string }
  starterCode: string
  expectedPattern: RegExp
  hint: { en: string; hi: string }
}

const chapters: LessonChapter[] = [
  {
    id: 1,
    tier: 'RUNE LEVEL 01',
    title: {
      en: 'The Spell Manifest (Constructor & State)',
      hi: 'Spells Ki Shuruaat (Constructor & State)'
    },
    storyGoal: {
      en: 'Every wizard needs an enchanted inventory. Inscribe class `SpellEngine` with a constructor that initializes an empty array `this.spells = []`.',
      hi: 'Har wizard ko apna inventory chahiye. Ek `SpellEngine` class banao jisme constructor `this.spells = []` initialize kare.'
    },
    theory: {
      en: 'Like declaring state variables in smart contracts or constructors in OOP, state holds your system identity across calls.',
      hi: 'OOP me constructor state variables initialize karta hai. Jaise CryptoZombies me ZombieFactory banti hai!'
    },
    starterCode: `class SpellEngine {
  constructor() {
    // Step 1: Initialize this.spells as an empty array
    
  }
}`,
    expectedPattern: /this\.spells\s*=\s*\[\s*\]/,
    hint: {
      en: 'Inside constructor(), write: this.spells = [];',
      hi: 'constructor() ke andar likho: this.spells = [];'
    }
  },
  {
    id: 2,
    tier: 'RUNE LEVEL 02',
    title: {
      en: 'Inscribing Runes (Methods & Mutation)',
      hi: 'Naye Spells Add Karna (Methods)'
    },
    storyGoal: {
      en: 'Add a method `castNewSpell(name, power)` that pushes an object `{ name, power }` into `this.spells`.',
      hi: 'Ek method banao `castNewSpell(name, power)` jo `{ name, power }` ko `this.spells` me push kare.'
    },
    theory: {
      en: 'Methods manipulate state safely. By controlling state transitions through methods, you prevent unauthorized memory corruption.',
      hi: 'Methods ke through hum state ko clean and secure tarike se modify karte hain.'
    },
    starterCode: `class SpellEngine {
  constructor() {
    this.spells = [];
  }

  // Step 2: Implement castNewSpell(name, power)
  castNewSpell(name, power) {
    // Push { name, power } to this.spells
    
  }
}`,
    expectedPattern: /this\.spells\.push\s*\(\s*\{\s*name(,\s*power|\s*:\s*name)\s*/,
    hint: {
      en: 'Use this.spells.push({ name, power });',
      hi: 'Likho: this.spells.push({ name, power });'
    }
  },
  {
    id: 3,
    tier: 'RUNE LEVEL 03',
    title: {
      en: 'The Grand Archmage Filter (Top-K Logic)',
      hi: 'Powerful Spells Filter Karna'
    },
    storyGoal: {
      en: 'Add `getEliteSpells(minPower)` that uses `.filter()` to return only spells where `power >= minPower`.',
      hi: 'Ek method banao `getEliteSpells(minPower)` jo `.filter()` use karke sirf wahi spells return kare jinka power >= minPower ho.'
    },
    theory: {
      en: 'Filtering collections dynamically without mutating original memory is the cornerstone of functional data manipulation.',
      hi: 'Bina original array mutate kiye specific condition wale elements nikalne ke liye filter() use hota hai.'
    },
    starterCode: `class SpellEngine {
  constructor() {
    this.spells = [];
  }

  castNewSpell(name, power) {
    this.spells.push({ name, power });
  }

  // Step 3: Implement getEliteSpells(minPower)
  getEliteSpells(minPower) {
    // Return filtered array
    
  }
}`,
    expectedPattern: /return\s+this\.spells\.filter\s*\(/,
    hint: {
      en: 'return this.spells.filter(s => s.power >= minPower);',
      hi: 'return this.spells.filter(s => s.power >= minPower); likho.'
    }
  }
]

export function GrimoireBuilder({
  language,
  onEarnXp
}: {
  language: Language
  onEarnXp: () => void
}) {
  const isHi = language === 'HI'
  const auth = useAuth()
  const userHouse = auth.profile?.house || 'Gryffindor'

  const [currentIdx, setCurrentIdx] = useState(0)
  const [code, setCode] = useState(chapters[0].starterCode)
  const [passedChapters, setPassedChapters] = useState<number[]>([])
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [showHint, setShowHint] = useState(false)

  const chapter = chapters[currentIdx]

  const runChapterCode = () => {
    if (chapter.expectedPattern.test(code)) {
      setStatus('success')
      setMsg(isHi ? '✦ Rune Inscription Validated! Spell compiled cleanly.' : '✦ Arcane rune successfully inscribed!')
      if (!passedChapters.includes(chapter.id)) {
        setPassedChapters((prev) => [...prev, chapter.id])
        onEarnXp()
      }
    } else {
      setStatus('error')
      setMsg(
        isHi
          ? `Incantation mismatch. Hint: ${chapter.hint.hi}`
          : `Rune syntax failed. Hint: ${chapter.hint.en}`
      )
    }
  }

  const switchChapter = (idx: number) => {
    setCurrentIdx(idx)
    setCode(chapters[idx].starterCode)
    setStatus('idle')
    setMsg('')
    setShowHint(false)
  }

  return (
    <div className="page-enter grimoire-chamber">
      {/* Header Banner */}
      <div className="grimoire-header">
        <div>
          <div className="grimoire-eyebrow">
            <Scroll size={13} />
            <span>CRYPTOGRAPHIC SPELLBOOK • CHAPTER ARCHITECTURE</span>
          </div>
          <h1>{isHi ? 'The Spellcraft Grimoire' : 'The Spellcraft Grimoire'}</h1>
          <p>
            {isHi
              ? 'Har lesson me ek specific building block sikho, aur aakhri me complete application tayyar karo.'
              : 'Construct a full software application block-by-block. Master state, constructors, and filters like an Archmage.'}
          </p>
        </div>

        <div className="grimoire-stats">
          <div className="grimoire-stat-pill">
            <Feather size={14} color="#efd28e" />
            <span>Chapter {chapter.id} of {chapters.length}</span>
          </div>
          <div className="grimoire-stat-pill gold">
            <Sparkles size={14} color="#eed889" />
            <span>+{passedChapters.length * 40} Mana XP</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Chamber */}
      <div className="grimoire-grid">
        {/* Left Column: The Lesson Parchment */}
        <div className="grimoire-parchment">
          {/* Chapter Selector Tabs */}
          <div className="chapter-tabs">
            {chapters.map((ch, idx) => {
              const isCurrent = idx === currentIdx
              const isPassed = passedChapters.includes(ch.id)
              return (
                <button
                  key={ch.id}
                  onClick={() => switchChapter(idx)}
                  className={`chapter-tab ${isCurrent ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                >
                  <span className="tab-crest">{isPassed ? <Check size={11} /> : `0${ch.id}`}</span>
                  <span>Chapter {ch.id}</span>
                </button>
              )
            })}
          </div>

          <div className="chapter-title-box">
            <span className="chapter-tier">{chapter.tier}</span>
            <h2>{isHi ? chapter.title.hi : chapter.title.en}</h2>
          </div>

          {/* Theory Scroll Card */}
          <div className="lore-card theory">
            <div className="lore-head">
              <Scroll size={13} />
              <span>THEORY SCROLL</span>
            </div>
            <p>{isHi ? chapter.theory.hi : chapter.theory.en}</p>
          </div>

          {/* Directive Scroll Card */}
          <div className="lore-card directive">
            <div className="lore-head">
              <Flame size={13} />
              <span>ARCHMAGE DIRECTIVE</span>
            </div>
            <p>{isHi ? chapter.storyGoal.hi : chapter.storyGoal.en}</p>
          </div>

          {/* Hint Accordion */}
          <div className="hint-zone">
            <button
              className="hint-toggle-btn"
              onClick={() => setShowHint(!showHint)}
            >
              <HelpCircle size={13} />
              <span>{showHint ? 'Conceal Incantation Hint' : 'Reveal Incantation Hint'}</span>
            </button>
            {showHint && (
              <div className="hint-reveal-box">
                <span>INCANTATION GLYPH</span>
                <p>{isHi ? chapter.hint.hi : chapter.hint.en}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Enchanted Code Forge */}
        <div className="grimoire-forge">
          <div className="forge-header">
            <div className="forge-tab">
              <Code2 size={13} color="#92e2b0" />
              <span>SpellEngine.js</span>
              <span className="forge-dot" />
            </div>
            <div className="forge-status">
              <span>Hogwarts V8 Runtime</span>
            </div>
          </div>

          <div className="forge-editor">
            <textarea
              spellCheck={false}
              aria-label="Code Editor"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setStatus('idle')
              }}
            />
          </div>

          <div className="forge-footer">
            <div className="forge-house-tag">
              <span>Forged for House {userHouse}</span>
            </div>

            <div className="forge-actions">
              <button
                className="button button-quiet"
                onClick={() => setShowHint(true)}
              >
                <Wand2 size={13} /> Hint
              </button>
              <button
                className="button button-primary"
                onClick={runChapterCode}
              >
                <Play size={13} fill="currentColor" /> Inscribe Spell
              </button>
            </div>
          </div>

          {/* Feedback & Result Bar */}
          {status !== 'idle' && (
            <div className={`forge-feedback ${status}`}>
              <span>{msg}</span>
              {status === 'success' && currentIdx + 1 < chapters.length && (
                <button
                  className="button button-primary next-chapter-btn"
                  onClick={() => switchChapter(currentIdx + 1)}
                >
                  Next Chapter <ChevronRight size={13} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}