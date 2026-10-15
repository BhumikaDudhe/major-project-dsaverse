import { useState } from 'react'
import { ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, CirclePlay, Clock3, LockKeyhole, Play, Search, Sparkles } from 'lucide-react'
import { topics, type Language } from '../data'

export function LearningPath({ language, onOpenVisualizer }: { language: Language; onOpenVisualizer: () => void }) {
  const [expanded, setExpanded] = useState<string | null>('arrays')
  const [filter, setFilter] = useState('All topics')
  const [query, setQuery] = useState('')
  const [completedLessons, setCompletedLessons] = useState<string[]>(['basics:Variables & data types', 'basics:Conditions and loops', 'basics:Functions, step by step'])
  const filtered = topics.filter((topic) => (filter === 'All topics' || topic.level === filter) && `${topic.title} ${topic.hindi}`.toLowerCase().includes(query.toLowerCase()))
  const hi = language === 'HI'
  const toggleLesson = (lessonId: string) => setCompletedLessons((current) => current.includes(lessonId) ? current.filter((item) => item !== lessonId) : [...current, lessonId])

  return <div className="page-enter learning-page">
    <div className="page-heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> THE LEARNING PATH</div><h1>{hi ? 'Zero se confident tak.' : 'Your path to DSA fluency.'}</h1><p>{hi ? 'Har concept ko bite-size lessons mein samjho, phir practice karo.' : 'A beginner-first roadmap. Learn a concept, see it in action, then make it yours.'}</p></div><div className="roadmap-summary"><span><BookOpen size={15} /> 10 modules</span><span><Clock3 size={15} /> ~42 hours</span></div></div>
    <div className="learning-overview"><div className="learning-overview-copy"><div className="section-kicker">{hi ? 'ABHI SEEKH RAHE HO' : 'CURRENTLY LEARNING'}</div><h2>{hi ? 'Arrays aur strings' : 'Arrays & strings'}</h2><p>{hi ? 'Interview problems ke common patterns yahin se shuru hote hain.' : "You're building the patterns that power 80% of interview problems."}</p><div className="overview-progress"><div className="progress-track"><span style={{ width: '38%' }} /></div><b>38%</b></div><button className="button button-primary" onClick={() => setExpanded('arrays')}><Play size={14} fill="currentColor" /> {hi ? 'Module continue karo' : 'Continue module'} <ArrowRight size={14} /></button></div><div className="overview-visual"><div className="array-tiles"><span>07</span><span>12</span><span className="tile-active">04</span><span>19</span><span>03</span></div><div className="overview-visual-caption"><Sparkles size={14} /> {hi ? 'ek concept har baar' : 'one concept at a time'}</div></div></div>
    <div className="roadmap-toolbar"><div><h2>Core curriculum</h2><span>{hi ? 'Concepts ko ek-ek karke samjho aur practice karo.' : 'Start anywhere, but the order is designed to make concepts click.'}</span></div><div className="roadmap-filters"><label className="roadmap-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={hi ? 'Topic dhoondo' : 'Find a topic'} /></label><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All topics</option><option>Start here</option><option>Foundation</option><option>Core</option><option>Advanced</option></select></div></div>
    <div className="roadmap-list">{filtered.map((topic, index) => {
      const isLocked = topic.progress === 0 && index > 3
      const isExpanded = expanded === topic.id
      return <article className={`roadmap-module ${isExpanded ? 'module-expanded' : ''}`} key={topic.id}>
        <button className="module-head" onClick={() => setExpanded(isExpanded ? null : topic.id)}><span className={`module-number unit-${topic.color}`}>{topic.progress === 100 ? <Check size={17} /> : topic.unit}</span><span className="module-title"><span className="module-meta"><span>{topic.level}</span><i />{topic.time}</span><strong>{hi ? topic.hindi : topic.title}</strong></span><span className="module-progress-area"><span className="module-progress-track"><i style={{ width: `${topic.progress}%` }} /></span><small>{topic.progress ? `${topic.progress}%` : isLocked ? 'LOCKED' : 'START'}</small></span><span className="module-status">{isLocked ? <LockKeyhole size={16} /> : topic.progress === 100 ? <span className="done-pill">DONE</span> : <ChevronDown size={17} className={isExpanded ? 'rotate-chevron' : ''} />}</span></button>
        {isExpanded && <div className="module-lessons">{topic.lessons.map((lesson, lessonIndex) => {
          const lessonId = `${topic.id}:${lesson}`
          const done = completedLessons.includes(lessonId)
          return <button className="lesson-row" key={lessonId} aria-pressed={done} onClick={() => toggleLesson(lessonId)}><span className={`lesson-state ${done ? 'lesson-done' : ''}`}>{done ? <Check size={12} /> : <CirclePlay size={14} />}</span><span>{lesson}</span><span className="lesson-duration">{lessonIndex === 0 ? '8 min' : lessonIndex === 1 ? '12 min' : '10 min'}</span><ChevronRight size={14} /></button>
        })}{topic.id === 'search' && <button className="lesson-visualizer-link" onClick={onOpenVisualizer}><span><Sparkles size={14} /> Make it click: try the visual lab</span><ArrowRight size={14} /></button>}</div>}
      </article>
    })}{filtered.length === 0 && <div className="empty-state"><Search size={22} /><strong>No topics match that search</strong><span>Try another keyword or choose a different level.</span></div>}</div>
    <div className="learning-footnote"><span className="mentor-spark"><Sparkles size={15} /></span><span><strong>{hi ? 'Concept mein atke?' : 'Stuck on a concept?'}</strong> {hi ? 'AI mentor se simple explanation maango.' : 'Your AI mentor can break it down in plain language.'}</span><button onClick={() => window.dispatchEvent(new CustomEvent('open-mentor'))}>{hi ? 'Hint maango' : 'Ask a hint'} <ArrowRight size={13} /></button></div>
  </div>
}