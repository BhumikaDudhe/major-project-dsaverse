import { useEffect, useState } from 'react'
import { Bell, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Focus, Pause, Play, Plus, RotateCcw, Sparkles, Target, Trash2 } from 'lucide-react'
import type { Language } from '../data'

type PlanTask = { id: number; title: string; time: string; done: boolean; color: string; date: number }
const initialTasks: PlanTask[] = [
  { id: 1, title: 'Binary search: visual walkthrough', time: '09:00 AM', done: true, color: 'cyan', date: 13 },
  { id: 2, title: 'Solve 2 array problems', time: '10:30 AM', done: false, color: 'violet', date: 13 },
  { id: 3, title: 'Review recursion notes', time: '04:00 PM', done: false, color: 'amber', date: 13 },
]
const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const weekdayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

export function StudyPlanner({ language }: { language: Language }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [adding, setAdding] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [minutes, setMinutes] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [reminders, setReminders] = useState(true)
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState(13)
  const hi = language === 'HI'
  const dates = weekOffset === 0 ? [12, 13, 14, 15, 16, 17, 18] : [19, 20, 21, 22, 23, 24, 25]
  const selectedIndex = dates.indexOf(selectedDate)
  const visibleTasks = tasks.filter((task) => task.date === selectedDate)

  useEffect(() => {
    if (!running || minutes <= 0) return
    const timer = window.setInterval(() => setMinutes((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [running, minutes])

  const changeWeek = (offset: number) => {
    const nextOffset = Math.max(0, Math.min(1, offset))
    setWeekOffset(nextOffset)
    setSelectedDate(nextOffset === 0 ? 13 : 19)
  }
  const addTask = () => {
    if (!taskTitle.trim()) return
    setTasks((current) => [...current, { id: Date.now(), title: taskTitle.trim(), time: '06:00 PM', done: false, color: 'mint', date: selectedDate }])
    setTaskTitle('')
    setAdding(false)
  }
  const toggleTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task))

  return <div className="page-enter planner-page">
    <div className="page-heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR STUDY RHYTHM</div><h1>{hi ? 'Chhote sessions. Solid progress.' : 'Make time for your next level.'}</h1><p>{hi ? 'Simple plan, focused sprint, aur roz ka thoda progress.' : 'A light plan, a focused sprint, and a little consistency goes a long way.'}</p></div><button className="button button-primary" onClick={() => setAdding(!adding)}><Plus size={15} /> {hi ? 'Session plan karo' : 'Plan a session'}</button></div>
    <div className="planner-layout"><section className="panel weekly-plan">
      <div className="panel-heading"><div><span className="section-kicker">WEEK VIEW</span><h2>October {weekOffset === 0 ? '12–18' : '19–25'}, 2026</h2></div><div className="week-switch"><button aria-label="Previous week" onClick={() => changeWeek(weekOffset - 1)}><ChevronLeft size={17} /></button><button aria-label="Next week" onClick={() => changeWeek(weekOffset + 1)}><ChevronRight size={17} /></button></div></div>
      <div className="week-strip">{weekDays.map((day, index) => <button key={day} onClick={() => setSelectedDate(dates[index])} className={`week-day ${dates[index] === selectedDate ? 'day-selected' : ''} ${index === 6 ? 'day-weekend' : ''}`} aria-pressed={dates[index] === selectedDate}><span>{day}</span><strong>{dates[index]}</strong><i className={tasks.some((task) => task.date === dates[index]) ? 'day-has-task' : ''} /></button>)}</div>
      <div className="plan-summary"><span><Target size={15} /> <b>{tasks.filter((task) => task.done).length}/{tasks.length}</b> sessions completed</span><span><Clock3 size={15} /> 2h 15m planned</span></div>
      {adding && <div className="add-task-form"><input autoFocus value={taskTitle} placeholder={hi ? 'Kis par kaam karoge?' : 'What will you work on?'} onChange={(event) => setTaskTitle(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addTask()} /><button onClick={addTask}>{hi ? 'Add karo' : 'Add session'}</button></div>}
      <div className="schedule-label"><span>{weekdayNames[selectedIndex]}, OCT {selectedDate}</span><button onClick={() => setAdding(!adding)}><Plus size={13} /> {hi ? 'Task add karo' : 'Add task'}</button></div>
      <div className="schedule-list">{visibleTasks.map((task) => <div className={`schedule-item ${task.done ? 'task-done' : ''}`} key={task.id}><span className="schedule-time">{task.time}</span><button className={`task-check task-${task.color} ${task.done ? 'checked' : ''}`} aria-label={task.done ? 'Mark incomplete' : 'Mark complete'} onClick={() => toggleTask(task.id)}>{task.done && <Check size={13} />}</button><div className={`task-line line-${task.color}`} /><div className="schedule-task-copy"><strong>{task.title}</strong><span>{task.done ? 'Completed' : 'Study session • 30 min'}</span></div><button className="task-delete" aria-label="Delete task" onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}><Trash2 size={14} /></button></div>)}{visibleTasks.length === 0 && <div className="empty-state compact-empty"><CalendarDays size={20} /><strong>{hi ? 'Aaj koi session plan nahi' : 'No sessions planned'}</strong><span>{hi ? 'Shuru karne ke liye ek chhota task add karo.' : 'Add one small thing to get started.'}</span></div>}</div>
    </section>
    <aside className="planner-aside"><section className="focus-card"><div className="focus-card-top"><span><Focus size={15} /> FOCUS TIMER</span><button onClick={() => { setMinutes(25 * 60); setRunning(false) }} title="Reset timer"><RotateCcw size={14} /></button></div><div className="focus-orbit"><div className="focus-time"><strong>{String(Math.floor(minutes / 60)).padStart(2, '0')}:{String(minutes % 60).padStart(2, '0')}</strong><span>{running ? 'FOCUSING' : minutes === 0 ? 'SESSION DONE' : 'DEEP FOCUS'}</span></div></div><div className="focus-presets">{[15, 25, 45].map((preset) => <button key={preset} onClick={() => { setMinutes(preset * 60); setRunning(false) }}>{preset} min</button>)}</div><button className="focus-start" onClick={() => setRunning(!running)}>{running ? <><Pause size={14} fill="currentColor" /> Pause focus</> : <><Play size={14} fill="currentColor" /> Start focus</>}</button><div className="focus-caption"><Sparkles size={13} /> You got this. One thing at a time.</div></section>
      <section className="reminder-card"><div className="reminder-icon"><Bell size={17} /></div><div><strong>Daily reminder</strong><span>{reminders ? 'Every day at 6:00 PM' : 'Reminders paused'}</span></div><button role="switch" aria-checked={reminders} className={`toggle-switch ${reminders ? 'toggle-on' : ''}`} onClick={() => setReminders(!reminders)}><i /></button></section>
      <section className="weekly-goal"><div className="goal-top"><span>WEEKLY GOAL</span><strong>4 / 5 hrs</strong></div><div className="goal-track"><i /></div><span className="goal-caption">Just one more hour to hit your goal ✦</span></section></aside></div>
  </div>
}