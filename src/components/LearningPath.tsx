import { useState } from 'react'
import { AlertTriangle, ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown, ChevronRight, CirclePlay, Clock3, Code2, Gauge, Lightbulb, LockKeyhole, Play, Search, Sparkles, X } from 'lucide-react'
import { topics, type Language } from '../data'
import { CURRICULUM_THEORY } from '../lib/curriculumTheory'
import '../worldTheory.css'

export function LearningPath({ language, onOpenVisualizer }: { language: Language; onOpenVisualizer: () => void }) {
  const [expanded, setExpanded] = useState<string | null>('arrays')
  const [filter, setFilter] = useState('All topics')
  const [query, setQuery] = useState('')
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    'basics:Variables & data types',
    'basics:Conditions and loops',
    'basics:Functions, step by step',
  ])
  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(null)
  const [subtopicTab, setSubtopicTab] = useState<'theory' | 'examples' | 'complexity' | 'takeaways'>('theory')

  const filtered = topics.filter((topic) => (filter === 'All topics' || topic.level === filter) && `${topic.title} ${topic.hindi}`.toLowerCase().includes(query.toLowerCase()))
  const hi = language === 'HI'

  const toggleLesson = (lessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCompletedLessons((current) => current.includes(lessonId) ? current.filter((item) => item !== lessonId) : [...current, lessonId])
  }

  const openSubtopic = (lessonId: string) => {
    setActiveSubtopicId(lessonId)
    setSubtopicTab('theory')
  }

  const activeTheory = activeSubtopicId ? CURRICULUM_THEORY[activeSubtopicId] : null
  const isCurrentDone = activeSubtopicId ? completedLessons.includes(activeSubtopicId) : false

  return <div className="page-enter learning-page">
    <div className="page-heading-row">
      <div>
        <div className="eyebrow"><span className="eyebrow-line" /> THE LEARNING PATH</div>
        <h1>{hi ? 'Zero se confident tak.' : 'Your path to DSA fluency.'}</h1>
        <p>{hi ? 'Har concept ko bite-size lessons mein samjho, phir practice karo.' : 'A beginner-first roadmap. Learn a concept, see it in action, then make it yours.'}</p>
      </div>
      <div className="roadmap-summary">
        <span><BookOpen size={15} /> 10 modules</span>
        <span><Clock3 size={15} /> ~42 hours</span>
      </div>
    </div>

    <div className="learning-overview">
      <div className="learning-overview-copy">
        <div className="section-kicker">{hi ? 'ABHI SEEKH RAHE HO' : 'CURRENTLY LEARNING'}</div>
        <h2>{hi ? 'Arrays aur strings' : 'Arrays & strings'}</h2>
        <p>{hi ? 'Interview problems ke common patterns yahin se shuru hote hain.' : "You're building the patterns that power 80% of interview problems."}</p>
        <div className="overview-progress">
          <div className="progress-track"><span style={{ width: '38%' }} /></div>
          <b>38%</b>
        </div>
        <button className="button button-primary" onClick={() => setExpanded('arrays')}>
          <Play size={14} fill="currentColor" /> {hi ? 'Module continue karo' : 'Continue module'} <ArrowRight size={14} />
        </button>
      </div>
      <div className="overview-visual">
        <div className="array-tiles">
          <span>07</span><span>12</span><span className="tile-active">04</span><span>19</span><span>03</span>
        </div>
        <div className="overview-visual-caption"><Sparkles size={14} /> {hi ? 'ek concept har baar' : 'one concept at a time'}</div>
      </div>
    </div>

    <div className="roadmap-toolbar">
      <div>
        <h2>Core curriculum</h2>
        <span>{hi ? 'Subtopic par click karke uski theory aur examples padhein.' : 'Click any subtopic to view its in-depth theory, concepts, and code examples.'}</span>
      </div>
      <div className="roadmap-filters">
        <label className="roadmap-search">
          <Search size={14} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={hi ? 'Topic dhoondo' : 'Find a topic'} />
        </label>
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option>All topics</option>
          <option>Start here</option>
          <option>Foundation</option>
          <option>Core</option>
          <option>Advanced</option>
        </select>
      </div>
    </div>

    <div className="roadmap-list">
      {filtered.map((topic, index) => {
        const isLocked = topic.progress === 0 && index > 3
        const isExpanded = expanded === topic.id
        return <article className={`roadmap-module ${isExpanded ? 'module-expanded' : ''}`} key={topic.id}>
          <button className="module-head" onClick={() => setExpanded(isExpanded ? null : topic.id)}>
            <span className={`module-number unit-${topic.color}`}>{topic.progress === 100 ? <Check size={17} /> : topic.unit}</span>
            <span className="module-title">
              <span className="module-meta"><span>{topic.level}</span><i />{topic.time}</span>
              <strong>{hi ? topic.hindi : topic.title}</strong>
            </span>
            <span className="module-progress-area">
              <span className="module-progress-track"><i style={{ width: `${topic.progress}%` }} /></span>
              <small>{topic.progress ? `${topic.progress}%` : isLocked ? 'LOCKED' : 'START'}</small>
            </span>
            <span className="module-status">
              {isLocked ? <LockKeyhole size={16} /> : topic.progress === 100 ? <span className="done-pill">DONE</span> : <ChevronDown size={17} className={isExpanded ? 'rotate-chevron' : ''} />}
            </span>
          </button>

          {isExpanded && <div className="module-lessons">
            {topic.lessons.map((lesson, lessonIndex) => {
              const lessonId = `${topic.id}:${lesson}`
              const done = completedLessons.includes(lessonId)
              return (
                <button
                  className="lesson-row"
                  key={lessonId}
                  aria-pressed={done}
                  onClick={() => openSubtopic(lessonId)}
                  title={hi ? `${lesson} ki theory aur examples padhein` : `Click to read theory & examples for ${lesson}`}
                >
                  <span
                    className={`lesson-state ${done ? 'lesson-done' : ''}`}
                    onClick={(e) => toggleLesson(lessonId, e)}
                    title={done ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {done ? <Check size={12} /> : <CirclePlay size={14} />}
                  </span>
                  <span>{lesson}</span>
                  <span className="lesson-duration">{lessonIndex === 0 ? '8 min' : lessonIndex === 1 ? '12 min' : '10 min'}</span>
                  <ChevronRight size={14} />
                </button>
              )
            })}
            {topic.id === 'search' && (
              <button className="lesson-visualizer-link" onClick={onOpenVisualizer}>
                <span><Sparkles size={14} /> Make it click: try the visual lab</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>}
        </article>
      })}
      {filtered.length === 0 && <div className="empty-state"><Search size={22} /><strong>No topics match that search</strong><span>Try another keyword or choose a different level.</span></div>}
    </div>

    <div className="learning-footnote">
      <span className="mentor-spark"><Sparkles size={15} /></span>
      <span><strong>{hi ? 'Concept mein atke?' : 'Stuck on a concept?'}</strong> {hi ? 'AI mentor se simple explanation maango.' : 'Your AI mentor can break it down in plain language.'}</span>
      <button onClick={() => window.dispatchEvent(new CustomEvent('open-mentor'))}>
        {hi ? 'Hint maango' : 'Ask a hint'} <ArrowRight size={13} />
      </button>
    </div>

    {/* SUBTOPIC THEORY & EXAMPLES MODAL */}
    {activeTheory && (
      <div className="world-modal-backdrop" role="presentation" onClick={() => setActiveSubtopicId(null)}>
        <section
          className="world-modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="subtopic-modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="world-modal-close-btn" aria-label="Close" onClick={() => setActiveSubtopicId(null)}>
            <X size={18} />
          </button>

          <header className="world-modal-header">
            <div className="world-modal-header-top">
              <span className="world-modal-badge is-unlocked">
                <BookOpen size={12} />
                {hi ? activeTheory.moduleTitleHi.toUpperCase() : activeTheory.moduleTitle.toUpperCase()} · {activeTheory.estimatedTime} READ
              </span>
              {isCurrentDone && (
                <span className="world-modal-badge is-unlocked">
                  <CheckCircle2 size={12} /> {hi ? 'COMPLETED' : 'COMPLETED'}
                </span>
              )}
            </div>

            <h2 id="subtopic-modal-title">
              {hi ? activeTheory.subtopicTitleHi : activeTheory.subtopicTitle}
            </h2>
            <p className="world-modal-subtitle">
              {hi ? `Core curriculum concept: ${activeTheory.subtopicTitleHi}` : `Core curriculum concept: ${activeTheory.subtopicTitle}`}
            </p>
          </header>

          <nav className="world-modal-tabs">
            <button
              className={`world-tab-btn ${subtopicTab === 'theory' ? 'tab-active' : ''}`}
              onClick={() => setSubtopicTab('theory')}
            >
              <BookOpen size={14} /> {hi ? 'Core Theory' : 'Core Theory'}
            </button>
            <button
              className={`world-tab-btn ${subtopicTab === 'examples' ? 'tab-active' : ''}`}
              onClick={() => setSubtopicTab('examples')}
            >
              <Code2 size={14} /> {hi ? 'Code Examples' : 'Code Examples'}
            </button>
            {activeTheory.complexities && (
              <button
                className={`world-tab-btn ${subtopicTab === 'complexity' ? 'tab-active' : ''}`}
                onClick={() => setSubtopicTab('complexity')}
              >
                <Gauge size={14} /> {hi ? 'Complexity Matrix' : 'Complexity Matrix'}
              </button>
            )}
            <button
              className={`world-tab-btn ${subtopicTab === 'takeaways' ? 'tab-active' : ''}`}
              onClick={() => setSubtopicTab('takeaways')}
            >
              <Lightbulb size={14} /> {hi ? 'Key Takeaways & Pitfalls' : 'Key Takeaways & Pitfalls'}
            </button>
          </nav>

          <div className="world-modal-body">
            {subtopicTab === 'theory' && (
              <>
                <div className="world-overview-card">
                  <p>{hi ? activeTheory.overviewHi : activeTheory.overview}</p>
                </div>

                <div className="theory-concepts-list">
                  {activeTheory.concepts.map((concept, idx) => (
                    <article key={idx} className="theory-concept-card">
                      <h3>
                        <BookOpen size={16} /> {hi ? concept.titleHi : concept.title}
                      </h3>
                      <p className="concept-summary">{hi ? concept.contentHi : concept.content}</p>
                      <ul>
                        {(hi && concept.pointsHi ? concept.pointsHi : concept.points).map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </>
            )}

            {subtopicTab === 'examples' && (
              <div className="theory-examples-list">
                {activeTheory.examples.map((example, idx) => (
                  <article key={idx} className="theory-example-card">
                    <header className="theory-example-header">
                      <h4>{hi ? example.titleHi : example.title}</h4>
                      <span className="complexity-badge">TypeScript / JS</span>
                    </header>
                    <p className="example-desc">{hi ? example.descriptionHi : example.description}</p>
                    <div className="theory-code-container">
                      <pre>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    {example.output && (
                      <div className="example-desc" style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#88e0a0' }}>
                        ❯ <strong>Output:</strong> {example.output}
                      </div>
                    )}
                    <p className="example-explanation">
                      💡 <strong>{hi ? 'Samjhein' : 'Explanation'}:</strong>{' '}
                      {hi ? example.explanationHi : example.explanation}
                    </p>
                  </article>
                ))}
              </div>
            )}

            {subtopicTab === 'complexity' && activeTheory.complexities && (
              <div className="complexity-table-wrapper">
                <table className="theory-complexity-table">
                  <thead>
                    <tr>
                      <th>{hi ? 'Operation' : 'Operation'}</th>
                      <th>{hi ? 'Time Complexity' : 'Time'}</th>
                      <th>{hi ? 'Space Complexity' : 'Space'}</th>
                      <th>{hi ? 'Notes' : 'Notes'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTheory.complexities.map((item, idx) => (
                      <tr key={idx}>
                        <td><strong>{item.operation}</strong></td>
                        <td><span className="complexity-badge">{item.time}</span></td>
                        <td><span className="complexity-badge">{item.space}</span></td>
                        <td>{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {subtopicTab === 'takeaways' && (
              <>
                <div className="takeaways-card">
                  <h3>
                    <Lightbulb size={18} /> {hi ? 'Mukhya Niyam aur Best Practices' : 'Core Principles & Best Practices'}
                  </h3>
                  <ul className="takeaways-list">
                    {(hi && activeTheory.takeawaysHi ? activeTheory.takeawaysHi : activeTheory.takeaways).map((tip, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeTheory.pitfalls && activeTheory.pitfalls.length > 0 && (
                  <div className="theory-pitfalls-card">
                    <h3>
                      <AlertTriangle size={17} /> {hi ? 'Common Galatiyan jinse Bachna Hai' : 'Common Pitfalls to Avoid'}
                    </h3>
                    <ul className="theory-pitfalls-list">
                      {(hi && activeTheory.pitfallsHi ? activeTheory.pitfallsHi : activeTheory.pitfalls).map((pitfall, idx) => (
                        <li key={idx}>
                          <AlertTriangle size={14} />
                          <span>{pitfall}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          <footer className="world-modal-footer">
            <button
              className="world-modal-btn-primary"
              onClick={() => {
                if (activeSubtopicId) toggleLesson(activeSubtopicId)
              }}
            >
              <CheckCircle2 size={14} />
              {isCurrentDone
                ? (hi ? 'Mark Incomplete' : 'Mark Incomplete')
                : (hi ? 'Complete Mark Karein' : 'Mark as Completed')}
            </button>
            <button className="world-modal-btn-secondary" onClick={() => setActiveSubtopicId(null)}>
              {hi ? 'Curriculum par Wapas' : 'Back to Curriculum'}
            </button>
          </footer>
        </section>
      </div>
    )}
  </div>
}