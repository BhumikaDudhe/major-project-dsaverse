import { useState } from 'react'
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Code2,
  Compass,
  Eye,
  Flame,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Sparkles,
  Trophy,
  X
} from 'lucide-react'
import { useAuth } from '../lib/auth'
import type { Language, View } from '../data'

interface AppShellProps {
  view: View
  onNavigate: (view: View) => void
  language: Language
  onToggleLanguage: () => void
  xp: number
  demoMode: boolean
  onReturnToAcademy: () => void
  onExit: () => void
  children: React.ReactNode
}

export function AppShell({
  view,
  onNavigate,
  language,
  onToggleLanguage,
  xp,
  demoMode,
  onExit,
  children
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const auth = useAuth()

  const userHouse = auth.profile?.house || 'Gryffindor'
  const userDisplayName = auth.profile?.display_name || 'Aarav Mehta'

  const getHouseCrest = (house: string) => {
    switch (house) {
      case 'Slytherin':
        return '🐍'
      case 'Ravenclaw':
        return '🦅'
      case 'Hufflepuff':
        return '🦡'
      default:
        return '🦁'
    }
  }

  const navItems: { id: View; label: { en: string; hi: string }; icon: React.ReactNode; group: 'LEARNING' | 'PRACTICE' }[] = [
    { id: 'dashboard', label: { en: 'Dashboard', hi: 'Dashboard' }, icon: <LayoutDashboard size={16} />, group: 'LEARNING' },
    { id: 'learn', label: { en: 'Learning path', hi: 'Seekhne ka raasta' }, icon: <BookOpen size={16} />, group: 'LEARNING' },
    { id: 'visualizer', label: { en: 'Visual lab', hi: 'Visual lab' }, icon: <Eye size={16} />, group: 'LEARNING' },
    { id: 'arena', label: { en: 'Coding arena', hi: 'Coding arena' }, icon: <Code2 size={16} />, group: 'PRACTICE' },
    { id: 'quests', label: { en: 'Quests & badges', hi: 'Quests aur badges' }, icon: <Trophy size={16} />, group: 'PRACTICE' },
    { id: 'planner', label: { en: 'Study planner', hi: 'Padhai ka planner' }, icon: <Calendar size={16} />, group: 'PRACTICE' },
    { id: 'mentor', label: { en: 'AI mentor', hi: 'AI mentor' }, icon: <MessageSquare size={16} />, group: 'PRACTICE' }
  ]

  const learningItems = navItems.filter((i) => i.group === 'LEARNING')
  const practiceItems = navItems.filter((i) => i.group === 'PRACTICE')

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar desktop-sidebar ${mobileOpen ? 'mobile-sidebar' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark">
            <Compass size={18} />
          </div>
          <div>
            <span>
              DSA<span className="brand-accent">verse</span>
            </span>
            <small>LEARN • PLAY • LEVEL UP</small>
          </div>
          {mobileOpen && (
            <button className="mobile-close" onClick={() => setMobileOpen(false)}>
              <X size={16} />
            </button>
          )}
        </div>

        <nav className="nav-groups">
          <div className="nav-group">
            <span className="nav-label">LEARNING</span>
            {learningItems.map((item) => {
              const active = view === item.id
              return (
                <button
                  key={item.id}
                  className={`nav-item ${active ? 'active' : ''}`}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileOpen(false)
                  }}
                >
                  {item.icon}
                  <span>{language === 'HI' ? item.label.hi : item.label.en}</span>
                  {active && <span className="nav-dot" />}
                </button>
              )
            })}
          </div>

          <div className="nav-group">
            <span className="nav-label">PRACTICE</span>
            {practiceItems.map((item) => {
              const active = view === item.id
              return (
                <button
                  key={item.id}
                  className={`nav-item ${active ? 'active' : ''}`}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileOpen(false)
                  }}
                >
                  {item.icon}
                  <span>{language === 'HI' ? item.label.hi : item.label.en}</span>
                  {active && <span className="nav-dot" />}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="sidebar-bottom" style={{ position: 'relative' }}>
          <div className="streak-card">
            <div className="streak-icon">
              <Flame size={15} />
            </div>
            <div>
              <strong>7 day streak</strong>
              <span>You're on fire!</span>
            </div>
            <span className="streak-count">7</span>
          </div>

          <button className="help-link" onClick={() => onNavigate('mentor')}>
            <HelpCircle size={15} />
            <span>Help & mentor</span>
          </button>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '58px',
                left: '2px',
                right: '2px',
                background: '#141c19',
                border: '1px solid rgba(188, 222, 196, 0.2)',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(188, 222, 196, 0.12)'
                }}
              >
                <span style={{ fontSize: '20px' }}>{getHouseCrest(userHouse)}</span>
                <div>
                  <strong style={{ fontSize: '11px', color: '#f7f4e9', display: 'block' }}>{userDisplayName}</strong>
                  <span style={{ fontSize: '9px', color: '#efd28e', fontFamily: 'var(--mono)' }}>
                    House {userHouse}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setProfileMenuOpen(false)
                  onExit()
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '7px 9px',
                  background: 'rgba(216, 141, 116, 0.1)',
                  border: '1px solid rgba(216, 141, 116, 0.25)',
                  borderRadius: '5px',
                  color: '#d88d74',
                  fontSize: '10px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <LogOut size={13} /> Sign Out of Academy
              </button>
            </div>
          )}

          {/* Bottom Profile Button */}
          <div
            className="profile-row"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              borderRadius: '6px',
              padding: '8px 6px'
            }}
          >
            <div className="avatar" style={{ fontSize: '13px' }}>
              {getHouseCrest(userHouse)}
            </div>
            <div>
              <strong>{userDisplayName}</strong>
              <span>House {userHouse}</span>
            </div>
            {profileMenuOpen ? (
              <ChevronUp size={14} className="muted-icon" />
            ) : (
              <ChevronDown size={14} className="muted-icon" />
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}

      {/* Main Workspace Column */}
      <div className="main-column">
        <header className="topbar">
          <div className="topbar-title">
            <button className="mobile-menu" onClick={() => setMobileOpen(true)}>
              <Menu size={16} />
            </button>
            <span className="crumb-muted">Workspace</span>
            <span className="crumb-divider">/</span>
            <strong>{view.charAt(0).toUpperCase() + view.slice(1)}</strong>
          </div>

          <div className="topbar-actions">
            <button className="search-trigger">
              <Search size={14} />
              <span>Search anything</span>
              <kbd>⌘ K</kbd>
            </button>

            <button className="language-toggle" onClick={onToggleLanguage}>
              <span className={language === 'EN' ? 'selected' : ''}>EN</span>
              <span className={language === 'HI' ? 'selected' : ''}>हि</span>
            </button>

            <div className="top-xp">
              <Sparkles size={14} className="xp-gem" />
              <strong>{xp}</strong>
              <small>XP</small>
            </div>

            <button className="notification-button">
              <Bell size={14} />
              <i />
            </button>
          </div>
        </header>

        {demoMode && (
          <div className="preview-ribbon">
            <Sparkles size={13} />
            <span>DEMO MODE — data is stored only in this browser.</span>
          </div>
        )}

        <main className="page-content">{children}</main>

        <footer className="app-footer">
          <span>
            <b>DSAverse</b> • Your next level starts here
          </span>
          <span>Made for curious minds</span>
        </footer>
      </div>
    </div>
  )
}