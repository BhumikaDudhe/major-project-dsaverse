export type World = { id: string; name: string; subtitle: string; focus: string; requirement: string }

export const worlds: World[] = [
  { id: 'logic-forest', name: 'Logic Forest', subtitle: 'The first green path', focus: 'Variables, conditions, loops, functions', requirement: 'Start your journey' },
  { id: 'array-kingdom', name: 'Array Kingdom', subtitle: 'A realm of indexed paths', focus: 'Indexing, search, two pointers, prefix sums', requirement: 'Complete Logic Forest' },
  { id: 'sorting-citadel', name: 'Sorting Citadel', subtitle: 'The order of things', focus: 'Bubble, insertion, selection, merge, quicksort', requirement: 'Complete Array Kingdom' },
  { id: 'recursion-maze', name: 'Recursion Mirror Maze', subtitle: 'Find your way through', focus: 'Call stacks, base cases, backtracking', requirement: 'Complete Sorting Citadel' },
  { id: 'linked-caverns', name: 'Linked List Caverns', subtitle: 'Follow the pointers', focus: 'Nodes, references, insertion, reversal', requirement: 'Complete Recursion Mirror Maze' },
  { id: 'structure-tower', name: 'Stack and Queue Tower', subtitle: 'One at a time', focus: 'Push, pop, enqueue, dequeue', requirement: 'Complete Linked List Caverns' },
  { id: 'wisdom-tree', name: 'Tree of Wisdom', subtitle: 'Branch into new ideas', focus: 'Binary trees, BSTs, traversals, heaps', requirement: 'Complete Stack and Queue Tower' },
  { id: 'graph-portal', name: 'Graph Portal', subtitle: 'Every path connects', focus: 'Graph representation, BFS, DFS, shortest paths', requirement: 'Complete Tree of Wisdom' },
  { id: 'dp-realm', name: 'Dynamic Programming Realm', subtitle: 'Build on what you know', focus: 'Memoization, tabulation, progressive DP', requirement: 'Complete Graph Portal' },
]