import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Code2,
  Database,
  Info,
  Network,
  Pause,
  Play,
  RotateCcw,
  Sliders,
  Sparkles
} from 'lucide-react'
import type { Language } from '../data'

export type DSKey =
  | 'linkedlist'
  | 'stack'
  | 'queue'
  | 'binarytree'
  | 'slidingwindow'
  | 'fastslow'
  | 'prefixsums'
  | 'binarysearch'
  | 'mergesort'
  | 'quicksort'
  | 'heapsort'
  | 'dijkstra'
  | 'bellmanford'
  | 'prims'
  | 'kruskal'
  | 'toposort'

interface StepFrame {
  step: number
  codeLine: string
  action: { en: string; hi: string }
  memory: Record<string, string>
  visualNodes: {
    id: string | number
    val: string | number
    state?: 'highlight' | 'new' | 'active' | 'default' | 'found' | 'done'
    subtext?: string
  }[]
  pointers: { name: string; target: string | number | null }[]
  extraData?: {
    window?: [number, number]
    left?: number
    mid?: number
    right?: number
    edges?: { from: string; to: string; weight?: number; active?: boolean }[]
  }
}

interface DSModule {
  id: DSKey
  category: 'CORE STRUCTURES' | 'TWO-POINTER & ARRAY' | 'SORTING' | 'GRAPH ALGORITHMS'
  name: { en: string; hi: string }
  complexity: string
  codeSnippet: string[]
  frames: StepFrame[]
}

const modules: Record<DSKey, DSModule> = {
  linkedlist: {
    id: 'linkedlist',
    category: 'CORE STRUCTURES',
    name: { en: 'Singly Linked List Insertion', hi: 'Linked List Insertion Step-by-Step' },
    complexity: 'O(1) append / O(n) traversal',
    codeSnippet: [
      'let head = null;',
      'const node1 = new Node(5);',
      'head = node1;',
      'const node2 = new Node(9);',
      'head.next = node2;',
      'const node3 = new Node(14);',
      'node2.next = node3;'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let head = null;',
        action: { en: 'Initialize empty list. Pointer `head` points to null.', hi: 'Khali list shuru hui. Head null par hai.' },
        memory: { head: 'null' },
        visualNodes: [],
        pointers: [{ name: 'head', target: null }]
      },
      {
        step: 2,
        codeLine: 'const node1 = new Node(5);',
        action: { en: 'Allocate Node(5). node1.data = 5, next = null.', hi: 'Node(5) memory me allocate hua.' },
        memory: { 'node1.val': '5', 'node1.next': 'null' },
        visualNodes: [{ id: 'n1', val: 5, state: 'new' }],
        pointers: [{ name: 'head', target: null }, { name: 'node1', target: 'n1' }]
      },
      {
        step: 3,
        codeLine: 'head = node1;',
        action: { en: 'Assign head pointer to Node(5).', hi: 'Head ko Node(5) par point karaya.' },
        memory: { 'head.val': '5', 'head.next': 'null' },
        visualNodes: [{ id: 'n1', val: 5, state: 'active' }],
        pointers: [{ name: 'head', target: 'n1' }]
      },
      {
        step: 4,
        codeLine: 'const node2 = new Node(9);',
        action: { en: 'Allocate Node(9) in memory.', hi: 'Node(9) memory me allocate hua.' },
        memory: { 'head.val': '5', 'node2.val': '9', 'node2.next': 'null' },
        visualNodes: [{ id: 'n1', val: 5, state: 'default' }, { id: 'n2', val: 9, state: 'new' }],
        pointers: [{ name: 'head', target: 'n1' }, { name: 'node2', target: 'n2' }]
      },
      {
        step: 5,
        codeLine: 'head.next = node2;',
        action: { en: 'Link Node(5).next to Node(9). Chain linked.', hi: 'Node(5) ka next pointer Node(9) se link hua.' },
        memory: { 'head.val': '5', 'head.next': '0xNode2 (9)' },
        visualNodes: [{ id: 'n1', val: 5, state: 'active' }, { id: 'n2', val: 9, state: 'highlight' }],
        pointers: [{ name: 'head', target: 'n1' }]
      },
      {
        step: 6,
        codeLine: 'const node3 = new Node(14);',
        action: { en: 'Allocate Node(14) for tail attachment.', hi: 'Teesra node Node(14) initialize hua.' },
        memory: { 'node3.val': '14', 'node3.next': 'null' },
        visualNodes: [{ id: 'n1', val: 5, state: 'default' }, { id: 'n2', val: 9, state: 'default' }, { id: 'n3', val: 14, state: 'new' }],
        pointers: [{ name: 'head', target: 'n1' }, { name: 'node3', target: 'n3' }]
      },
      {
        step: 7,
        codeLine: 'node2.next = node3;',
        action: { en: 'Complete linked list: 5 -> 9 -> 14 -> null.', hi: 'Complete chain ban gayi: 5 -> 9 -> 14 -> null.' },
        memory: { 'head.val': '5', 'head.next.val': '9', 'tail.val': '14' },
        visualNodes: [{ id: 'n1', val: 5, state: 'active' }, { id: 'n2', val: 9, state: 'active' }, { id: 'n3', val: 14, state: 'active' }],
        pointers: [{ name: 'head', target: 'n1' }]
      }
    ]
  },

  stack: {
    id: 'stack',
    category: 'CORE STRUCTURES',
    name: { en: 'Stack LIFO Execution (Push & Pop)', hi: 'Stack LIFO Execution (Push & Pop)' },
    complexity: 'O(1) push / O(1) pop',
    codeSnippet: [
      'let stack = []; let top = -1;',
      'stack.push(10); top++;',
      'stack.push(20); top++;',
      'stack.push(30); top++;',
      'const popped = stack.pop(); top--;'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let stack = []; let top = -1;',
        action: { en: 'Stack empty. Pointer `top = -1`.', hi: 'Stack empty hai. Top = -1.' },
        memory: { top: '-1', 'stack.length': '0' },
        visualNodes: [],
        pointers: [{ name: 'top', target: null }]
      },
      {
        step: 2,
        codeLine: 'stack.push(10); top++;',
        action: { en: 'Push 10. `top` moves to index 0.', hi: '10 push hua. Top ab index 0 par hai.' },
        memory: { top: '0 (10)', 'stack[0]': '10' },
        visualNodes: [{ id: 's1', val: 10, state: 'new' }],
        pointers: [{ name: 'top', target: 's1' }]
      },
      {
        step: 3,
        codeLine: 'stack.push(20); top++;',
        action: { en: 'Push 20. Placed above 10. `top = 1`.', hi: '20 push hua. Top ab 20 par point karta hai.' },
        memory: { top: '1 (20)', 'stack[1]': '20' },
        visualNodes: [{ id: 's1', val: 10, state: 'default' }, { id: 's2', val: 20, state: 'new' }],
        pointers: [{ name: 'top', target: 's2' }]
      },
      {
        step: 4,
        codeLine: 'stack.push(30); top++;',
        action: { en: 'Push 30. Top of stack is now 30.', hi: '30 push hua. Topmost element ab 30 hai.' },
        memory: { top: '2 (30)', 'stack[2]': '30' },
        visualNodes: [{ id: 's1', val: 10, state: 'default' }, { id: 's2', val: 20, state: 'default' }, { id: 's3', val: 30, state: 'active' }],
        pointers: [{ name: 'top', target: 's3' }]
      },
      {
        step: 5,
        codeLine: 'const popped = stack.pop(); top--;',
        action: { en: 'LIFO Rule: Pop removes 30. `top` drops back down to 20.', hi: 'LIFO: 30 remove hua. Top wapas 20 par aa gaya.' },
        memory: { popped: '30', top: '1 (20)' },
        visualNodes: [{ id: 's1', val: 10, state: 'default' }, { id: 's2', val: 20, state: 'active' }],
        pointers: [{ name: 'top', target: 's2' }]
      }
    ]
  },

  queue: {
    id: 'queue',
    category: 'CORE STRUCTURES',
    name: { en: 'Queue FIFO Pipeline (Enqueue & Dequeue)', hi: 'Queue FIFO Pipeline (Enqueue & Dequeue)' },
    complexity: 'O(1) enqueue / O(1) dequeue',
    codeSnippet: [
      'let queue = []; let front = 0, rear = -1;',
      'enqueue(4); rear++;',
      'enqueue(8); rear++;',
      'enqueue(12); rear++;',
      'const item = dequeue(); front++;'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let queue = []; let front = 0, rear = -1;',
        action: { en: 'Queue initialized. Empty pipeline.', hi: 'Queue empty hai. Front = 0, rear = -1.' },
        memory: { front: '0', rear: '-1' },
        visualNodes: [],
        pointers: []
      },
      {
        step: 2,
        codeLine: 'enqueue(4); rear++;',
        action: { en: 'Enqueue 4 at rear. Front and rear point to 4.', hi: '4 enqueue hua. Front aur rear dono 4 par hain.' },
        memory: { front: '0 (4)', rear: '0 (4)' },
        visualNodes: [{ id: 'q1', val: 4, state: 'new' }],
        pointers: [{ name: 'front', target: 'q1' }, { name: 'rear', target: 'q1' }]
      },
      {
        step: 3,
        codeLine: 'enqueue(8); rear++;',
        action: { en: 'Enqueue 8 behind 4. Rear advances to 1.', hi: '8 piche add hua. Rear pointer 8 par chala gaya.' },
        memory: { front: '0 (4)', rear: '1 (8)' },
        visualNodes: [{ id: 'q1', val: 4, state: 'default' }, { id: 'q2', val: 8, state: 'new' }],
        pointers: [{ name: 'front', target: 'q1' }, { name: 'rear', target: 'q2' }]
      },
      {
        step: 4,
        codeLine: 'enqueue(12); rear++;',
        action: { en: 'Enqueue 12 behind 8. Pipeline is [4, 8, 12].', hi: '12 add hua. Pipeline ab [4, 8, 12] hai.' },
        memory: { front: '0 (4)', rear: '2 (12)' },
        visualNodes: [{ id: 'q1', val: 4, state: 'default' }, { id: 'q2', val: 8, state: 'default' }, { id: 'q3', val: 12, state: 'new' }],
        pointers: [{ name: 'front', target: 'q1' }, { name: 'rear', target: 'q3' }]
      },
      {
        step: 5,
        codeLine: 'const item = dequeue(); front++;',
        action: { en: 'FIFO Rule: First element (4) is removed first. Front advances to 8.', hi: 'FIFO: Pehle aane wala (4) nikal gaya. Front ab 8 par hai.' },
        memory: { dequeued: '4', front: '1 (8)', rear: '2 (12)' },
        visualNodes: [{ id: 'q2', val: 8, state: 'active' }, { id: 'q3', val: 12, state: 'default' }],
        pointers: [{ name: 'front', target: 'q2' }, { name: 'rear', target: 'q3' }]
      }
    ]
  },

  binarytree: {
    id: 'binarytree',
    category: 'CORE STRUCTURES',
    name: { en: 'Binary Search Tree Insertion', hi: 'Binary Search Tree Insertion' },
    complexity: 'O(log n) avg / O(h) height',
    codeSnippet: [
      'const root = new TreeNode(10);',
      'root.left = new TreeNode(5); // 5 < 10 -> left',
      'root.right = new TreeNode(15); // 15 > 10 -> right'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'const root = new TreeNode(10);',
        action: { en: 'Allocate Root node with value 10.', hi: 'Root node 10 initialize hua.' },
        memory: { 'root.val': '10', 'root.left': 'null', 'root.right': 'null' },
        visualNodes: [{ id: 't1', val: 10, state: 'active' }],
        pointers: [{ name: 'root', target: 't1' }]
      },
      {
        step: 2,
        codeLine: 'root.left = new TreeNode(5);',
        action: { en: '5 < 10: Node(5) attaches as left child.', hi: '5 chhota hai 10 se, isliye left me attach hua.' },
        memory: { 'root.left': 'Node(5)', 'root.right': 'null' },
        visualNodes: [{ id: 't1', val: 10, state: 'default' }, { id: 't2', val: 5, state: 'new' }],
        pointers: [{ name: 'root', target: 't1' }]
      },
      {
        step: 3,
        codeLine: 'root.right = new TreeNode(15);',
        action: { en: '15 > 10: Node(15) attaches as right child.', hi: '15 bada hai 10 se, isliye right me attach hua.' },
        memory: { 'root.left': 'Node(5)', 'root.right': 'Node(15)' },
        visualNodes: [{ id: 't1', val: 10, state: 'default' }, { id: 't2', val: 5, state: 'default' }, { id: 't3', val: 15, state: 'new' }],
        pointers: [{ name: 'root', target: 't1' }]
      }
    ]
  },

  slidingwindow: {
    id: 'slidingwindow',
    category: 'TWO-POINTER & ARRAY',
    name: { en: 'Sliding Window (Max Sum of Size K=3)', hi: 'Sliding Window (Max Sum K=3)' },
    complexity: 'O(n) time / O(1) space',
    codeSnippet: [
      'let windowSum = arr[0] + arr[1] + arr[2];',
      'let maxSum = windowSum;',
      'for (let i = 3; i < arr.length; i++) {',
      '  windowSum += arr[i] - arr[i - 3];',
      '  maxSum = Math.max(maxSum, windowSum);',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let windowSum = arr[0] + arr[1] + arr[2];',
        action: { en: 'Compute initial window [2, 1, 5]. windowSum = 8.', hi: 'Initial window banayi [2, 1, 5]. Sum = 8.' },
        memory: { windowSum: '8', maxSum: '8', window: '[0..2]' },
        visualNodes: [
          { id: 0, val: 2, state: 'active' },
          { id: 1, val: 1, state: 'active' },
          { id: 2, val: 5, state: 'active' },
          { id: 3, val: 1, state: 'default' },
          { id: 4, val: 3, state: 'default' },
          { id: 5, val: 2, state: 'default' }
        ],
        pointers: [{ name: 'L', target: 0 }, { name: 'R', target: 2 }],
        extraData: { window: [0, 2] }
      },
      {
        step: 2,
        codeLine: 'windowSum += arr[i] - arr[i - 3];',
        action: { en: 'Slide window right: Drop arr[0] (2), add arr[3] (1). windowSum = 8 - 2 + 1 = 7.', hi: 'Window aage badhi: 2 nikla, 1 add hua. Naya sum = 7.' },
        memory: { windowSum: '7', maxSum: '8', dropped: '2', added: '1' },
        visualNodes: [
          { id: 0, val: 2, state: 'default' },
          { id: 1, val: 1, state: 'active' },
          { id: 2, val: 5, state: 'active' },
          { id: 3, val: 1, state: 'active' },
          { id: 4, val: 3, state: 'default' },
          { id: 5, val: 2, state: 'default' }
        ],
        pointers: [{ name: 'L', target: 1 }, { name: 'R', target: 3 }],
        extraData: { window: [1, 3] }
      },
      {
        step: 3,
        codeLine: 'windowSum += arr[i] - arr[i - 3];',
        action: { en: 'Slide window right: Drop arr[1] (1), add arr[4] (3). windowSum = 7 - 1 + 3 = 9.', hi: 'Window aage badhi: 1 nikla, 3 add hua. Naya sum = 9.' },
        memory: { windowSum: '9', maxSum: '9 (New Peak!)' },
        visualNodes: [
          { id: 0, val: 2, state: 'default' },
          { id: 1, val: 1, state: 'default' },
          { id: 2, val: 5, state: 'active' },
          { id: 3, val: 1, state: 'active' },
          { id: 4, val: 3, state: 'active' },
          { id: 5, val: 2, state: 'default' }
        ],
        pointers: [{ name: 'L', target: 2 }, { name: 'R', target: 4 }],
        extraData: { window: [2, 4] }
      },
      {
        step: 4,
        codeLine: 'maxSum = Math.max(maxSum, windowSum);',
        action: { en: 'Slide right to tail: Drop arr[2] (5), add arr[5] (2). windowSum = 6. Max stays 9.', hi: 'Aakhri slide: sum = 6 bana. Maximum 9 hi raha.' },
        memory: { windowSum: '6', maxSum: '9', finalAnswer: '9' },
        visualNodes: [
          { id: 0, val: 2, state: 'default' },
          { id: 1, val: 1, state: 'default' },
          { id: 2, val: 5, state: 'default' },
          { id: 3, val: 1, state: 'active' },
          { id: 4, val: 3, state: 'active' },
          { id: 5, val: 2, state: 'active' }
        ],
        pointers: [{ name: 'L', target: 3 }, { name: 'R', target: 5 }],
        extraData: { window: [3, 5] }
      }
    ]
  },

  fastslow: {
    id: 'fastslow',
    category: 'TWO-POINTER & ARRAY',
    name: { en: 'Fast & Slow Pointers (Floyd Cycle Detect)', hi: 'Fast & Slow Pointers (Floyd Cycle)' },
    complexity: 'O(n) time / O(1) space',
    codeSnippet: [
      'let slow = head, fast = head;',
      'while (fast && fast.next) {',
      '  slow = slow.next;',
      '  fast = fast.next.next;',
      '  if (slow === fast) return true; // Cycle detected',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let slow = head, fast = head;',
        action: { en: 'Both slow (1x) and fast (2x) start at Node 1.', hi: 'Slow aur fast dono pehle node par shuru hue.' },
        memory: { slow: 'Node(1)', fast: 'Node(1)' },
        visualNodes: [
          { id: 1, val: 1, state: 'active' },
          { id: 2, val: 2, state: 'default' },
          { id: 3, val: 3, state: 'default' },
          { id: 4, val: 4, state: 'default' },
          { id: 5, val: 5, state: 'default' }
        ],
        pointers: [{ name: 'Slow & Fast', target: 1 }]
      },
      {
        step: 2,
        codeLine: 'slow = slow.next; fast = fast.next.next;',
        action: { en: 'Step 1: slow advances 1 step to Node 2. fast advances 2 steps to Node 3.', hi: 'Slow Node 2 par gaya, Fast 2 steps aage Node 3 par.' },
        memory: { slow: 'Node(2)', fast: 'Node(3)' },
        visualNodes: [
          { id: 1, val: 1, state: 'default' },
          { id: 2, val: 2, state: 'active' },
          { id: 3, val: 3, state: 'highlight' },
          { id: 4, val: 4, state: 'default' },
          { id: 5, val: 5, state: 'default' }
        ],
        pointers: [{ name: 'Slow', target: 2 }, { name: 'Fast', target: 3 }]
      },
      {
        step: 3,
        codeLine: 'slow = slow.next; fast = fast.next.next;',
        action: { en: 'Step 2: slow moves to Node 3. fast moves to Node 5.', hi: 'Slow Node 3 par aaya, Fast Node 5 par pahuncha.' },
        memory: { slow: 'Node(3)', fast: 'Node(5)' },
        visualNodes: [
          { id: 1, val: 1, state: 'default' },
          { id: 2, val: 2, state: 'default' },
          { id: 3, val: 3, state: 'active' },
          { id: 4, val: 4, state: 'default' },
          { id: 5, val: 5, state: 'highlight' }
        ],
        pointers: [{ name: 'Slow', target: 3 }, { name: 'Fast', target: 5 }]
      },
      {
        step: 4,
        codeLine: 'if (slow === fast) return true;',
        action: { en: 'Cycle loopback: Fast wraps around from 5 back to 3! slow === fast. Cycle proven!', hi: 'Cycle detect ho gaya! Fast loop se wapas Node 3 par slow se takra gaya.' },
        memory: { status: 'COLLISION DETECTED', meetingNode: 'Node(3)' },
        visualNodes: [
          { id: 1, val: 1, state: 'default' },
          { id: 2, val: 2, state: 'default' },
          { id: 3, val: '3 ⟲', state: 'found' },
          { id: 4, val: 4, state: 'default' },
          { id: 5, val: 5, state: 'default' }
        ],
        pointers: [{ name: 'MATCH', target: 3 }]
      }
    ]
  },

  prefixsums: {
    id: 'prefixsums',
    category: 'TWO-POINTER & ARRAY',
    name: { en: 'Prefix Sums (Range Queries)', hi: 'Prefix Sums (Range Sum Qs)' },
    complexity: 'O(n) preprocessing / O(1) query',
    codeSnippet: [
      'let prefix = [arr[0]];',
      'for (let i = 1; i < arr.length; i++) {',
      '  prefix[i] = prefix[i - 1] + arr[i];',
      '}',
      '// Query sum(L=1, R=3): prefix[3] - prefix[0]'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let prefix = [arr[0]];',
        action: { en: 'Initialize prefix[0] = arr[0] = 3.', hi: 'Prefix[0] ko 3 se initialize kiya.' },
        memory: { 'arr[0]': '3', 'prefix[0]': '3' },
        visualNodes: [
          { id: 0, val: 'arr:3 | P:3', state: 'active' },
          { id: 1, val: 'arr:4', state: 'default' },
          { id: 2, val: 'arr:2', state: 'default' },
          { id: 3, val: 'arr:5', state: 'default' }
        ],
        pointers: [{ name: 'i=0', target: 0 }]
      },
      {
        step: 2,
        codeLine: 'prefix[i] = prefix[i - 1] + arr[i];',
        action: { en: 'prefix[1] = prefix[0] + arr[1] = 3 + 4 = 7.', hi: 'P[1] = 3 + 4 = 7.' },
        memory: { 'prefix[1]': '7' },
        visualNodes: [
          { id: 0, val: 'P:3', state: 'default' },
          { id: 1, val: 'arr:4 | P:7', state: 'active' },
          { id: 2, val: 'arr:2', state: 'default' },
          { id: 3, val: 'arr:5', state: 'default' }
        ],
        pointers: [{ name: 'i=1', target: 1 }]
      },
      {
        step: 3,
        codeLine: 'prefix[i] = prefix[i - 1] + arr[i];',
        action: { en: 'prefix[2] = 7 + arr[2] = 7 + 2 = 9. prefix[3] = 9 + 5 = 14.', hi: 'P[2]=9, P[3]=14. Array complete.' },
        memory: { 'prefix[2]': '9', 'prefix[3]': '14' },
        visualNodes: [
          { id: 0, val: 'P:3', state: 'default' },
          { id: 1, val: 'P:7', state: 'default' },
          { id: 2, val: 'P:9', state: 'default' },
          { id: 3, val: 'P:14', state: 'active' }
        ],
        pointers: [{ name: 'done', target: 3 }]
      },
      {
        step: 4,
        codeLine: '// Query sum(L=1, R=3): prefix[3] - prefix[0]',
        action: { en: 'Instant O(1) query for range [1..3]: P[3] - P[0] = 14 - 3 = 11.', hi: 'Range sum nikala O(1) me: 14 - 3 = 11.' },
        memory: { range: '[1..3]', calculation: '14 - 3', queryResult: '11' },
        visualNodes: [
          { id: 0, val: 'P[0]:3', state: 'default' },
          { id: 1, val: 'arr:4', state: 'found' },
          { id: 2, val: 'arr:2', state: 'found' },
          { id: 3, val: 'arr:5', state: 'found' }
        ],
        pointers: [{ name: 'Range Sum = 11', target: 2 }]
      }
    ]
  },

  binarysearch: {
    id: 'binarysearch',
    category: 'TWO-POINTER & ARRAY',
    name: { en: 'Binary Search (Sorted Array Divide & Conquer)', hi: 'Binary Search (Aadha-Aadha Search)' },
    complexity: 'O(log n) time / O(1) space',
    codeSnippet: [
      'let left = 0, right = arr.length - 1;',
      'while (left <= right) {',
      '  let mid = Math.floor((left + right) / 2);',
      '  if (arr[mid] === target) return mid;',
      '  if (arr[mid] < target) left = mid + 1;',
      '  else right = mid - 1;',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let left = 0, right = arr.length - 1;',
        action: { en: 'Target = 19. Initial search range: [0..6]. left=0, right=6, mid=3 (val: 11).', hi: 'Target 19 dhoondhna hai. Mid calculate hua index 3 (value 11).' },
        memory: { target: '19', left: '0 (3)', mid: '3 (11)', right: '6 (28)' },
        visualNodes: [
          { id: 0, val: 3, state: 'default' },
          { id: 1, val: 7, state: 'default' },
          { id: 2, val: 9, state: 'default' },
          { id: 3, val: 11, state: 'active' },
          { id: 4, val: 14, state: 'default' },
          { id: 5, val: 19, state: 'default' },
          { id: 6, val: 28, state: 'default' }
        ],
        pointers: [{ name: 'L', target: 0 }, { name: 'MID', target: 3 }, { name: 'R', target: 6 }]
      },
      {
        step: 2,
        codeLine: 'if (arr[mid] < target) left = mid + 1;',
        action: { en: '11 < 19: Discard left half [0..3]. left moves to 4. new mid = (4+6)/2 = 5 (val: 19).', hi: '11 chhota hai 19 se. Left half discard. Mid bana index 5.' },
        memory: { left: '4 (14)', mid: '5 (19)', right: '6 (28)' },
        visualNodes: [
          { id: 0, val: 3, state: 'default' },
          { id: 1, val: 7, state: 'default' },
          { id: 2, val: 9, state: 'default' },
          { id: 3, val: 11, state: 'default' },
          { id: 4, val: 14, state: 'default' },
          { id: 5, val: 19, state: 'active' },
          { id: 6, val: 28, state: 'default' }
        ],
        pointers: [{ name: 'L', target: 4 }, { name: 'MID', target: 5 }, { name: 'R', target: 6 }]
      },
      {
        step: 3,
        codeLine: 'if (arr[mid] === target) return mid;',
        action: { en: 'arr[5] === 19: Match found in only 2 comparisons instead of 6!', hi: 'arr[5] == 19 mil gaya! Sirf 2 steps me search complete.' },
        memory: { status: 'TARGET FOUND', index: '5', checksCount: '2' },
        visualNodes: [
          { id: 0, val: 3, state: 'default' },
          { id: 1, val: 7, state: 'default' },
          { id: 2, val: 9, state: 'default' },
          { id: 3, val: 11, state: 'default' },
          { id: 4, val: 14, state: 'default' },
          { id: 5, val: 19, state: 'found' },
          { id: 6, val: 28, state: 'default' }
        ],
        pointers: [{ name: 'FOUND', target: 5 }]
      }
    ]
  },

  mergesort: {
    id: 'mergesort',
    category: 'SORTING',
    name: { en: 'Merge Sort (Divide & Conquer)', hi: 'Merge Sort (Halves Divide & Merge)' },
    complexity: 'O(n log n) guaranteed / O(n) space',
    codeSnippet: [
      '// Divide array into halves',
      'const left = mergeSort([38, 27]);',
      'const right = mergeSort([43, 3]);',
      '// Merge sorted sub-arrays in order',
      'return merge(left, right); // [3, 27, 38, 43]'
    ],
    frames: [
      {
        step: 1,
        codeLine: '// Divide array into halves',
        action: { en: 'Split unsorted array [38, 27, 43, 3] down the middle.', hi: 'Array ko do hisso me baanta gaya: [38, 27] aur [43, 3].' },
        memory: { leftHalf: '[38, 27]', rightHalf: '[43, 3]' },
        visualNodes: [
          { id: 0, val: 38, state: 'highlight' },
          { id: 1, val: 27, state: 'highlight' },
          { id: 2, val: 43, state: 'new' },
          { id: 3, val: 3, state: 'new' }
        ],
        pointers: [{ name: 'Split Mid', target: 1 }]
      },
      {
        step: 2,
        codeLine: 'const left = mergeSort([38, 27]);',
        action: { en: 'Sort left half: 27 < 38, so merged left half is [27, 38].', hi: 'Left half sort hui: [27, 38].' },
        memory: { sortedLeft: '[27, 38]' },
        visualNodes: [
          { id: 0, val: 27, state: 'active' },
          { id: 1, val: 38, state: 'active' },
          { id: 2, val: 43, state: 'default' },
          { id: 3, val: 3, state: 'default' }
        ],
        pointers: [{ name: 'Left Done', target: 1 }]
      },
      {
        step: 3,
        codeLine: 'const right = mergeSort([43, 3]);',
        action: { en: 'Sort right half: 3 < 43, so merged right half is [3, 43].', hi: 'Right half sort hui: [3, 43].' },
        memory: { sortedRight: '[3, 43]' },
        visualNodes: [
          { id: 0, val: 27, state: 'active' },
          { id: 1, val: 38, state: 'active' },
          { id: 2, val: 3, state: 'active' },
          { id: 3, val: 43, state: 'active' }
        ],
        pointers: [{ name: 'Right Done', target: 3 }]
      },
      {
        step: 4,
        codeLine: 'return merge(left, right);',
        action: { en: 'Two pointers merge: compare heads (3 < 27), append smallest. Final: [3, 27, 38, 43].', hi: 'Final merge complete: [3, 27, 38, 43].' },
        memory: { sortedArray: '[3, 27, 38, 43]', complexity: 'O(n log n)' },
        visualNodes: [
          { id: 0, val: 3, state: 'found' },
          { id: 1, val: 27, state: 'found' },
          { id: 2, val: 38, state: 'found' },
          { id: 3, val: 43, state: 'found' }
        ],
        pointers: [{ name: 'Sorted', target: 3 }]
      }
    ]
  },

  quicksort: {
    id: 'quicksort',
    category: 'SORTING',
    name: { en: 'Quick Sort (Pivot Partitioning)', hi: 'Quick Sort (Pivot Partitioning)' },
    complexity: 'O(n log n) avg / O(n²) worst',
    codeSnippet: [
      'let pivot = arr[high]; // choose 7 as pivot',
      '// Partition values smaller than 7 left, larger right',
      'swap(arr[i + 1], arr[high]); // pivot in place',
      'quickSort(low, pi - 1); quickSort(pi + 1, high);'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'let pivot = arr[high];',
        action: { en: 'Choose rightmost element 7 as pivot.', hi: 'Rightmost element 7 ko pivot banaya.' },
        memory: { pivot: '7', array: '[9, 2, 8, 4, 7]' },
        visualNodes: [
          { id: 0, val: 9, state: 'default' },
          { id: 1, val: 2, state: 'default' },
          { id: 2, val: 8, state: 'default' },
          { id: 3, val: 4, state: 'default' },
          { id: 4, val: 7, state: 'active' }
        ],
        pointers: [{ name: 'PIVOT', target: 4 }]
      },
      {
        step: 2,
        codeLine: '// Partition values smaller than 7 left, larger right',
        action: { en: 'Swap smaller values (2, 4) before pivot index, larger (9, 8) after.', hi: '7 se chhoti values (2, 4) left me shift hui.' },
        memory: { smaller: '[2, 4]', larger: '[9, 8]' },
        visualNodes: [
          { id: 0, val: 2, state: 'highlight' },
          { id: 1, val: 4, state: 'highlight' },
          { id: 2, val: 7, state: 'active' },
          { id: 3, val: 8, state: 'default' },
          { id: 4, val: 9, state: 'default' }
        ],
        pointers: [{ name: 'PIVOT', target: 2 }]
      },
      {
        step: 3,
        codeLine: 'swap(arr[i + 1], arr[high]);',
        action: { en: 'Pivot 7 is now at its permanent sorted position index 2!', hi: 'Pivot 7 apni permanent sahi jagah par aa gaya.' },
        memory: { permanentIndex: '2 (val: 7)' },
        visualNodes: [
          { id: 0, val: 2, state: 'found' },
          { id: 1, val: 4, state: 'found' },
          { id: 2, val: 7, state: 'found' },
          { id: 3, val: 8, state: 'found' },
          { id: 4, val: 9, state: 'found' }
        ],
        pointers: [{ name: 'Sorted', target: 2 }]
      }
    ]
  },

  heapsort: {
    id: 'heapsort',
    category: 'SORTING',
    name: { en: 'Heap Sort (Max-Heapify & Extract)', hi: 'Heap Sort (Max-Heap & Extract)' },
    complexity: 'O(n log n) time / O(1) space',
    codeSnippet: [
      'buildMaxHeap(arr); // root holds max value',
      'for (let i = n - 1; i > 0; i--) {',
      '  swap(arr[0], arr[i]); // move max to end',
      '  heapify(arr, i, 0); // bubble new root down',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'buildMaxHeap(arr);',
        action: { en: 'Max-Heap built: Max element 16 sits at index 0 root.', hi: 'Max-heap tayyar hua: sabse bada element 16 root index 0 par hai.' },
        memory: { 'heapRoot[0]': '16 (Max)', size: '4' },
        visualNodes: [
          { id: 0, val: 16, state: 'active' },
          { id: 1, val: 14, state: 'default' },
          { id: 2, val: 10, state: 'default' },
          { id: 3, val: 4, state: 'default' }
        ],
        pointers: [{ name: 'MAX', target: 0 }]
      },
      {
        step: 2,
        codeLine: 'swap(arr[0], arr[i]);',
        action: { en: 'Extract 16: swap with last index. 16 is permanently sorted at end.', hi: '16 ko last index se swap kiya: 16 sort ho gaya.' },
        memory: { sortedAtTail: '16', heapSize: '3' },
        visualNodes: [
          { id: 0, val: 4, state: 'highlight' },
          { id: 1, val: 14, state: 'default' },
          { id: 2, val: 10, state: 'default' },
          { id: 3, val: 16, state: 'found' }
        ],
        pointers: [{ name: 'Sorted', target: 3 }]
      },
      {
        step: 3,
        codeLine: 'heapify(arr, i, 0);',
        action: { en: 'Heapify bubbles 14 to root, then extracts. Final array: [4, 10, 14, 16].', hi: 'Heapify se bache elements sort ho gaye: [4, 10, 14, 16].' },
        memory: { result: 'Sorted inplace in O(1) auxiliary space' },
        visualNodes: [
          { id: 0, val: 4, state: 'found' },
          { id: 1, val: 10, state: 'found' },
          { id: 2, val: 14, state: 'found' },
          { id: 3, val: 16, state: 'found' }
        ],
        pointers: [{ name: 'Done', target: 0 }]
      }
    ]
  },

  dijkstra: {
    id: 'dijkstra',
    category: 'GRAPH ALGORITHMS',
    name: { en: "Dijkstra's Algorithm (Shortest Path)", hi: "Dijkstra's Algorithm (Sabse Chhota Rasta)" },
    complexity: 'O((V + E) log V) with Priority Queue',
    codeSnippet: [
      'dist[start] = 0; pq.push({ node: "A", dist: 0 });',
      'while (!pq.isEmpty()) {',
      '  const { node, d } = pq.popMin();',
      '  for (const [neighbor, weight] of adj[node]) {',
      '    if (d + weight < dist[neighbor]) {',
      '      dist[neighbor] = d + weight; pq.push(...);',
      '    }',
      '  }',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'dist[start] = 0; pq.push({ node: "A", dist: 0 });',
        action: { en: 'Set source dist[A] = 0, all other nodes = Infinity.', hi: 'Source A ka distance 0 set kiya, baaki sab infinity.' },
        memory: { 'dist[A]': '0', 'dist[B]': '∞', 'dist[C]': '∞' },
        visualNodes: [
          { id: 'A', val: 'A (0)', state: 'active' },
          { id: 'B', val: 'B (∞)', state: 'default' },
          { id: 'C', val: 'C (∞)', state: 'default' }
        ],
        pointers: [{ name: 'Start', target: 'A' }]
      },
      {
        step: 2,
        codeLine: 'dist[neighbor] = d + weight;',
        action: { en: 'Relax edges from A: A->B (weight 4), A->C (weight 2). Min dist to C is 2!', hi: 'Edges relax hui: A->C ka rasta 2 hai, B ka 4.' },
        memory: { 'dist[A]': '0', 'dist[B]': '4', 'dist[C]': '2' },
        visualNodes: [
          { id: 'A', val: 'A (0)', state: 'done' },
          { id: 'B', val: 'B (4)', state: 'highlight' },
          { id: 'C', val: 'C (2)', state: 'active' }
        ],
        pointers: [{ name: 'Current Min', target: 'C' }]
      },
      {
        step: 3,
        codeLine: 'if (d + weight < dist[neighbor])',
        action: { en: 'Relax from C: C->B has weight 1. New path A->C->B = 2 + 1 = 3 < 4! dist[B] updated to 3.', hi: 'Behtar rasta mila! A->C->B ka cost 3 hai jo 4 se kam hai.' },
        memory: { 'dist[A]': '0', 'dist[C]': '2', 'dist[B]': '3 (via C)' },
        visualNodes: [
          { id: 'A', val: 'A (0)', state: 'done' },
          { id: 'C', val: 'C (2)', state: 'done' },
          { id: 'B', val: 'B (3)', state: 'found' }
        ],
        pointers: [{ name: 'Shortest Found', target: 'B' }]
      }
    ]
  },

  bellmanford: {
    id: 'bellmanford',
    category: 'GRAPH ALGORITHMS',
    name: { en: 'Bellman-Ford (Negative Edge Weights)', hi: 'Bellman-Ford (Negative Weights Handler)' },
    complexity: 'O(V × E) time / O(V) space',
    codeSnippet: [
      'for (let i = 1; i <= V - 1; i++) {',
      '  for (const [u, v, weight] of edges) {',
      '    if (dist[u] + weight < dist[v]) {',
      '      dist[v] = dist[u] + weight;',
      '    }',
      '  }',
      '}',
      '// Check negative cycle in V-th pass'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'for (let i = 1; i <= V - 1; i++)',
        action: { en: 'Initialize dist[S] = 0. Edge S->A has weight 5, S->B has 2.', hi: 'Source dist 0 set hua. Pass 1 shuru.' },
        memory: { 'dist[S]': '0', 'dist[A]': '5', 'dist[B]': '2' },
        visualNodes: [
          { id: 'S', val: 'S (0)', state: 'active' },
          { id: 'A', val: 'A (5)', state: 'default' },
          { id: 'B', val: 'B (2)', state: 'default' }
        ],
        pointers: [{ name: 'Pass 1', target: 'S' }]
      },
      {
        step: 2,
        codeLine: 'dist[v] = dist[u] + weight;',
        action: { en: 'Negative Edge: Edge B->A has weight -4! dist[A] = dist[B] + (-4) = 2 - 4 = -2!', hi: 'Negative weight mila: B->A (-4). Naya cost A ka -2 ho gaya!' },
        memory: { 'dist[B]': '2', 'edge(B,A)': '-4', 'dist[A]': '-2' },
        visualNodes: [
          { id: 'S', val: 'S (0)', state: 'done' },
          { id: 'B', val: 'B (2)', state: 'done' },
          { id: 'A', val: 'A (-2)', state: 'found' }
        ],
        pointers: [{ name: 'Negative Relaxed', target: 'A' }]
      },
      {
        step: 3,
        codeLine: '// Check negative cycle in V-th pass',
        action: { en: 'V-th iteration: No further reductions occur. No negative-weight cycles detected!', hi: 'Koi negative weight cycle nahi mila. Shortest paths confirmed.' },
        memory: { negativeCycle: 'false', finalCostA: '-2' },
        visualNodes: [
          { id: 'S', val: 'S: 0', state: 'found' },
          { id: 'B', val: 'B: 2', state: 'found' },
          { id: 'A', val: 'A: -2', state: 'found' }
        ],
        pointers: [{ name: 'Optimal', target: 'A' }]
      }
    ]
  },

  prims: {
    id: 'prims',
    category: 'GRAPH ALGORITHMS',
    name: { en: "Prim's Algorithm (Minimum Spanning Tree)", hi: "Prim's Algorithm (Minimum Spanning Tree)" },
    complexity: 'O(E log V) with Min-Heap',
    codeSnippet: [
      'visited.add(startNode);',
      'while (visited.size < totalNodes) {',
      '  const minEdge = pq.extractMinCheapestCrossingEdge();',
      '  visited.add(minEdge.to);',
      '  mstWeight += minEdge.weight;',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'visited.add(startNode);',
        action: { en: 'Start tree at Node 1. Available crossing edges: (1-2 wt:2), (1-3 wt:4).', hi: 'Node 1 se MST shuru hua.' },
        memory: { visited: '[1]', mstCost: '0' },
        visualNodes: [
          { id: '1', val: '1 (Tree)', state: 'active' },
          { id: '2', val: '2', state: 'default' },
          { id: '3', val: '3', state: 'default' }
        ],
        pointers: [{ name: 'Root MST', target: '1' }]
      },
      {
        step: 2,
        codeLine: 'const minEdge = pq.extractMinCheapestCrossingEdge();',
        action: { en: 'Greedy choice: pick cheapest edge (1-2 wt:2). Add Node 2 to MST.', hi: 'Cheapest edge (1-2 wt:2) chuni. Node 2 MST me jud gaya.' },
        memory: { visited: '[1, 2]', addedEdge: '1-2 (2)', mstCost: '2' },
        visualNodes: [
          { id: '1', val: '1', state: 'done' },
          { id: '2', val: '2 (Added)', state: 'active' },
          { id: '3', val: '3', state: 'default' }
        ],
        pointers: [{ name: 'MST Edge', target: '2' }]
      },
      {
        step: 3,
        codeLine: 'mstWeight += minEdge.weight;',
        action: { en: 'Next cheapest crossing is (2-3 wt:1). Add Node 3. All vertices connected! MST = 3.', hi: 'Cheapest edge (2-3 wt:1) jodi. Saare nodes jud gaye! Total cost = 3.' },
        memory: { visited: '[1, 2, 3]', totalMSTWeight: '3' },
        visualNodes: [
          { id: '1', val: '1', state: 'found' },
          { id: '2', val: '2', state: 'found' },
          { id: '3', val: '3', state: 'found' }
        ],
        pointers: [{ name: 'Complete MST', target: '3' }]
      }
    ]
  },

  kruskal: {
    id: 'kruskal',
    category: 'GRAPH ALGORITHMS',
    name: { en: "Kruskal's Algorithm (Disjoint Set Union MST)", hi: "Kruskal's Algorithm (DSU MST)" },
    complexity: 'O(E log E) sorting edges',
    codeSnippet: [
      'edges.sort((a, b) => a.weight - b.weight);',
      'const dsu = new DisjointSet(V);',
      'for (const edge of edges) {',
      '  if (dsu.union(edge.u, edge.v)) {',
      '    mst.push(edge); // no cycle created',
      '  }',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'edges.sort((a, b) => a.weight - b.weight);',
        action: { en: 'Sort all graph edges globally: [(A-B: 1), (B-C: 2), (A-C: 3)].', hi: 'Saari edges ko weight ke hisab se sort kiya.' },
        memory: { sortedEdges: 'A-B(1), B-C(2), A-C(3)' },
        visualNodes: [
          { id: 'A', val: 'A', state: 'default' },
          { id: 'B', val: 'B', state: 'default' },
          { id: 'C', val: 'C', state: 'default' }
        ],
        pointers: [{ name: 'Min Edge: A-B', target: 'A' }]
      },
      {
        step: 2,
        codeLine: 'if (dsu.union(edge.u, edge.v))',
        action: { en: 'Add edge (A-B: 1): Parents different. Union(A, B) succeeds.', hi: 'Edge A-B jud gayi. Koi cycle nahi bana.' },
        memory: { mstEdges: '[(A,B,1)]', mstWeight: '1' },
        visualNodes: [
          { id: 'A', val: 'A-B', state: 'active' },
          { id: 'B', val: 'B-A', state: 'active' },
          { id: 'C', val: 'C', state: 'default' }
        ],
        pointers: [{ name: 'United', target: 'B' }]
      },
      {
        step: 3,
        codeLine: 'if (dsu.union(edge.u, edge.v))',
        action: { en: 'Add edge (B-C: 2): Union(B, C) succeeds. Edge (A-C: 3) rejected because it would form a cycle!', hi: 'B-C jud gayi. Edge A-C discard hui kyunki wo cycle bana rahi thi!' },
        memory: { rejectedEdge: 'A-C (cycle!)', totalMSTCost: '3' },
        visualNodes: [
          { id: 'A', val: 'A', state: 'found' },
          { id: 'B', val: 'B', state: 'found' },
          { id: 'C', val: 'C', state: 'found' }
        ],
        pointers: [{ name: 'MST Valid', target: 'C' }]
      }
    ]
  },

  toposort: {
    id: 'toposort',
    category: 'GRAPH ALGORITHMS',
    name: { en: "Topological Sort (Kahn's In-Degree Algorithm)", hi: "Topological Sort (Kahn's In-Degree)" },
    complexity: 'O(V + E) time / O(V) space',
    codeSnippet: [
      '// Compute in-degrees: count incoming edges per node',
      'const queue = nodes.filter(n => inDegree[n] === 0);',
      'while (queue.length) {',
      '  const node = queue.shift(); topoOrder.push(node);',
      '  for (const next of adj[node]) {',
      '    if (--inDegree[next] === 0) queue.push(next);',
      '  }',
      '}'
    ],
    frames: [
      {
        step: 1,
        codeLine: 'const queue = nodes.filter(n => inDegree[n] === 0);',
        action: { en: 'Compute dependencies: Node A has in-degree 0 (no prerequisites). Push to queue.', hi: 'Node A ka in-degree 0 hai. Queue me dala.' },
        memory: { 'inDegree[A]': '0', 'inDegree[B]': '1', 'inDegree[C]': '2', queue: '[A]' },
        visualNodes: [
          { id: 'A', val: 'A (in:0)', state: 'active' },
          { id: 'B', val: 'B (in:1)', state: 'default' },
          { id: 'C', val: 'C (in:2)', state: 'default' }
        ],
        pointers: [{ name: 'In-Degree 0', target: 'A' }]
      },
      {
        step: 2,
        codeLine: 'const node = queue.shift(); topoOrder.push(node);',
        action: { en: 'Process A: Remove A, decrement B and C. Now B has in-degree 0! Queue = [B].', hi: 'A process hua. B ka in-degree 0 ho gaya.' },
        memory: { topoOrder: '[A]', 'inDegree[B]': '0', queue: '[B]' },
        visualNodes: [
          { id: 'A', val: 'A (Done)', state: 'done' },
          { id: 'B', val: 'B (in:0)', state: 'active' },
          { id: 'C', val: 'C (in:1)', state: 'default' }
        ],
        pointers: [{ name: 'Next in Q', target: 'B' }]
      },
      {
        step: 3,
        codeLine: 'topoOrder.push(node);',
        action: { en: 'Process B then C: Final valid topological dependency order is: A -> B -> C!', hi: 'Final topological dependency order complete: A -> B -> C!' },
        memory: { finalOrder: 'A -> B -> C', acyclic: 'true' },
        visualNodes: [
          { id: 'A', val: '1. A', state: 'found' },
          { id: 'B', val: '2. B', state: 'found' },
          { id: 'C', val: '3. C', state: 'found' }
        ],
        pointers: [{ name: 'Valid DAG Order', target: 'C' }]
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
  const [selectedDS, setSelectedDS] = useState<DSKey>('slidingwindow')
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

  const isArrayOrWindowType = [
    'slidingwindow',
    'fastslow',
    'prefixsums',
    'binarysearch',
    'mergesort',
    'quicksort',
    'heapsort'
  ].includes(selectedDS)

  const isGraphType = ['dijkstra', 'bellmanford', 'prims', 'kruskal', 'toposort'].includes(selectedDS)

  return (
    <div className="page-enter visualizer-page-container">
      <div className="page-heading-row" style={{ marginBottom: '16px' }}>
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> MEMORY & POINTER TRACER
          </div>
          <h1>{isHi ? 'Visual Lab: Execution Engine' : 'Visual Lab: Memory & Pointer Tracer'}</h1>
          <p>
            {isHi
              ? 'Slow down the logic. Watch pointers, memory addresses, sliding windows, and graphs step-by-step.'
              : 'Inspect pointers, memory addresses, array windows, and graphs step-by-step with code line synchronization.'}
          </p>
        </div>
        <div className="visualizer-xp">
          <Sparkles size={15} color="#eed889" />
          <span><b>+15 XP</b> per module</span>
        </div>
      </div>

      <div className="visualizer-engine-grid">
        {/* Left Scrollable Module Selector */}
        <div className="ds-selector-panel">
          <span className="ds-panel-label">AVAILABLE ALGORITHMS ({Object.keys(modules).length})</span>
          <div className="ds-selector-scroll">
            {(Object.keys(modules) as DSKey[]).map((key) => {
              const mod = modules[key]
              const isSelected = selectedDS === key
              return (
                <button
                  key={key}
                  onClick={() => selectModule(key)}
                  className={`ds-select-btn ${isSelected ? 'active' : ''}`}
                >
                  {mod.category === 'GRAPH ALGORITHMS' ? (
                    <Network size={14} />
                  ) : mod.category === 'SORTING' ? (
                    <Sliders size={14} />
                  ) : (
                    <Database size={14} />
                  )}
                  <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                    <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {isHi ? mod.name.hi : mod.name.en}
                    </strong>
                    <small>{mod.complexity}</small>
                  </div>
                  <ChevronRight size={13} opacity={isSelected ? 1 : 0.4} />
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Execution Studio */}
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

          {/* Central Interactive Memory Canvas */}
          <div className="visual-memory-canvas">
            {/* 1. Singly Linked List */}
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
                            <ArrowRight size={16} color="var(--cyan)" />
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

            {/* 2. Stack LIFO */}
            {selectedDS === 'stack' && (
              <div className="stack-cylinder">
                {currentFrame.visualNodes.length === 0 ? (
                  <span style={{ fontSize: '11px', color: 'var(--dim)', textAlign: 'center', margin: 'auto' }}>
                    Stack Empty (top = -1)
                  </span>
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
            )}

            {/* 3. Queue FIFO */}
            {selectedDS === 'queue' && (
              <div className="queue-pipeline">
                {currentFrame.visualNodes.length === 0 ? (
                  <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Queue Empty</span>
                ) : (
                  currentFrame.visualNodes.map((n, i) => (
                    <div key={n.id} className={`queue-box ${n.state || 'default'}`}>
                      {i === 0 && <span className="front-indicator">FRONT</span>}
                      {i === currentFrame.visualNodes.length - 1 && <span className="rear-indicator">REAR</span>}
                      <span>{n.val}</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 4. Binary Search Tree */}
            {selectedDS === 'binarytree' && (
              <div className="tree-node-cluster">
                {currentFrame.visualNodes.length > 0 && (
                  <>
                    <div className="tree-root-circle">
                      <span className="root-indicator">root</span>
                      <span>10</span>
                    </div>
                    <div className="tree-children-row">
                      {currentFrame.visualNodes.find((n) => n.val === 5) ? (
                        <div className="tree-child">
                          <div className="tree-node-circle">5</div>
                          <span className="child-label">left (&lt; 10)</span>
                        </div>
                      ) : (
                        <div style={{ color: 'var(--dim)', fontSize: '10px' }}>left: null</div>
                      )}
                      {currentFrame.visualNodes.find((n) => n.val === 15) ? (
                        <div className="tree-child">
                          <div className="tree-node-circle">15</div>
                          <span className="child-label">right (&gt; 10)</span>
                        </div>
                      ) : (
                        <div style={{ color: 'var(--dim)', fontSize: '10px' }}>right: null</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 5. Array, Two-Pointer & Sorting Visualizer */}
            {isArrayOrWindowType && (
              <div className="array-window-container">
                <div className="array-cells-row">
                  {currentFrame.visualNodes.map((item, idx) => {
                    const activePointer = currentFrame.pointers.find((p) => String(p.target) === String(item.id))
                    return (
                      <div key={item.id} className="array-cell-col">
                        {activePointer && (
                          <div className="array-cell-pointer-badge">
                            <span>{activePointer.name}</span>
                            <span className="down-arrow">▼</span>
                          </div>
                        )}
                        <div className={`array-visual-cell ${item.state || 'default'}`}>
                          <span>{item.val}</span>
                        </div>
                        <span className="array-cell-idx">[{idx}]</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 6. Graph Visualizer (Dijkstra, Bellman-Ford, Prim's, Kruskal, TopoSort) */}
            {isGraphType && (
              <div className="graph-canvas-box">
                <div className="graph-nodes-row">
                  {currentFrame.visualNodes.map((node) => {
                    const pointer = currentFrame.pointers.find((p) => String(p.target) === String(node.id))
                    return (
                      <div key={node.id} className="graph-node-col">
                        {pointer && <span className="graph-pointer-pill">{pointer.name}</span>}
                        <div className={`graph-orb ${node.state || 'default'}`}>
                          <span>{node.val}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Synchronized Code & Heap Memory Registers */}
          <div className="studio-bottom-grid">
            <div className="code-sync-box">
              <div className="box-header">
                <Code2 size={13} color="var(--cyan)" />
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
                <Database size={13} color="var(--amber)" />
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
                <Info size={13} color="var(--cyan)" />
                <p>{isHi ? currentFrame.action.hi : currentFrame.action.en}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}