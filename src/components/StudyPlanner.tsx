import { useState, useEffect, useRef } from 'react'
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Maximize2,
  Minimize2,
  Plus,
  RotateCcw,
  ShieldAlert,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import type { Language } from '../data'

interface TaskItem {
  id: string
  time: string
  title: string
  sub: string
  done: boolean
  dayIndex: number
}

const initialTasks: TaskItem[] = [
  {
    id: 't1',
    time: '09:00 AM',
    title: 'Binary search: visual walkthrough',
    sub: 'Visual Lab • 25 min',
    done: true,
    dayIndex: 1
  },
  {
    id: 't2',
    time: '10:30 AM',
    title: 'Solve 2 array problems',
    sub: 'Coding Arena • 30 min',
    done: false,
    dayIndex: 1
  },
  {
    id: 't3',
    time: '04:00 PM',
    title: 'Review recursion notes',
    sub: 'Spellcraft Grimoire • 30 min',
    done: false,
    dayIndex: 1
  }
]

const weekDays = [
  { label: 'MON', date: '12' },
  { label: 'TUE', date: '13' },
  { label: 'WED', date: '14' },
  { label: 'THU', date: '15' },
  { label: 'FRI', date: '16' },
  { label: 'SAT', date: '17' },
  { label: 'SUN', date: '18' }
]

export function StudyPlanner({
  language,
  onEarnXp
}: {
  language: Language
  onEarnXp?: (amount?: number) => void
}) {
  const isHi = language === 'HI'

  // Calendar States
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskTime] = useState('11:00 AM')

  // Focus Timer States
  const [selectedDuration, setSelectedDuration] = useState<number>(25)
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Anti-Tab-Switch Focus Ward States
  const [distractions, setDistractions] = useState<number>(0)
  const [showWardAlert, setShowWardAlert] = useState<boolean>(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 1. Anti-Tab-Switch & Visibility Ward
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isActive && document.hidden) {
        setDistractions((prev) => prev + 1)
        setShowWardAlert(true)
      }
    }

    const handleWindowBlur = () => {
      if (isActive) {
        setDistractions((prev) => prev + 1)
        setShowWardAlert(true)
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isActive) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleWindowBlur)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleWindowBlur)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isActive])

  // 2. Countdown Engine
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      if (timerRef.current) clearInterval(timerRef.current)

      const reward = distractions === 0 ? 50 : 25
      onEarnXp?.(reward)
      alert(
        isHi
          ? `Shaabash! Focus session pura hua! +${reward} XP mile.`
          : `Session completed! You earned +${reward} XP. Distraction strikes: ${distractions}`
      )
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, timeLeft, distractions, isHi, onEarnXp])

  const startFocus = () => {
    setIsActive(true)
    setDistractions(0)
    setShowWardAlert(false)
  }

  const stopFocus = () => {
    setIsActive(false)
    if (timerRef.current) clearInterval(timerRef.current)
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  const resetTimer = (mins: number) => {
    stopFocus()
    setSelectedDuration(mins)
    setTimeLeft(mins * 60)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Calendar Task Actions
  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask: TaskItem = {
      id: `task_${Date.now()}`,
      time: newTaskTime,
      title: newTaskTitle.trim(),
      sub: 'Custom Study Sprint • 30 min',
      done: false,
      dayIndex: selectedDay
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle('')
    setIsAddingTask(false)
  }

  const dayTasks = tasks.filter((t) => t.dayIndex === selectedDay)
  const completedCount = tasks.filter((t) => t.done).length

  return (
    <div className="planner-page page-enter">
      {/* Page Heading Row */}
      <div className="page-heading-row">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> {isHi ? 'PADHAI KA RHYTHM' : 'YOUR STUDY RHYTHM'}
          </div>
          <h1>{isHi ? 'Agli Manzil Ke Liye Samay Banayein' : 'Make time for your next level.'}</h1>
          <p>
            {isHi
              ? 'Ek halki si yojana, dhyan kendrit sprint, aur niyamitta aapko aage le jayegi.'
              : 'A light plan, a focused sprint, and a little consistency goes a long way.'}
          </p>
        </div>
        <button className="button button-primary" onClick={() => setIsAddingTask(true)}>
          <Plus size={14} /> {isHi ? 'Session plan karein' : 'Plan a session'}
        </button>
      </div>

      <div className="planner-layout">
        {/* Full Interactive Calendar Strip & Day View */}
        <div className="weekly-plan">
          <div className="panel-heading">
            <div>
              <span className="nav-label" style={{ margin: 0 }}>WEEK VIEW</span>
              <h2>October 12–18, 2026</h2>
            </div>
            <div className="week-switch">
              <button title="Previous Week">
                <ChevronLeft size={14} />
              </button>
              <button title="Next Week">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* 7-Day Clickable Strip */}
          <div className="week-strip">
            {weekDays.map((d, idx) => {
              const isSelected = selectedDay === idx
              return (
                <div
                  key={d.label}
                  className={`week-day ${isSelected ? 'day-selected' : ''}`}
                  onClick={() => setSelectedDay(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>{d.label}</span>
                  <strong>{d.date}</strong>
                </div>
              )
            })}
          </div>

          {/* Summary Stat */}
          <div className="plan-summary">
            <span>
              <CheckCircle2 size={13} /> {completedCount}/{tasks.length} sessions completed
            </span>
            <span>
              <Clock size={13} /> 2h 15m planned
            </span>
          </div>

          {/* Schedule for Selected Day */}
          <div className="schedule-label">
            <span>{weekDays[selectedDay].label}DAY, OCT {weekDays[selectedDay].date}</span>
            <button onClick={() => setIsAddingTask(true)}>
              <Plus size={12} /> Add task
            </button>
          </div>

          {isAddingTask && (
            <form onSubmit={addTask} className="add-task-form">
              <input
                type="text"
                placeholder="Session name (e.g., Solve 2 Heap problems)..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
              <button type="submit">Inscribe</button>
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                style={{ background: 'var(--surface)', color: 'var(--muted)' }}
              >
                Cancel
              </button>
            </form>
          )}

          <div className="schedule-list">
            {dayTasks.length === 0 ? (
              <div className="compact-empty">
                <Calendar size={28} />
                <strong>No sessions planned</strong>
                <span>Add one small thing to get started for this day.</span>
              </div>
            ) : (
              dayTasks.map((t) => (
                <div key={t.id} className={`schedule-item ${t.done ? 'task-done' : ''}`}>
                  <span className="schedule-time">{t.time}</span>
                  <button
                    className={`task-check ${t.done ? 'checked' : ''}`}
                    onClick={() => toggleTask(t.id)}
                  >
                    {t.done ? '✓' : ''}
                  </button>
                  <div className="schedule-task-copy">
                    <strong>{t.title}</strong>
                    <span>{t.sub}</span>
                  </div>
                  <button className="task-delete" onClick={() => deleteTask(t.id)} title="Delete Task">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Focus Ward & Timer Card */}
        <div className="planner-aside">
          <div className={`focus-card ${isActive ? 'focus-active-glow' : ''}`}>
            <div className="focus-card-top">
              <span>
                <Clock size={13} /> {isActive ? 'WARD ACTIVE: TAB-LOCKED' : 'FOCUS TIMER'}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={toggleFullscreen} title="Toggle Immersion Lock">
                  {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button onClick={() => resetTimer(selectedDuration)} title="Reset">
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            {/* Orbit Dial */}
            <div className="focus-orbit">
              <div className="focus-time">
                <strong>{formatTime(timeLeft)}</strong>
                <span>{isActive ? 'DEEP FOCUS • LOCKED' : 'DEEP FOCUS'}</span>
              </div>
            </div>

            {/* Presets */}
            <div className="focus-presets">
              {[15, 25, 45].map((m) => (
                <button
                  key={m}
                  disabled={isActive}
                  className={selectedDuration === m ? 'active-preset' : ''}
                  onClick={() => resetTimer(m)}
                >
                  {m} min
                </button>
              ))}
            </div>

            {/* Start / Forfeit Button */}
            {!isActive ? (
              <button className="focus-start button-primary" onClick={startFocus}>
                ▶ Start Focus (Lock Session)
              </button>
            ) : (
              <button
                className="focus-start"
                style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid #f43f5e' }}
                onClick={stopFocus}
              >
                Forfeit Focus Ward
              </button>
            )}

            {/* Live Distraction Feedback */}
            <div className="focus-caption" style={{ marginTop: '10px' }}>
              {isActive ? (
                <span style={{ color: distractions > 0 ? '#f43f5e' : 'var(--cyan)' }}>
                  <ShieldAlert size={12} /> Distraction strikes: {distractions}
                </span>
              ) : (
                <span>Switching tabs during focus triggers a penalty strike.</span>
              )}
            </div>
          </div>

          {/* Daily Reminder & Weekly Goal */}
          <div className="reminder-card">
            <div className="reminder-icon">
              <Clock size={16} />
            </div>
            <div>
              <strong>Daily reminder</strong>
              <span>Every day at 6:00 PM</span>
            </div>
            <button className="toggle-switch toggle-on">
              <i />
            </button>
          </div>

          <div className="weekly-goal">
            <div className="goal-top">
              <span>WEEKLY GOAL</span>
              <strong>4 / 5 hrs</strong>
            </div>
            <div className="goal-track">
              <i />
            </div>
            <span className="goal-caption">Just one more hour to hit your goal ✦</span>
          </div>
        </div>
      </div>

      {/* Focus Ward Strike Modal */}
      {showWardAlert && (
        <div className="ward-modal-backdrop">
          <div className="ward-modal">
            <AlertTriangle size={36} color="#fbbf24" />
            <h2>{isHi ? 'Dhyan Bhatak Gaya!' : 'Focus Ward Alert!'}</h2>
            <p>
              {isHi
                ? 'Aapne session ke dauran browser tab badal diya tha. Kripya apne task par wapas dhyan dein.'
                : 'You switched away from this tab during an active deep-focus sprint. Returning to your study chamber immediately.'}
            </p>
            <div className="ward-modal-stats">
              <span>Distractions: <b>{distractions}</b></span>
              <span>Potential XP Loss: <b>-25 XP</b></span>
            </div>
            <button
              className="button button-primary"
              style={{ width: '100%', marginTop: '14px' }}
              onClick={() => setShowWardAlert(false)}
            >
              Resume Deep Focus
            </button>
          </div>
        </div>
      )}
    </div>
  )
}