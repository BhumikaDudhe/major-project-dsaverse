import type { ReactNode } from 'react'
import { useState } from 'react'
import { Activity, BookOpen, BrainCircuit, CalendarDays, ChevronDown, CircleHelp, Code2, Command, Compass, Flame, Gamepad2, LayoutDashboard, LogOut, Menu, Search, Sparkles, Trophy, X } from 'lucide-react'
import type { Language, View } from '../data'

const navItems: { id: View; label: string; hindi: string; icon: typeof LayoutDashboard; section: string }[] = [
  { id: 'dashboard', label: 'Dashboard', hindi: 'Dashboard', icon: LayoutDashboard, section: 'workspace' },
  { id: 'learn', label: 'Learning path', hindi: 'Seekhne ka raasta', icon: BookOpen, section: 'workspace' },
  { id: 'visualizer', label: 'Visual lab', hindi: 'Visual lab', icon: Activity, section: 'workspace' },
  { id: 'arena', label: 'Coding arena', hindi: 'Coding arena', icon: Code2, section: 'practice' },
  { id: 'quests', label: 'Quests & badges', hindi: 'Quests aur badges', icon: Trophy, section: 'practice' },
  { id: 'planner', label: 'Study planner', hindi: 'Padhai ka planner', icon: CalendarDays, section: 'practice' },
  { id: 'mentor', label: 'AI mentor', hindi: 'AI mentor', icon: BrainCircuit, section: 'practice' },
]

type Props = { view: View; onNavigate: (view: View) => void; language: Language; onToggleLanguage: () => void; xp: number; demoMode: boolean; onReturnToAcademy: () => void; onExit: () => void; children: ReactNode }

export function AppShell({ view, onNavigate, language, onToggleLanguage, xp, demoMode, onReturnToAcademy, onExit, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const active = navItems.find((item) => item.id === view)
  const go = (id: View) => { onNavigate(id); setMobileOpen(false) }
  const navContent = <>
    <div className="brand-lockup"><div className="brand-mark"><Command size={19} strokeWidth={2.5} /></div><span>DSA<span className="brand-accent">verse</span><small>LEARN • PLAY • LEVEL UP</small></span></div>
    <div className="nav-groups">
      {(['workspace', 'practice'] as const).map((section) => <div className="nav-group" key={section}><p className="nav-label">{language === 'HI' ? (section === 'workspace' ? 'Learning' : 'Practice') : section}</p>{navItems.filter((item) => item.section === section).map(({ id, label, hindi, icon: Icon }) => <button key={id} className={`nav-item ${view === id ? 'active' : ''}`} onClick={() => go(id)}><Icon size={17} /><span>{language === 'HI' ? hindi : label}</span>{id === 'quests' && <span className="nav-dot" />}</button>)}</div>)}
    </div>
    <div className="sidebar-bottom"><div className="streak-card"><div className="streak-icon"><Flame size={16} fill="currentColor" /></div><div><strong>7 day streak</strong><span>You're on fire!</span></div><span className="streak-count">7</span></div><button className="help-link" onClick={() => go('mentor')}><CircleHelp size={16} /> Help & mentor</button><div className="profile-row"><div className="avatar">A</div><div><strong>Aarav Mehta</strong><span>Level 08 • Explorer</span></div><ChevronDown size={15} className="muted-icon" /></div></div>
  </>

  return <div className="app-layout">
    <aside className="sidebar desktop-sidebar">{navContent}</aside>
    {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)}><aside className="sidebar mobile-sidebar" onClick={(event) => event.stopPropagation()}>{navContent}<button aria-label="Close navigation" className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18} /></button></aside></div>}
    <main className="main-column"><header className="topbar"><div className="topbar-title"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={19} /></button><span className="crumb-muted">Workspace</span><span className="crumb-divider">/</span><strong>{active?.label}</strong></div><div className="topbar-actions"><button className="return-academy" onClick={onReturnToAcademy}><Gamepad2 size={15} /><span>Logic Forest</span></button><button className="search-trigger" onClick={() => setSearchOpen(!searchOpen)}><Search size={16} /><span>Search anything</span><kbd>⌘ K</kbd></button><button className="language-toggle" onClick={onToggleLanguage} aria-label="Toggle learning language"><span className={language === 'EN' ? 'selected' : ''}>EN</span><span className={language === 'HI' ? 'selected' : ''}>हि</span></button><div className="top-xp"><span className="xp-gem"><Sparkles size={14} /></span><strong>{xp.toLocaleString()}</strong><small>XP</small></div><button className="notification-button" aria-label="Open daily quests" onClick={() => go('quests')}><Gamepad2 size={18} /><i /></button><button className="logout-button" aria-label="Log out" onClick={onExit}><LogOut size={16} /></button></div></header>
      {demoMode && <div className="demo-mode-global"><Sparkles size={13} /><strong>DEMO MODE</strong><span>— data is stored only in this browser.</span><button onClick={onExit}>Log out</button></div>}
      {searchOpen && <div className="search-popover"><Search size={17} /><input autoFocus placeholder="Search topics, quests, problems..." onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false); if (event.key === 'Enter') { const query = event.currentTarget.value.toLowerCase(); go(query.includes('visual') || query.includes('sort') ? 'visualizer' : query.includes('quest') ? 'quests' : query.includes('plan') ? 'planner' : query.includes('problem') ? 'arena' : 'learn'); setSearchOpen(false) } }} /><span>Enter to open</span></div>}
      <div className="page-content">{children}</div>
      <footer className="app-footer"><span><Compass size={13} /> DSAverse <b>•</b> Your next level starts here</span><span>Made for curious minds <Sparkles size={13} /></span></footer>
    </main>
  </div>
}