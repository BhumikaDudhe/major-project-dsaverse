export type View = 'dashboard' | 'learn' | 'visualizer' | 'arena' | 'quests' | 'planner' | 'mentor'
export type Language = 'EN' | 'HI'

export const topics = [
  { id: 'basics', title: 'Programming basics', hindi: 'Programming ki basics', unit: '01', level: 'Start here', time: '2.5 hrs', progress: 100, color: 'mint', lessons: ['Variables & data types', 'Conditions and loops', 'Functions, step by step'] },
  { id: 'arrays', title: 'Arrays & strings', hindi: 'Arrays aur strings', unit: '02', level: 'Foundation', time: '4 hrs', progress: 72, color: 'cyan', lessons: ['Array fundamentals', 'Two pointers', 'Strings & frequency maps'] },
  { id: 'search', title: 'Searching', hindi: 'Searching', unit: '03', level: 'Foundation', time: '3 hrs', progress: 38, color: 'violet', lessons: ['Linear search', 'Binary search intuition', 'Search boundaries'] },
  { id: 'sorting', title: 'Sorting', hindi: 'Sorting', unit: '04', level: 'Foundation', time: '4 hrs', progress: 0, color: 'pink', lessons: ['Bubble & selection sort', 'Merge sort', 'Quick sort'] },
  { id: 'recursion', title: 'Recursion', hindi: 'Recursion', unit: '05', level: 'Core', time: '3 hrs', progress: 0, color: 'amber', lessons: ['Call stack', 'Base cases', 'Backtracking basics'] },
  { id: 'lists', title: 'Linked lists', hindi: 'Linked lists', unit: '06', level: 'Core', time: '3 hrs', progress: 0, color: 'cyan', lessons: ['Nodes & pointers', 'Insert and delete', 'Reverse a list'] },
  { id: 'stacks', title: 'Stacks & queues', hindi: 'Stacks aur queues', unit: '07', level: 'Core', time: '3 hrs', progress: 0, color: 'violet', lessons: ['LIFO & FIFO', 'Monotonic stack', 'Queue patterns'] },
  { id: 'trees', title: 'Trees', hindi: 'Trees', unit: '08', level: 'Core', time: '5 hrs', progress: 0, color: 'mint', lessons: ['Tree vocabulary', 'DFS traversals', 'Binary search trees'] },
  { id: 'graphs', title: 'Graphs', hindi: 'Graphs', unit: '09', level: 'Advanced', time: '6 hrs', progress: 0, color: 'pink', lessons: ['Graph representations', 'BFS & DFS', 'Shortest paths'] },
  { id: 'dp', title: 'Dynamic programming', hindi: 'Dynamic programming', unit: '10', level: 'Advanced', time: '8 hrs', progress: 0, color: 'amber', lessons: ['Spot overlapping subproblems', 'Memoization', 'Tabulation'] },
]

export const companies = ['TCS', 'Infosys', 'Cognizant', 'Accenture', 'Amazon', 'Microsoft', 'Google']

export const starterCode = `function binarySearch(nums, target) {
  // Your code goes here
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // compare nums[mid] with target
  }
}`