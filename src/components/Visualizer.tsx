import { useEffect, useMemo, useState } from 'react'
import { Activity, ArrowLeft, ArrowRight, GitBranch, List, Pause, Play, RotateCcw, SkipBack, SkipForward, SlidersHorizontal, Sparkles, SquareStack, Timer } from 'lucide-react'
import type { Language } from '../data'

type Algorithm = 'binary' | 'sorting' | 'stack' | 'queue' | 'linked' | 'tree'
type Frame = { values: number[]; active: number[]; description: string; range?: [number, number] }
const initialValues = [12, 19, 27, 34, 42, 51, 63, 71, 86]
const options: { id: Algorithm; label: string; icon: typeof Activity; complexity: string }[] = [
  { id: 'binary', label: 'Binary search', icon: Activity, complexity: 'O(log n)' },
  { id: 'sorting', label: 'Bubble sort', icon: SlidersHorizontal, complexity: 'O(n²)' },
  { id: 'stack', label: 'Stack', icon: SquareStack, complexity: 'O(1)' },
  { id: 'queue', label: 'Queue', icon: List, complexity: 'O(1)' },
  { id: 'linked', label: 'Linked list', icon: GitBranch, complexity: 'O(n)' },
  { id: 'tree', label: 'Tree traversal', icon: GitBranch, complexity: 'O(n)' },
]

function makeFrames(algorithm: Algorithm): Frame[] {
  if (algorithm === 'binary') {
    const frames: Frame[] = [{ values: initialValues, active: [], range: [0, 8], description: 'Sorted array ready. We will search for 51.' }]
    let left = 0, right = initialValues.length - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      frames.push({ values: initialValues, active: [mid], range: [left, right], description: `Check the middle: ${initialValues[mid]}. ${initialValues[mid] === 51 ? 'Found the target!' : initialValues[mid] < 51 ? '51 is larger, so ignore the left half.' : '51 is smaller, so ignore the right half.'}` })
      if (initialValues[mid] === 51) break
      if (initialValues[mid] < 51) left = mid + 1
      else right = mid - 1
    }
    return frames
  }
  if (algorithm === 'sorting') {
    const values = [42, 19, 63, 12, 51, 27]
    const frames: Frame[] = [{ values: [...values], active: [], description: 'Unsorted array. Bubble the largest value to the end.' }]
    for (let end = values.length - 1; end > 0; end--) for (let i = 0; i < end; i++) {
      frames.push({ values: [...values], active: [i, i + 1], description: `${values[i]} ${values[i] > values[i + 1] ? 'is bigger than' : 'is smaller than'} ${values[i + 1]}${values[i] > values[i + 1] ? ', swap them.' : ', keep them.'}` })
      if (values[i] > values[i + 1]) [values[i], values[i + 1]] = [values[i + 1], values[i]]
      frames.push({ values: [...values], active: [i, i + 1], description: values[i] > values[i + 1] ? 'Swap complete.' : 'Pair is already in order.' })
    }
    frames.push({ values: [...values], active: [], description: 'Sorted! Every element is now in the right place.' })
    return frames
  }
  if (algorithm === 'stack') {
    return [[], [18], [18, 32], [18, 32, 47], [18, 32], [18, 32, 61]].map((values, i) => ({ values, active: values.length ? [values.length - 1] : [], description: ['Stack starts empty. LIFO: last in, first out.', 'Push 18 onto the stack.', 'Push 32. It becomes the new top.', 'Push 47. Top is now 47.', 'Pop removes 47, the last value added.', 'Push 61. It is the new top.'][i] }))
  }
  if (algorithm === 'queue') return [[], [18], [18, 32], [18, 32, 47], [32, 47], [32, 47, 61]].map((values, i) => ({ values, active: values.length ? [0] : [], description: ['Queue starts empty. FIFO: first in, first out.', 'Enqueue 18 at the back.', 'Enqueue 32 at the back.', 'Enqueue 47 at the back.', 'Dequeue removes 18 from the front.', 'Enqueue 61 at the back.'][i] }))
  if (algorithm === 'linked') return [[14], [14, 28], [14, 28, 46], [14, 28, 46, 53], [14, 46, 53], [9, 14, 46, 53]].map((values, i) => ({ values, active: [Math.max(0, values.length - 1)], description: ['A linked list is a chain of nodes connected by pointers.', 'Add node 28 after 14. Update the next pointer.', 'Add node 46 at the tail.', 'Add node 53. Tail now points to null.', 'Remove 28 by connecting 14 directly to 46.', 'Insert 9 at the head. Its next points to 14.'][i] }))
  return [[1], [1, 2], [1, 2, 4], [1, 2, 4, 5], [1, 2, 4, 5, 3], [1, 2, 4, 5, 3, 6], [1, 2, 4, 5, 3, 6, 7]].map((values, i) => ({ values, active: [values.length - 1], description: ['Pre-order DFS: visit root, then left subtree, then right.', 'Visit root node 1.', 'Go left to node 2.', 'Go left again to node 4.', 'Backtrack, then visit node 5.', 'Back to root, visit right child 3.', 'Visit node 6, then node 7. Traversal complete!'][i] }))
}

export function Visualizer({ language, onEarnXp }: { language: Language; onEarnXp: () => void }) {
  const [algorithm, setAlgorithm] = useState<Algorithm>('binary')
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [earned, setEarned] = useState(false)
  const frames = useMemo(() => makeFrames(algorithm), [algorithm])
  const frame = frames[step]
  const selected = options.find((option) => option.id === algorithm)!
  const hi = language === 'HI'
  const hinglishDescriptions: Record<Algorithm, string[]> = {
    binary: ['Sorted array ready hai. Hum 51 ko dhoondhenge.', 'Middle value 42 hai. 51 bada hai, toh left half hata do.', 'Middle value 63 hai. 51 chhota hai, toh right half hata do.', 'Target 51 mil gaya!'],
    sorting: ['Array unsorted hai. Har pass mein largest value end tak jayegi.', 'Adjacent values compare karo. Bada value pehle ho toh swap karo.', 'Swap complete. Ab next pair ko compare karte hain.', 'Array sort ho gaya! Har value sahi jagah par hai.'],
    stack: ['Stack empty hai. LIFO: sabse last aaya, pehle niklega.', '18 ko stack ke top par push karo.', '32 push hua. Ab wahi top par hai.', '47 push hua. Stack ka top ab 47 hai.', 'Pop se last added value 47 remove hoti hai.', '61 push karo. Ye naya top hai.'],
    queue: ['Queue empty hai. FIFO: jo pehle aaya, pehle niklega.', '18 ko queue ke peeche enqueue karo.', '32 ko peeche add karo.', '47 ko peeche add karo.', 'Dequeue se front ka 18 remove hota hai.', '61 ko queue ke peeche enqueue karo.'],
    linked: ['Linked list nodes ki chain hai, pointers se connected.', '28 ko 14 ke baad add karo. Next pointer update karo.', '46 ko tail par add karo.', '53 add hua. Tail ab null ko point karta hai.', '14 ko seedha 46 se connect karke 28 hatao.', '9 ko head par insert karo. Iska next, 14 hoga.'],
    tree: ['Pre-order DFS: root, phir left subtree, phir right.', 'Root node 1 visit karo.', 'Left mein jaakar node 2 visit karo.', 'Ek level aur neeche, node 4 visit karo.', 'Backtrack karke node 5 visit karo.', 'Root par wapas. Ab right child 3 visit karo.', 'Node 6 aur phir 7. Traversal complete!'],
  }
  const visibleDescription = hi ? hinglishDescriptions[algorithm][step] ?? frame.description : frame.description
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setStep((current) => { if (current >= frames.length - 1) { setPlaying(false); return current } return current + 1 }), 900 / speed); return () => window.clearInterval(timer) }, [playing, speed, frames.length])
  useEffect(() => { setStep(0); setPlaying(false); setEarned(false) }, [algorithm])
  useEffect(() => { if (step === frames.length - 1 && !earned) { setEarned(true); onEarnXp() } }, [step, frames.length, earned, onEarnXp])
  const changeStep = (next: number) => { const bounded = Math.max(0, Math.min(frames.length - 1, next)); setStep(bounded); if (bounded === frames.length - 1 && !earned) { setEarned(true); onEarnXp() } }
  const selectAlgorithm = (id: Algorithm) => { setAlgorithm(id); setStep(0); setPlaying(false) }
  return <div className="page-enter visualizer-page"><div className="page-heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> INTERACTIVE PLAYGROUND</div><h1>{hi ? 'Dekho. Samjho. Master karo.' : 'See the algorithm think.'}</h1><p>{hi ? 'Algorithm ko step by step dekho, aur logic ko apna banao.' : 'Slow things down, step through the logic, and make it click.'}</p></div><div className="visualizer-xp"><Sparkles size={15} /><span>{hi ? 'Run complete karo' : 'Complete a run'}</span><b>+15 XP</b></div></div>
    <div className="visualizer-layout"><aside className="algorithm-sidebar"><span className="side-label">DATA STRUCTURES & ALGORITHMS</span>{options.map(({ id, label, icon: Icon, complexity }) => <button key={id} className={`algorithm-choice ${algorithm === id ? 'selected' : ''}`} onClick={() => selectAlgorithm(id)}><Icon size={16} /><span>{label}</span><small>{complexity}</small></button>)}<div className="complexity-note"><span>TIME COMPLEXITY</span><strong>{selected.complexity}</strong><small>{algorithm === 'binary' ? 'Each step cuts the search space in half.' : algorithm === 'sorting' ? 'Compare adjacent values, then swap.' : 'Operations follow the structure rules.'}</small></div></aside>
      <section className="visualizer-workspace"><div className="visualizer-toolbar"><div><span className="live-indicator"><i /> LIVE</span><span className="visualizer-name">{selected.label}</span></div><div className="toolbar-controls"><span className="step-count">STEP <b>{String(step + 1).padStart(2, '0')}</b><i>/</i>{String(frames.length).padStart(2, '0')}</span><button className="icon-button" title="Reset" aria-label="Reset animation" onClick={() => { setPlaying(false); changeStep(0) }}><RotateCcw size={15} /></button></div></div>
        <div className={`visual-stage stage-${algorithm}`}>{algorithm === 'tree' ? <div className="tree-stage"><div className="tree-edges"><i /><i /><i /><i /><i /><i /></div>{[[1], [2, 3], [4, 5, 6, 7]].map((row, rowIndex) => <div className="tree-row" key={rowIndex}>{row.map((node) => <span key={node} className={`tree-node ${frame.active.includes(node - 1) ? 'node-active' : ''} ${frame.values.slice(0, step + 1).includes(node) ? 'node-visited' : ''}`}>{node}</span>)}</div>)}</div> : algorithm === 'stack' ? <div className="structure-view stack-view"><div className="stack-label">TOP <ArrowRight size={13} /></div>{frame.values.length ? [...frame.values].reverse().map((value, index) => <div className={`structure-node stack-node ${index === 0 ? 'node-active' : ''}`} key={index}>{value}</div>) : <div className="structure-empty">Stack is empty</div>}<div className="structure-base">STACK</div></div> : algorithm === 'queue' ? <div className="structure-view queue-view"><div className="queue-labels"><span>FRONT <ArrowRight size={12} /></span><span>BACK</span></div>{frame.values.length ? frame.values.map((value, index) => <div className={`structure-node queue-node ${index === 0 || index === frame.values.length - 1 ? 'node-active' : ''}`} key={index}>{value}</div>) : <div className="structure-empty">Queue is empty</div>}</div> : algorithm === 'linked' ? <div className="linked-view">{frame.values.map((value, index) => <div className="linked-item" key={`${value}-${index}`}><div className={`linked-node ${frame.active.includes(index) ? 'node-active' : ''}`}><span>{value}</span><i>next</i></div>{index < frame.values.length - 1 && <ArrowRight className="linked-arrow" size={22} />}{index === frame.values.length - 1 && <span className="null-node">NULL</span>}</div>)}</div> : <div className="array-stage"><div className="array-baseline" />{frame.values.map((value, index) => { const highlighted = frame.active.includes(index); const inRange = frame.range && index >= frame.range[0] && index <= frame.range[1]; return <div className={`array-column ${highlighted ? 'bar-active' : ''} ${frame.range && !inRange ? 'bar-muted' : ''} ${algorithm === 'sorting' ? 'sort-bar' : ''}`} key={index} style={{ height: `${28 + value * 1.15}px`, animationDelay: `${index * 25}ms` }}><strong>{value}</strong><span>{index}</span></div> })}<div className="array-labels"><span>INDEX</span><span>VALUE</span></div></div>}</div>
        <div className="step-explanation"><div className="explanation-icon"><Sparkles size={15} /></div><div><span>{hi ? 'ABHI KYA HO RAHA HAI' : "WHAT'S HAPPENING"}</span><p>{visibleDescription}</p></div><span className="step-pip">{step + 1} / {frames.length}</span></div>
        <div className="player-controls"><div className="player-buttons"><button className="icon-button" title="First step" aria-label="First step" onClick={() => changeStep(0)}><SkipBack size={16} /></button><button className="icon-button" title="Previous step" aria-label="Previous step" onClick={() => changeStep(step - 1)}><ArrowLeft size={16} /></button><button className="play-control" onClick={() => step >= frames.length - 1 ? changeStep(0) : setPlaying(!playing)} aria-label={playing ? 'Pause animation' : 'Play animation'}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button><button className="icon-button" title="Next step" aria-label="Next step" onClick={() => changeStep(step + 1)}><ArrowRight size={16} /></button><button className="icon-button" title="Last step" aria-label="Last step" onClick={() => changeStep(frames.length - 1)}><SkipForward size={16} /></button></div><div className="speed-control"><Timer size={15} /><span>Speed</span>{[0.5, 1, 2].map((value) => <button key={value} onClick={() => setSpeed(value)} className={speed === value ? 'speed-active' : ''}>{value}x</button>)}</div></div>
      </section></div>
    <div className="visualizer-tip"><span className="tip-icon"><Sparkles size={16} /></span><span><strong>Pro tip</strong> Tap <kbd>Next step</kbd> to predict what happens before revealing the answer. That's how you build intuition.</span><button onClick={() => selectAlgorithm(algorithm === 'binary' ? 'sorting' : 'binary')}>Try {algorithm === 'binary' ? 'sorting' : 'binary search'} <ArrowRight size={13} /></button></div>
  </div>
}