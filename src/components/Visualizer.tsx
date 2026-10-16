import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Code2,
  Database,
  Info,
  Pause,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import type { Language } from '../data'

type DSKey = 'linkedlist' | 'stack' | 'queue' | 'binarytree'

interface StepFrame {
  step: number
  codeLine: string
  action: { en: string; hi: string }
  memory: Record<string, string>
  visualNodes: { id: string | number; val: string | number; state?: 'highlight' | 'new' | 'active' | 'default' }[]
  pointers: { name: string; target: string | number | null }[]
}

interface DSModule {
  id: DSKey
  name: { en: string; hi: string }
  complexity: string
  codeSnippet: string[]
  frames: StepFrame[]
}

const modules: Record<DSKey, DSModule> = {
  linkedlist: {
    id: 'linkedlist',
    name: { en: 'Singly Linked List Insertion', hi: 'Linked List Insertion Step-by-Step' },
    complexity: 'O(1) append / O(n) traversal',
    codeSnippet: [
      'let head = null;',
      'const node1 = new Node(5); // node1.next = null',
      'head = node1;',
      'const node2 = new Node(9); // node2.next = null',
      'head.next = node2;',
      'const node3 = new Node(14);',
      'node2.next = node3;'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let head = null;',
        action: {
          en: 'Initialize an empty list. Pointer `head` points to null.',
          hi: 'List shuru hui. Pointer `head` abhi `null` par hai.'
        },
        memory: { head: 'null' },
        visualNodes: [],
        pointers: [{ name: 'head', target: null }]
      },
      {
        step: 2,
        codeLine: 'const node1 = new Node(5);',
        action: {
          en: 'Allocate memory for Node(5). `node1.data = 5`, `node1.next = null`.',
          hi: 'Naya node bana memory me: `data = 5` aur iska `next = null`.'
        },
        memory: { 'node1.data': '5', 'node1.next': 'null', head: 'null' },
        visualNodes: [{ id: 'n1', val: 5, state: 'new' }],
        pointers: [
          { name: 'head', target: null },
          { name: 'newNode', target: 'n1' }
        ]
      },
      {
        step: 3,
        codeLine: 'head = node1;',
        action: {
          en: 'Link the head: `head` now points directly to Node(5).',
          hi: '`head` pointer ko Node(5) par point kara diya gaya.'
        },
        memory: { 'head.data': '5', 'head.next': 'null' },
        visualNodes: [{ id: 'n1', val: 5, state: 'active' }],
        pointers: [{ name: 'head', target: 'n1' }]
      },
      {
        step: 4,
        codeLine: 'const node2 = new Node(9);',
        action: {
          en: 'Create Node(9). `node2.data = 9`, `node2.next = null`.',
          hi: 'Dusra node memory me initialize hua: `data = 9`, `next = null`.'
        },
        memory: { 'head.data': '5', 'node2.data': '9', 'node2.next': 'null' },
        visualNodes: [
          { id: 'n1', val: 5, state: 'default' },
          { id: 'n2', val: 9, state: 'new' }
        ],
        pointers: [
          { name: 'head', target: 'n1' },
          { name: 'node2', target: 'n2' }
        ]
      },
      {
        step: 5,
        codeLine: 'head.next = node2;',
        action: {
          en: 'Connect pointers: Node(5).next = Node(9). Traversal link established.',
          hi: 'Pointers connect hue: Node(5) ka next pointer Node(9) ko point karne laga.'
        },
        memory: { 'head.data': '5', 'head.next': '0xNode2 (9)', 'node2.next': 'null' },
        visualNodes: [
          { id: 'n1', val: 5, state: 'active' },
          { id: 'n2', val: 9, state: 'highlight' }
        ],
        pointers: [{ name: 'head', target: 'n1' }]
      },
      {
        step: 6,
        codeLine: 'const node3 = new Node(14);',
        action: {
          en: 'Allocate Node(14). Ready for tail attachment.',
          hi: 'Teesra node bana memory me `data = 14`.'
        },
        memory: { 'head.next.data': '9', 'node3.data': '14', 'node3.next': 'null' },
        visualNodes: [
          { id: 'n1', val: 5, state: 'default' },
          { id: 'n2', val: 9, state: 'default' },
          { id: 'n3', val: 14, state: 'new' }
        ],
        pointers: [
          { name: 'head', target: 'n1' },
          { name: 'newNode', target: 'n3' }
        ]
      },
      {
        step: 7,
        codeLine: 'node2.next = node3;',
        action: {
          en: 'Final link: Node(9).next = Node(14). List is: 5 -> 9 -> 14 -> null.',
          hi: 'Complete linked chain tayyar: 5 -> 9 -> 14 -> null.'
        },
        memory: { 'head.data': '5', 'node2.next': 'Node(14)', 'node3.next': 'null' },
        visualNodes: [
          { id: 'n1', val: 5, state: 'active' },
          { id: 'n2', val: 9, state: 'active' },
          { id: 'n3', val: 14, state: 'active' }
        ],
        pointers: [{ name: 'head', target: 'n1' }]
      }
    ]
  },
  stack: {
    id: 'stack',
    name: { en: 'Stack LIFO Execution (Push & Pop)', hi: 'Stack LIFO Execution (Push & Pop)' },
    complexity: 'O(1) push / O(1) pop',
    codeSnippet: [
      'let stack = []; let top = -1;',
      'stack.push(10); top++; // top = 0',
      'stack.push(20); top++; // top = 1',
      'stack.push(30); top++; // top = 2',
      'const popped = stack.pop(); top--;',
      '// popped value is 30, top is now 1 (value 20)'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let stack = []; let top = -1;',
        action: {
          en: 'Stack initialized empty. Pointer `top = -1`.',
          hi: 'Khali stack tayyar. Pointer `top = -1` (underflow state).'
        },
        memory: { top: '-1', 'stack.length': '0' },
        visualNodes: [],
        pointers: [{ name: 'top', target: null }]
      },
      {
        step: 2,
        codeLine: 'stack.push(10); top++;',
        action: {
          en: 'Push 10. `top` increments to index 0.',
          hi: '10 ko push kiya gaya. `top` pointer index 0 par shift hua.'
        },
        memory: { top: '0 (val: 10)', 'stack[0]': '10' },
        visualNodes: [{ id: 's1', val: 10, state: 'new' }],
        pointers: [{ name: 'top', target: 's1' }]
      },
      {
        step: 3,
        codeLine: 'stack.push(20); top++;',
        action: {
          en: 'Push 20. 20 stacks on top of 10. `top = 1`.',
          hi: '20 ko stack ke upar rakha gaya. `top = 1`.'
        },
        memory: { top: '1 (val: 20)', 'stack[1]': '20' },
        visualNodes: [
          { id: 's1', val: 10, state: 'default' },
          { id: 's2', val: 20, state: 'new' }
        ],
        pointers: [{ name: 'top', target: 's2' }]
      },
      {
        step: 4,
        codeLine: 'stack.push(30); top++;',
        action: {
          en: 'Push 30. `top = 2`. Most recent element sits on top.',
          hi: '30 push hua. Sabse latest element stack ke top par hai.'
        },
        memory: { top: '2 (val: 30)', 'stack[2]': '30' },
        visualNodes: [
          { id: 's1', val: 10, state: 'default' },
          { id: 's2', val: 20, state: 'default' },
          { id: 's3', val: 30, state: 'active' }
        ],
        pointers: [{ name: 'top', target: 's3' }]
      },
      {
        step: 5,
        codeLine: 'const popped = stack.pop(); top--;',
        action: {
          en: 'LIFO rule: Pop removes index 2 (value 30). `top` moves back down to 20.',
          hi: 'LIFO Rule: Top se 30 remove ho gaya. `top` wapas niche 20 par point kar raha hai.'
        },
        memory: { popped: '30', top: '1 (val: 20)' },
        visualNodes: [
          { id: 's1', val: 10, state: 'default' },
          { id: 's2', val: 20, state: 'active' }
        ],
        pointers: [{ name: 'top', target: 's2' }]
      }
    ]
  },
  queue: {
    id: 'queue',
    name: { en: 'Queue FIFO Pipeline (Enqueue & Dequeue)', hi: 'Queue FIFO Pipeline (Enqueue & Dequeue)' },
    complexity: 'O(1) enqueue / O(1) dequeue',
    codeSnippet: [
      'let queue = []; let front = 0; let rear = -1;',
      'enqueue(4); rear++; // front=0, rear=0',
      'enqueue(8); rear++; // rear=1',
      'enqueue(12); rear++; // rear=2',
      'const item = dequeue(); front++; // removes 4'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let queue = []; let front = 0; let rear = -1;',
        action: {
          en: 'Queue initialized empty. Front and rear tracking awaiting first item.',
          hi: 'Queue shuru hui. Front = 0, Rear = -1.'
        },
        memory: { front: '0', rear: '-1' },
        visualNodes: [],
        pointers: []
      },
      {
        step: 2,
        codeLine: 'enqueue(4); rear++;',
        action: {
          en: 'Enqueue 4: Entered at rear. Both front & rear point to index 0.',
          hi: '4 queue me enter hua. Front aur rear dono isi par point kar rahe hain.'
        },
        memory: { front: '0 (val: 4)', rear: '0 (val: 4)' },
        visualNodes: [{ id: 'q1', val: 4, state: 'new' }],
        pointers: [
          { name: 'front', target: 'q1' },
          { name: 'rear', target: 'q1' }
        ]
      },
      {
        step: 3,
        codeLine: 'enqueue(8); rear++;',
        action: {
          en: 'Enqueue 8: Appended behind 4. Rear advances to index 1.',
          hi: '8 piche enter hua. Rear pointer aage badh kar 8 par chala gaya.'
        },
        memory: { front: '0 (val: 4)', rear: '1 (val: 8)' },
        visualNodes: [
          { id: 'q1', val: 4, state: 'default' },
          { id: 'q2', val: 8, state: 'new' }
        ],
        pointers: [
          { name: 'front', target: 'q1' },
          { name: 'rear', target: 'q2' }
        ]
      },
      {
        step: 4,
        codeLine: 'enqueue(12); rear++;',
        action: {
          en: 'Enqueue 12: Pipeline holds [4, 8, 12]. Rear is at index 2.',
          hi: '12 queue me append hua. Rear index 2 par shift hua.'
        },
        memory: { front: '0 (val: 4)', rear: '2 (val: 12)' },
        visualNodes: [
          { id: 'q1', val: 4, state: 'default' },
          { id: 'q2', val: 8, state: 'default' },
          { id: 'q3', val: 12, state: 'new' }
        ],
        pointers: [
          { name: 'front', target: 'q1' },
          { name: 'rear', target: 'q3' }
        ]
      },
      {
        step: 5,
        codeLine: 'const item = dequeue(); front++;',
        action: {
          en: 'FIFO rule: First in (4) is first out. Front shifts forward to 8.',
          hi: 'FIFO Rule: Jo pehle aaya (4), wo sabse pehle nikal gaya. Front ab 8 par hai.'
        },
        memory: { dequeued: '4', front: '1 (val: 8)', rear: '2 (val: 12)' },
        visualNodes: [
          { id: 'q2', val: 8, state: 'active' },
          { id: 'q3', val: 12, state: 'default' }
        ],
        pointers: [
          { name: 'front', target: 'q2' },
          { name: 'rear', target: 'q3' }
        ]
      }
    ]
  },
  binarytree: {
    id: 'binarytree',
    name: { en: 'Binary Search Tree Insertion', hi: 'Binary Search Tree Insertion' },
    complexity: 'O(log n) average / O(h) height',
    codeSnippet: [
      'const root = new TreeNode(10);',
      '// Insert 5: (5 < 10) -> goes left',
      'root.left = new TreeNode(5);',
      '// Insert 15: (15 > 10) -> goes right',
      'root.right = new TreeNode(15);'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'const root = new TreeNode(10);',
        action: {
          en: 'Create Root node with value 10. `root.left = null`, `root.right = null`.',
          hi: 'Root node 10 initialize hua. Left aur right pointers abhi null hain.'
        },
        memory: { 'root.val': '10', 'root.left': 'null', 'root.right': 'null' },
        visualNodes: [{ id: 't1', val: 10, state: 'active' }],
        pointers: [{ name: 'root', target: 't1' }]
      },
      {
        step: 2,
        codeLine: 'root.left = new TreeNode(5);',
        action: {
          en: 'BST condition: 5 < 10, so Node(5) is attached as left child of Root.',
          hi: '5 chhota hai 10 se, isliye Node(5) root ke left child par attach hua.'
        },
        memory: { 'root.val': '10', 'root.left': 'Node(5)', 'root.right': 'null' },
        visualNodes: [
          { id: 't1', val: 10, state: 'default' },
          { id: 't2', val: 5, state: 'new' }
        ],
        pointers: [
          { name: 'root', target: 't1' },
          { name: 'left', target: 't2' }
        ]
      },
      {
        step: 3,
        codeLine: 'root.right = new TreeNode(15);',
        action: {
          en: 'BST condition: 15 > 10, so Node(15) is attached as right child of Root.',
          hi: '15 bada hai 10 se, isliye Node(15) right child par attach ho gaya.'
        },
        memory: { 'root.left': 'Node(5)', 'root.right': 'Node(15)' },
        visualNodes: [
          { id: 't1', val: 10, state: 'default' },
          { id: 't2', val: 5, state: 'default' },
          { id: 't3', val: 15, state: 'new' }
        ],
        pointers: [
          { name: 'root', target: 't1' },
          { name: 'right', target: 't3' }
        ]
      }
    ]
  }
}

export function Visualizer({
  language,
  onEarnXp
}: {
  language: Language
  onEarnXp: () => void
}) {
  const isHi = language === 'HI'
  const [selectedDS, setSelectedDS] = useState<DSKey>('linkedlist')
  const [frameIdx, setFrameIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])

  const currentMod = modules[selectedDS]
  const currentFrame = currentMod.frames[frameIdx]

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isPlaying) {
      timer = setInterval(() => {
        setFrameIdx((prev) => {
          if (prev + 1 < currentMod.frames.length) {
            return prev + 1
          } else {
            setIsPlaying(false)
            if (!completed.includes(selectedDS)) {
              setCompleted((c) => [...c, selectedDS])
              onEarnXp()
            }
            return prev
          }
        })
      }, 1600)
    }
    return () => clearInterval(timer)
  }, [isPlaying, currentMod, selectedDS, completed, onEarnXp])

  const selectModule = (key: DSKey) => {
    setSelectedDS(key)
    setFrameIdx(0)
    setIsPlaying(false)
  }

  const nextFrame = () => {
    if (frameIdx + 1 < currentMod.frames.length) {
      setFrameIdx(frameIdx + 1)
    }
  }

  const prevFrame = () => {
    if (frameIdx > 0) {
      setFrameIdx(frameIdx - 1)
    }
  }

  return (
    <div className="page-enter visualizer-page-container">
      <div className="page-heading-row" style={{ marginBottom: '16px' }}>
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> MEMORY & POINTER TRACER
          </div>
          <h1>{isHi ? 'Visual Lab: Pointer Execution Engine' : 'Visual Lab: Memory & Pointer Tracer'}</h1>
          <p>
            {isHi
              ? 'Slow down the logic. Watch heap allocations, pointers (head, next, null), and stack frames change line by line.'
              : 'Inspect pointers, memory addresses, and heap allocations step-by-step with code line synchronization.'}
          </p>
        </div>
        <div className="visualizer-xp">
          <Sparkles size={15} color="#eed889" />
          <span><b>+15 XP</b> per module</span>
        </div>
      </div>

      <div className="visualizer-engine-grid">
        <div className="ds-selector-panel">
          <span className="ds-panel-label">DATA STRUCTURE RUNTIMES</span>
          {(Object.keys(modules) as DSKey[]).map((key) => {
            const mod = modules[key]
            const isSelected = selectedDS === key
            return (
              <button
                key={key}
                onClick={() => selectModule(key)}
                className={`ds-select-btn ${isSelected ? 'active' : ''}`}
              >
                <Database size={14} />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <strong>{isHi ? mod.name.hi : mod.name.en}</strong>
                  <small>{mod.complexity}</small>
                </div>
                <ChevronRight size={13} opacity={isSelected ? 1 : 0.4} />
              </button>
            )
          })}
        </div>

        <div className="memory-studio">
          <div className="studio-topbar">
            <div className="studio-title-badge">
              <span className="live-pulse" />
              <span>{isHi ? currentMod.name.hi : currentMod.name.en}</span>
            </div>

            <div className="studio-controls">
              <span className="step-tag">
                Step <b>{currentFrame.step}</b> of <b>{currentMod.frames.length}</b>
              </span>
              <button className="ctrl-btn" onClick={() => setFrameIdx(0)} title="Reset">
                <RotateCcw size={13} />
              </button>
              <button className="ctrl-btn" onClick={prevFrame} disabled={frameIdx === 0}>
                ◀
              </button>
              <button
                className={`ctrl-btn play ${isPlaying ? 'playing' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
              </button>
              <button
                className="ctrl-btn"
                onClick={nextFrame}
                disabled={frameIdx + 1 >= currentMod.frames.length}
              >
                ▶
              </button>
            </div>
          </div>

          <div className="visual-memory-canvas">
            {selectedDS === 'linkedlist' && (
              <div className="ll-container">
                {currentFrame.visualNodes.length === 0 ? (
                  <div className="null-state">
                    <span className="pointer-tag">head</span>
                    <ArrowRight size={16} />
                    <span className="null-box">NULL</span>
                  </div>
                ) : (
                  <div className="ll-nodes-row">
                    <div className="head-label-pointer">
                      <span className="pointer-tag">head</span>
                      <ArrowRight size={14} />
                    </div>

                    {currentFrame.visualNodes.map((n, i) => (
                      <div key={n.id} className="ll-node-wrapper">
                        <div className={`ll-node ${n.state || 'default'}`}>
                          <div className="node-val">{n.val}</div>
                          <div className="node-next-slot">
                            <span>next</span>
                          </div>
                        </div>

                        {i + 1 < currentFrame.visualNodes.length ? (
                          <div className="ll-arrow">
                            <span className="arrow-line" />
                            <ArrowRight size={16} color="#92e2b0" />
                          </div>
                        ) : (
                          <div className="ll-arrow null">
                            <span className="arrow-line" />
                            <span className="null-box">NULL</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedDS === 'stack' && (
              <div className="stack-container">
                <div className="stack-cylinder">
                  {currentFrame.visualNodes.length === 0 ? (
                    <span className="empty-indicator">Stack Empty (top = -1)</span>
                  ) : (
                    currentFrame.visualNodes
                      .slice()
                      .reverse()
                      .map((n, i) => (
                        <div key={n.id} className={`stack-plate ${n.state || 'default'}`}>
                          <span>{n.val}</span>
                          {i === 0 && <span className="top-indicator">← TOP</span>}
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {selectedDS === 'queue' && (
              <div className="queue-container">
                <div className="queue-pipeline">
                  {currentFrame.visualNodes.length === 0 ? (
                    <span className="empty-indicator">Queue Empty</span>
                  ) : (
                    currentFrame.visualNodes.map((n, i) => (
                      <div key={n.id} className={`queue-box ${n.state || 'default'}`}>
                        {i === 0 && <span className="front-indicator">FRONT</span>}
                        {i === currentFrame.visualNodes.length - 1 && (
                          <span className="rear-indicator">REAR</span>
                        )}
                        <span>{n.val}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {selectedDS === 'binarytree' && (
              <div className="tree-container">
                {currentFrame.visualNodes.length > 0 && (
                  <div className="tree-node-cluster">
                    <div className="tree-root-circle">
                      <span className="root-indicator">root</span>
                      <span>10</span>
                    </div>

                    <div className="tree-children-row">
                      {currentFrame.visualNodes.find((n) => n.val === 5) ? (
                        <div className="tree-child left">
                          <div className="branch-line left" />
                          <div className="tree-node-circle">5</div>
                          <span className="child-label">left (&lt; 10)</span>
                        </div>
                      ) : (
                        <div className="tree-child null">left: null</div>
                      )}

                      {currentFrame.visualNodes.find((n) => n.val === 15) ? (
                        <div className="tree-child right">
                          <div className="branch-line right" />
                          <div className="tree-node-circle">15</div>
                          <span className="child-label">right (&gt; 10)</span>
                        </div>
                      ) : (
                        <div className="tree-child null">right: null</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="studio-bottom-grid">
            <div className="code-sync-box">
              <div className="box-header">
                <Code2 size={13} color="#92e2b0" />
                <span>ACTIVE LINE OF EXECUTION</span>
              </div>
              <div className="code-lines-scroll">
                {currentMod.codeSnippet.map((line, i) => {
                  const isActive = line.includes(currentFrame.codeLine) || currentFrame.codeLine.includes(line)
                  return (
                    <div key={i} className={`code-sync-line ${isActive ? 'active-line' : ''}`}>
                      <span className="ln">{i + 1}</span>
                      <pre>{line}</pre>
                      {isActive && <span className="cursor-dot" />}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="memory-register-box">
              <div className="box-header">
                <Database size={13} color="#eed889" />
                <span>POINTER & HEAP REGISTER</span>
              </div>
              <div className="register-table">
                {Object.entries(currentFrame.memory).map(([key, val]) => (
                  <div key={key} className="register-row">
                    <span className="reg-key">{key}</span>
                    <span className="reg-arrow">=&gt;</span>
                    <span className="reg-val">{val}</span>
                  </div>
                ))}
              </div>
              <div className="register-action-desc">
                <Info size={13} color="#92e2b0" />
                <p>{isHi ? currentFrame.action.hi : currentFrame.action.en}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}