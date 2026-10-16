export type CodeExample = {
  title: string
  titleHi?: string
  description: string
  descriptionHi?: string
  code: string
  explanation: string
  explanationHi?: string
}

export type WorldConcept = {
  title: string
  titleHi?: string
  summary: string
  summaryHi?: string
  bullets: string[]
  bulletsHi?: string[]
}

export type ComplexityItem = {
  operation: string
  operationHi?: string
  time: string
  space: string
  note: string
  noteHi?: string
}

export type WorldTheoryData = {
  worldId: string
  title: string
  titleHi: string
  subtitle: string
  subtitleHi: string
  unlockTile: number
  overview: string
  overviewHi: string
  concepts: WorldConcept[]
  complexities: ComplexityItem[]
  examples: CodeExample[]
  keyTakeaways: string[]
  keyTakeawaysHi: string[]
}

export const WORLD_UNLOCK_TILES: Record<string, number> = {
  'logic-forest': 1,
  'array-kingdom': 5,
  'sorting-citadel': 8,
  'recursion-maze': 10,
  'linked-caverns': 16,
  'structure-tower': 19,
  'wisdom-tree': 20,
  'graph-portal': 24,
  'dp-realm': 29,
}

export const WORLD_THEORY: Record<string, WorldTheoryData> = {
  'logic-forest': {
    worldId: 'logic-forest',
    title: 'Logic Forest',
    titleHi: 'Logic Forest',
    subtitle: 'The foundational path of algorithmic thinking',
    subtitleHi: 'Algorithmic soch aur programming ki buniyad',
    unlockTile: 1,
    overview: 'Logic Forest is where every algorithm engineer begins. Before diving into complex structures, you must master variable state management, conditional branch evaluation, deterministic iteration, function scoping, and time complexity fundamentals.',
    overviewHi: 'Logic Forest algorithms ki shuruaat hai. Complex structures se pehle variable state, if-else conditions, loops, functions aur Big-O complexity ki buniyad mazboot karni hoti hai.',
    concepts: [
      {
        title: 'Variables & State Memory',
        titleHi: 'Variables aur Memory State',
        summary: 'Variables represent named storage locations in memory holding data primitives or references.',
        summaryHi: 'Variables memory mein named boxes hain jo data values ko hold karte hain.',
        bullets: [
          'Primitive values (numbers, booleans, strings) are stored directly on the stack.',
          'State mutations must be tracked carefully to avoid unexpected side effects.',
          'Const vs let/var: Prefer immutability when values should remain invariant throughout execution.',
        ],
        bulletsHi: [
          'Numbers, strings, aur booleans memory mein direct values store karte hain.',
          'State change ko dhyan se track karo taaki bugs na aayen.',
          'Jahan value change na karni ho, wahan const use karo.',
        ],
      },
      {
        title: 'Conditionals & Boolean Algebra',
        titleHi: 'Conditionals aur Boolean Logic',
        summary: 'Branching allows programs to execute different code paths based on predicates.',
        summaryHi: 'Conditionals ke zariye program conditions ke hisaab se alag raste chunta hai.',
        bullets: [
          'Comparison operators: ==, ===, <, <=, >, >= evaluate truth values.',
          'Short-circuit evaluation: In (A && B), if A is false, B is never evaluated.',
          'Guard clauses: Return early from functions to eliminate deeply nested if-statements.',
        ],
        bulletsHi: [
          'Comparison operators (===, <, >, <=) true ya false return karte hain.',
          'Short-circuiting: (false && anything) mein agla part execute nahi hota.',
          'Guard clause use karke deep nesting se bacho.',
        ],
      },
      {
        title: 'Iteration & Loop Invariants',
        titleHi: 'Loops aur Invariants',
        summary: 'Loops repeat statements until a boundary condition evaluates to false.',
        summaryHi: 'Loops ek kaam ko baar-baar karte hain jab tak condition false na ho.',
        bullets: [
          'For loops are best for fixed-range indexing; While loops suit condition-driven polling.',
          'Always verify termination conditions to prevent infinite loops and off-by-one errors.',
          'Loop Invariant: A property that holds true before and after each iteration pass.',
        ],
        bulletsHi: [
          'For loop fixed counting ke liye aur while loop condition ke liye best hai.',
          'Termination condition check karo taaki infinite loop na bane.',
          'Off-by-one error (<= vs <) se bachne ke liye index dhyan se set karo.',
        ],
      },
    ],
    complexities: [
      { operation: 'Variable Read / Assignment', time: 'O(1)', space: 'O(1)', note: 'Direct CPU register / stack memory lookup' },
      { operation: 'Single Loop of N iterations', time: 'O(N)', space: 'O(1)', note: 'Linear execution proportional to input size' },
      { operation: 'Nested Dual Loop (N x N)', time: 'O(N²)', space: 'O(1)', note: 'Quadratic time; beware of scaling bottlenecks' },
    ],
    examples: [
      {
        title: 'Finding Maximum Value in a List',
        titleHi: 'Array mein Sabse Badi Value Dhoondhna',
        description: 'A linear scan keeps track of the highest value encountered so far.',
        descriptionHi: 'Linear scan ke zariye ab tak ki sabse badi value track karte hain.',
        code: `function findMax(numbers: number[]): number {
  if (numbers.length === 0) throw new Error("Array is empty");
  
  let currentMax = numbers[0]; // initialize with first item
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > currentMax) {
      currentMax = numbers[i]; // update when a larger number is seen
    }
  }
  return currentMax;
}

// Example usage:
console.log(findMax([12, 45, 7, 89, 23])); // Output: 89`,
        explanation: 'Time Complexity: O(N) because we inspect each element exactly once. Space Complexity: O(1) auxiliary memory.',
        explanationHi: 'Time Complexity: O(N) kyunki har number ko ek baar dekhte hain. Space Complexity: O(1).',
      },
    ],
    keyTakeaways: [
      'Initialize accumulators properly (e.g., max with numbers[0], sum with 0).',
      'Watch boundary conditions: Arrays of length N have valid indices 0 to N - 1.',
      'Big-O measures how runtime scales with input size, not raw milliseconds.',
    ],
    keyTakeawaysHi: [
      'Accumulator sahi value se start karo (max ke liye pehla number, sum ke liye 0).',
      'Index bounds hamesha 0 se length - 1 tak hote hain.',
      'Big-O runtime scaling ko measure karta hai.',
    ],
  },
  'array-kingdom': {
    worldId: 'array-kingdom',
    title: 'Array Kingdom',
    titleHi: 'Array Kingdom',
    subtitle: 'Contiguous memory, direct indexing, and two-pointer mastery',
    subtitleHi: 'Contiguous memory, indexing aur two-pointer techniques',
    unlockTile: 5,
    overview: 'Array Kingdom is the realm of sequential memory. Arrays store elements side-by-side in memory, granting blazing fast O(1) random access via memory addresses. However, insertions and deletions require shifting elements, making spatial understanding paramount.',
    overviewHi: 'Array Kingdom contiguous memory ka realm hai. Yahan har element bagal-bagal store hota hai, isliye index se value O(1) mein milti hai. Two pointers aur prefix sums yahan ke sabse powerful hathiyar hain.',
    concepts: [
      {
        title: 'Contiguous Memory & Zero-Indexing',
        titleHi: 'Contiguous Memory aur Index Formula',
        summary: 'Elements are stored in sequential memory cells, enabling direct arithmetic address calculation.',
        summaryHi: 'Memory mein elements lagatar cells mein hote hain, isliye direct address calculate ho jata hai.',
        bullets: [
          'Address formula: Address(i) = BaseAddress + (i * ElementByteSize).',
          'Zero-indexing represents the offset distance from the base memory address.',
          'Access by index is instant O(1), but search in unsorted array takes O(N).',
        ],
        bulletsHi: [
          'Index se direct memory address milta hai: Address = Base + i * Size.',
          'Zero-based index ka matlab base se kitna offset door hai.',
          'Index access O(1) hota hai, par search O(N) lagti hai.',
        ],
      },
      {
        title: 'The Two-Pointer Technique',
        titleHi: 'Two-Pointer Technique',
        summary: 'Pointers start at opposite ends or move at different speeds to solve problems in O(N) instead of O(N²).',
        summaryHi: 'Do pointers dono kinaron se ya alag speeds par chalte hain aur O(N²) ko O(N) bana dete hain.',
        bullets: [
          'Opposite-direction: Left pointer starts at 0, Right pointer at length - 1 (e.g., Two Sum on sorted array, palindrome verification).',
          'Same-direction: Fast and slow runner pointers (e.g., removing duplicates in-place).',
          'Condition-driven movement: Narrow the search space monotonically without nested loops.',
        ],
        bulletsHi: [
          'Left pointer 0 par aur Right pointer end par start hota hai.',
          'Sorted array mein agar sum chhota hai toh left badhao, bada hai toh right ghatao.',
          'In-place deduplication ke liye fast aur slow runner pointers use hote hain.',
        ],
      },
      {
        title: 'Prefix Sums & Range Queries',
        titleHi: 'Prefix Sums aur Subarrays',
        summary: 'Precompute cumulative sums so any subarray sum can be answered in O(1) time.',
        summaryHi: 'Pehle se cumulative sum calculate karke kisi bhi range ka sum O(1) mein nikalte hain.',
        bullets: [
          'Prefix array formula: prefix[i] = prefix[i - 1] + arr[i].',
          'Range sum query for index [L..R] = prefix[R] - prefix[L - 1].',
          'Transforms repetitive O(N) range queries into instantaneous O(1) lookups.',
        ],
        bulletsHi: [
          'prefix[i] = prefix[i-1] + arr[i] se table banti hai.',
          'Subarray [L..R] ka sum = prefix[R] - prefix[L - 1].',
          'Bar-bar O(N) loop chalane ke bajay O(1) lookup milta hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Access by Index: arr[i]', time: 'O(1)', space: 'O(1)', note: 'Direct mathematical address jump' },
      { operation: 'Linear Search: indexOf()', time: 'O(N)', space: 'O(1)', note: 'Must check every element in worst case' },
      { operation: 'Binary Search (Sorted Array)', time: 'O(log N)', space: 'O(1)', note: 'Halves the search space every step' },
      { operation: 'Insertion / Deletion at Start', time: 'O(N)', space: 'O(1)', note: 'All subsequent elements must shift right/left' },
      { operation: 'Prefix Sum Precomputation', time: 'O(N)', space: 'O(N)', note: 'Allows subsequent range queries in O(1)' },
    ],
    examples: [
      {
        title: 'Two Sum in a Sorted Array (Two Pointers)',
        titleHi: 'Sorted Array mein Target Sum Dhoondhna',
        description: 'Find two numbers that add up to a target in O(N) time and O(1) space.',
        descriptionHi: 'Sorted array mein target sum wale do indices O(N) time mein dhoondho.',
        code: `function twoSumSorted(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const currentSum = nums[left] + nums[right];
    if (currentSum === target) {
      return [left, right]; // Found the pair!
    } else if (currentSum < target) {
      left++; // Need a bigger sum -> move left pointer right
    } else {
      right--; // Need a smaller sum -> move right pointer left
    }
  }
  return null; // No pair found
}

// Example usage:
const arr = [2, 7, 11, 15, 19];
console.log(twoSumSorted(arr, 26)); // Output: [1, 4] (7 + 19 = 26)`,
        explanation: 'Because the array is sorted, moving left increases the sum and moving right decreases the sum. We inspect each element at most once in O(N) time with O(1) auxiliary memory.',
        explanationHi: 'Array sorted hai, isliye left aage badhane se sum badhta hai aur right piche lane se sum ghata hai. O(N) time aur O(1) space.',
      },
      {
        title: 'Fast Range Sums with Prefix Array',
        titleHi: 'Prefix Sum Range Query',
        description: 'Answer any range sum query in O(1) time after O(N) precomputation.',
        descriptionHi: 'Prefix array se kisi bhi range ka sum O(1) mein nikalo.',
        code: `class PrefixSumArray {
  private prefix: number[];

  constructor(nums: number[]) {
    this.prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  // Returns sum of nums[L...R] inclusive (0-indexed)
  query(L: number, R: number): number {
    return this.prefix[R + 1] - this.prefix[L];
  }
}

const psa = new PrefixSumArray([3, 1, 4, 1, 5, 9]);
console.log(psa.query(1, 4)); // nums[1..4] = 1 + 4 + 1 + 5 = 11 in O(1) time!`,
        explanation: 'We store cumulative sums. Querying between L and R simply subtracts prefix[L] from prefix[R + 1].',
        explanationHi: 'Cumulative sum table banti hai. Query ke waqt seedha O(1) subtraction se answer mil jata hai.',
      },
    ],
    keyTakeaways: [
      'In sorted arrays, always consider the Two-Pointer technique before writing nested O(N²) loops.',
      'Prefix sums eliminate redundant accumulation across multiple range queries.',
      'Array lookups are O(1), but mid-array insertions and deletions cost O(N) shifts.',
    ],
    keyTakeawaysHi: [
      'Sorted arrays mein nested loops ki jagah Two Pointers socho.',
      'Range sum queries ke liye Prefix Sums best hain.',
      'Array indexing O(1) hai, par beech mein insert/delete O(N) leta hai.',
    ],
  },
  'sorting-citadel': {
    worldId: 'sorting-citadel',
    title: 'Sorting Citadel',
    titleHi: 'Sorting Citadel',
    subtitle: 'Ordering algorithms, divide-and-conquer, and algorithmic efficiency',
    subtitleHi: 'Sorting algorithms aur divide-and-conquer ka killa',
    unlockTile: 8,
    overview: 'In Sorting Citadel, chaos is forged into order. Sorting transforms unsorted datasets into monotonic sequences, unlocking binary search, clustering, and deduplication. Master both elementary O(N²) sorts and industrial-grade O(N log N) divide-and-conquer algorithms.',
    overviewHi: 'Sorting Citadel mein unordered data ko sequence mein laya jata hai. Yahan Bubble, Insertion sort se lekar Merge Sort aur Quicksort jaise high-speed algorithms sikhaye jaate hain.',
    concepts: [
      {
        title: 'Divide & Conquer Paradigm',
        titleHi: 'Divide & Conquer Formula',
        summary: 'Divide the problem into subproblems, conquer recursively, and combine their solutions.',
        summaryHi: 'Badi problem ko chhote parts mein todo, solve karo, aur combine karo.',
        bullets: [
          'Merge Sort splits the array down to single items, then merges sorted halves in O(N) time.',
          'Guaranteed O(N log N) runtime in best, average, and worst cases.',
          'Stable sort: preserves relative order of duplicate elements.',
        ],
        bulletsHi: [
          'Merge sort array ko aadha karta hai aur sorted halves ko merge karta hai.',
          'Har case mein O(N log N) guaranteed performance deta hai.',
          'Stable sort duplicate elements ka original order banaye rakhta hai.',
        ],
      },
      {
        title: 'Partitioning & Quick Sort',
        titleHi: 'Partitioning aur Quicksort',
        summary: 'Picks a pivot, places it at its sorted position, and puts smaller items left and larger items right.',
        summaryHi: 'Ek pivot chuno, chhoti values left mein aur badi values right mein partition karo.',
        bullets: [
          'Average time O(N log N) with excellent cache locality and minimal O(1) in-place auxiliary space.',
          'Worst-case O(N²) occurs if the pivot is repeatedly the extreme element (mitigated via randomized pivot).',
          'Lomuto and Hoare are the two classic partition schemes.',
        ],
        bulletsHi: [
          'Average time O(N log N) aur in-place O(1) extra space.',
          'Pivot selection dhyan se karo taaki worst-case O(N²) se bacha ja sake.',
          'Cache locality ki wajah se real-world mein Quicksort behad fast hota hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Bubble / Selection Sort', time: 'O(N²)', space: 'O(1)', note: 'Simple to understand, slow on large datasets' },
      { operation: 'Insertion Sort', time: 'O(N) best / O(N²) worst', space: 'O(1)', note: 'Very fast for nearly-sorted data' },
      { operation: 'Merge Sort', time: 'O(N log N)', space: 'O(N)', note: 'Consistent performance, stable, extra memory required' },
      { operation: 'Quick Sort (Average)', time: 'O(N log N)', space: 'O(log N)', note: 'Fast in-place sort, standard choice in libraries' },
    ],
    examples: [
      {
        title: 'Merge Sort Implementation',
        titleHi: 'Merge Sort Code Example',
        description: 'Divide array into halves, sort recursively, and merge two sorted halves.',
        descriptionHi: 'Array ko do hisson mein tod kar recursively sort aur merge karo.',
        code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // Base case

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10])); // [3, 9, 10, 27, 38, 43, 82]`,
        explanation: 'Merge sort splits log(N) levels deep, and merging each level takes O(N). Total runtime: O(N log N).',
        explanationHi: 'Log(N) levels tak split hota hai aur har level par merge O(N) leta hai. Total: O(N log N).',
      },
    ],
    keyTakeaways: [
      'Insertion sort shines on small (N < 50) or nearly-sorted datasets.',
      'Merge sort guarantees O(N log N) stability at the cost of O(N) extra space.',
      'Quick sort is typically faster in practice due to CPU cache effects.',
    ],
    keyTakeawaysHi: [
      'Chhote ya lagbhag sorted data ke liye Insertion Sort fast hota hai.',
      'Merge sort O(N log N) guarantee karta hai aur stable hota hai.',
      'Quicksort CPU cache locality ki wajah se real world mein kaafi fast hota hai.',
    ],
  },
  'recursion-maze': {
    worldId: 'recursion-maze',
    title: 'Recursion Mirror Maze',
    titleHi: 'Recursion Mirror Maze',
    subtitle: 'Self-similarity, call stack frames, and backtracking exploration',
    subtitleHi: 'Call stack, base cases aur backtracking ka bhool-bhulaiya',
    unlockTile: 10,
    overview: 'Step into the Mirror Maze where functions invoke themselves. Recursion breaks monumental problems into identical smaller subproblems. To navigate the maze safely, you must master base cases to prevent infinite call stack overflows and backtracking to undo fruitless choices.',
    overviewHi: 'Recursion Mirror Maze mein functions khud ko call karte hain. Har recursive function ko ek Base Case chahiye jo use rok sake, aur backtracking jo galat raste se wapas laa sake.',
    concepts: [
      {
        title: 'The Recursion Contract: Base Case & Step',
        titleHi: 'Base Case aur Recursive Step',
        summary: 'Every recursive algorithm must define when to stop and how to shrink input size.',
        summaryHi: 'Har recursive function ko pata hona chahiye kab rukna hai aur problem kaise choti karni hai.',
        bullets: [
          'Base Case: The simplest, trivial scenario solved without further recursive calls.',
          'Recursive Step: Reduces the problem strictly toward the base case.',
          'Missing a base case triggers "RangeError: Maximum call stack size exceeded".',
        ],
        bulletsHi: [
          'Base case sabse choti problem hoti hai jo direct solve ho jaati hai.',
          'Recursive step problem ko base case ki taraf le jaata hai.',
          'Base case na ho toh Stack Overflow error aata hai.',
        ],
      },
      {
        title: 'The Backtracking Blueprint',
        titleHi: 'Backtracking ka Tarika',
        summary: 'Choose an option, explore deeply, and un-choose (revert state) if it leads to a dead end.',
        summaryHi: 'Ek choice chuno, aage badho; agar rasta band ho toh undo karke doosra rasta try karo.',
        bullets: [
          'Three steps: Choose -> Explore -> Un-choose (revert state).',
          'Enables exhaustive search over permutations, combinations, and puzzle boards (N-Queens, Sudoku).',
          'Pruning: Cut off exploration paths early if constraints are already violated.',
        ],
        bulletsHi: [
          'Teen steps: Choose karo -> Explore karo -> Un-choose (wapas aao).',
          'Maze solve karne, permutations aur puzzles ke liye backtracking best hai.',
          'Pruning se galat raste shuru mein hi chhod diye jaate hain.',
        ],
      },
    ],
    complexities: [
      { operation: 'Linear Recursion (e.g., Factorial)', time: 'O(N)', space: 'O(N)', note: 'Stack depth equals N frames' },
      { operation: 'Binary Tree Branching Recursion', time: 'O(2^N)', space: 'O(N)', note: 'Tree height determines peak stack memory' },
      { operation: 'Permutations Backtracking', time: 'O(N!)', space: 'O(N)', note: 'Factorial combinations explored systematically' },
    ],
    examples: [
      {
        title: 'Generating All Subsets (Backtracking)',
        titleHi: 'Subsets Generate Karna (Power Set)',
        description: 'Explore all possible combinations by deciding whether to include or exclude each element.',
        descriptionHi: 'Har element ko include ya exclude karke saare subsets nikalo.',
        code: `function getSubsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const currentPath: number[] = [];

  function backtrack(startIndex: number) {
    result.push([...currentPath]); // Record current snapshot

    for (let i = startIndex; i < nums.length; i++) {
      currentPath.push(nums[i]); // 1. Choose
      backtrack(i + 1);          // 2. Explore
      currentPath.pop();         // 3. Un-choose (backtrack!)
    }
  }

  backtrack(0);
  return result;
}

console.log(getSubsets([1, 2, 3]));
// Outputs 2^3 = 8 subsets: [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]`,
        explanation: 'At each step, we push a number, explore deeper subsets, and pop the number to restore state for sibling branches.',
        explanationHi: 'Number add karte hain, recursion se aage badhte hain, aur phir pop karke state restore karte hain.',
      },
    ],
    keyTakeaways: [
      'Always write and verify your base case first.',
      'Peak stack memory usage is proportional to the maximum depth of the call tree.',
      'Backtracking is depth-first search on a decision tree with state undo.',
    ],
    keyTakeawaysHi: [
      'Pehle hamesha base case likho aur check karo.',
      'Call stack ka memory size recursion tree ki depth ke barabar hota hai.',
      'Backtracking decision tree par DFS hai jisme har step undo hota hai.',
    ],
  },
  'linked-caverns': {
    worldId: 'linked-caverns',
    title: 'Linked List Caverns',
    titleHi: 'Linked List Caverns',
    subtitle: 'Node pointers, reference rewiring, and dynamic chain navigation',
    subtitleHi: 'Pointers, dynamic nodes aur reference rewiring',
    unlockTile: 16,
    overview: 'Deep in the Linked List Caverns, memory is not contiguous. Individual nodes float independently in memory, tethered only by pointer references. Learn to safely rewire chains, detect circular loops without extra memory, and reverse direction in a single pass.',
    overviewHi: 'Linked List Caverns mein data alag-alag nodes mein hota hai jo pointers se jude hote hain. Yahan O(1) head insertion milta hai par random access O(N) ho jaata hai.',
    concepts: [
      {
        title: 'Node Architecture & Pointer References',
        titleHi: 'Node Structure aur References',
        summary: 'A node holds a value payload and a pointer reference pointing to the next node in memory.',
        summaryHi: 'Har node ke paas apni value aur agle node ka memory reference hota hai.',
        bullets: [
          'Head points to the first node; Tail points to null.',
          'Inserting at the head is instant O(1) with zero element shifting.',
          'Reaching the k-th node requires traversing from the head in O(k) steps.',
        ],
        bulletsHi: [
          'Head pehle node ko point karta hai aur Tail null par end hota hai.',
          'Head par insert karna instant O(1) hai, koi shift nahi karna padta.',
          'K-th element tak jaane ke liye head se O(k) kadam chalne padte hain.',
        ],
      },
      {
        title: 'Tortoise & Hare (Floyd’s Cycle Finding)',
        titleHi: 'Cycle Detection (Tortoise & Hare)',
        summary: 'Detect infinite loops in linked lists in O(N) time with O(1) auxiliary space.',
        summaryHi: 'Ek slow aur ek fast pointer se bina extra space ke cycle detect karo.',
        bullets: [
          'Slow pointer advances 1 node per iteration; Fast pointer advances 2 nodes.',
          'If there is a cycle, the fast pointer is guaranteed to lap and collide with the slow pointer.',
          'If fast reaches null, the list is acyclic.',
        ],
        bulletsHi: [
          'Slow pointer 1 step aur Fast pointer 2 steps chalta hai.',
          'Agar cycle hai toh fast pointer ghoom kar slow pointer se zaroor milega.',
          'Agar fast null ho jaye toh koi cycle nahi hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Insert at Head (Prepend)', time: 'O(1)', space: 'O(1)', note: 'Rewire head reference directly' },
      { operation: 'Delete Head Node', time: 'O(1)', space: 'O(1)', note: 'Advance head = head.next' },
      { operation: 'Access / Search by Index', time: 'O(N)', space: 'O(1)', note: 'Must follow references from head sequentially' },
      { operation: 'In-Place Reversal', time: 'O(N)', space: 'O(1)', note: 'Three-pointer technique flips next links' },
    ],
    examples: [
      {
        title: 'In-Place Singly Linked List Reversal',
        titleHi: 'Linked List ko Reverse Karna',
        description: 'Reverse the direction of every pointer using three pointers: prev, current, next.',
        descriptionHi: 'Teen pointers (prev, current, next) se poori list reverse karo bina extra memory ke.',
        code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;

  while (current !== null) {
    const nextTemp = current.next; // 1. Save next node
    current.next = prev;           // 2. Reverse link
    prev = current;                // 3. Move prev forward
    current = nextTemp;            // 4. Move current forward
  }

  return prev; // prev is now the new head!
}`,
        explanation: 'We reverse each link step-by-step. Time Complexity: O(N), Space Complexity: O(1).',
        explanationHi: 'Har pointer ko ek-ek karke piche ki taraf modte hain. Time O(N), Space O(1).',
      },
    ],
    keyTakeaways: [
      'Always cache current.next before changing current.next to avoid severing the rest of the list.',
      'A dummy sentinel head node simplifies edge cases when inserting or deleting nodes at the front.',
      'Floyd’s two-pointer method finds cycles and midpoints in a single pass.',
    ],
    keyTakeawaysHi: [
      'current.next badalne se pehle agla node hamesha temporary variable mein save karo.',
      'Dummy head node use karne se edge cases asaan ho jaate hain.',
      'Floyd’s method se cycle aur midpoint jaldi milte hain.',
    ],
  },
  'structure-tower': {
    worldId: 'structure-tower',
    title: 'Stack and Queue Tower',
    titleHi: 'Stack and Queue Tower',
    subtitle: 'LIFO vs FIFO disciplines, monotonic windows, and parsing pipelines',
    subtitleHi: 'LIFO aur FIFO principles, push, pop, enqueue aur dequeue',
    unlockTile: 19,
    overview: 'The Tower imposes strict discipline upon data access. Stacks enforce Last-In, First-Out (LIFO), creating natural order for undo mechanisms, function execution, and syntax validation. Queues enforce First-In, First-Out (FIFO), the foundation of job processing, message buffers, and breadth-first search.',
    overviewHi: 'Stack and Queue Tower mein strict access rules hote hain. Stack LIFO (Last In First Out) follow karta hai, jabki Queue FIFO (First In First Out) follow karta hai.',
    concepts: [
      {
        title: 'Stack: Last-In, First-Out (LIFO)',
        titleHi: 'Stack: LIFO Principle',
        summary: 'Only the top element can be inspected (peek), added (push), or removed (pop).',
        summaryHi: 'Sirf sabse upar ka item dekha (peek), daala (push), ya nikala (pop) ja sakta hai.',
        bullets: [
          'Push and Pop operations are strictly O(1).',
          'Perfect for balanced parentheses validation, depth-first search, and undo/redo stacks.',
          'Monotonic Stacks keep items in sorted order to find Next Greater Elements in O(N).',
        ],
        bulletsHi: [
          'Push aur Pop dono O(1) constant time mein hote hain.',
          'Parentheses match karne aur undo history ke liye stack best hai.',
          'Monotonic stack se Next Greater Element problem O(N) mein solve hoti hai.',
        ],
      },
      {
        title: 'Queue: First-In, First-Out (FIFO)',
        titleHi: 'Queue: FIFO Principle',
        summary: 'Items enter at the back (enqueue) and leave from the front (dequeue).',
        summaryHi: 'Naye items peeche judte hain (enqueue) aur aage se nikalte hain (dequeue).',
        bullets: [
          'Guarantees fair, sequential processing in order of arrival.',
          'Forms the engine of Breadth-First Search (BFS) level-order explorations.',
          'Circular queues or linked-list queues maintain O(1) dequeues without array shifts.',
        ],
        bulletsHi: [
          'Items jis order mein aate hain usi order mein process hote hain.',
          'Breadth-First Search (BFS) graph aur tree traversal ka main engine hai.',
          'Front se remove karna O(1) hona chahiye.',
        ],
      },
    ],
    complexities: [
      { operation: 'Stack Push / Pop / Peek', time: 'O(1)', space: 'O(1)', note: 'Operates solely on top of stack' },
      { operation: 'Queue Enqueue / Dequeue', time: 'O(1)', space: 'O(1)', note: 'Requires linked list or ring buffer for O(1) dequeue' },
      { operation: 'Monotonic Stack Scan', time: 'O(N)', space: 'O(N)', note: 'Each element pushed and popped at most once' },
    ],
    examples: [
      {
        title: 'Valid Parentheses String Matching',
        titleHi: 'Balanced Brackets Check Karna',
        description: 'Verify if every opening bracket has an appropriate and correctly nested closing bracket.',
        descriptionHi: 'Stack ki madad se check karo ki saare brackets correctly matched hain ya nahi.',
        code: `function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const matching: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char); // Push opening brackets
    } else if (char in matching) {
      if (stack.length === 0 || stack.pop() !== matching[char]) {
        return false; // Mismatched or unmatched closing bracket
      }
    }
  }

  return stack.length === 0; // Valid only if no unclosed brackets remain
}

console.log(isValidParentheses("({[]})")); // true
console.log(isValidParentheses("([)]"));   // false`,
        explanation: 'Because inner brackets must close before outer brackets, a LIFO stack matches the latest open bracket with the current closing bracket.',
        explanationHi: 'Kyunki andar ke brackets pehle band hone chahiye, LIFO stack har closing bracket ko recent opening se match karta hai.',
      },
    ],
    keyTakeaways: [
      'Stacks reverse order; Queues preserve arrival order.',
      'Whenever problem text mentions "nested", "matching", or "undo", think of a Stack.',
      'Whenever problem text mentions "order of arrival", "fair scheduling", or "breadth-first", think of a Queue.',
    ],
    keyTakeawaysHi: [
      'Stack order reverse karta hai; Queue arrival order maintain karta hai.',
      'Jahan nested brackets ya undo ho, wahan Stack socho.',
      'Jahan first-come first-served ya BFS ho, wahan Queue use karo.',
    ],
  },
  'wisdom-tree': {
    worldId: 'wisdom-tree',
    title: 'Tree of Wisdom',
    titleHi: 'Tree of Wisdom',
    subtitle: 'Hierarchical branching, Binary Search Trees, and Heaps',
    subtitleHi: 'Binary Trees, BST traversals aur Heaps',
    unlockTile: 20,
    overview: 'Ascend the Tree of Wisdom, where linear arrays diverge into branching hierarchies. Trees model hierarchical relationships, file systems, syntax parsing, and efficient sorted search spaces. Master In-order, Pre-order, Post-order, Level-order traversals, and Binary Heaps.',
    overviewHi: 'Tree of Wisdom hierarchical data structures ka realm hai. Yahan Binary Search Tree (BST) mein search O(log N) mein hoti hai, aur Heaps priority queue ka kaam karte hain.',
    concepts: [
      {
        title: 'Binary Search Tree (BST) Invariant',
        titleHi: 'Binary Search Tree (BST) Property',
        summary: 'For every node, all left subtree values are smaller, and all right subtree values are larger.',
        summaryHi: 'Har node ke left subtree mein chhoti values aur right subtree mein badi values hoti hain.',
        bullets: [
          'Average search, insert, and delete take O(log N) in balanced trees.',
          'In-order traversal (Left, Root, Right) of a BST yields values in strictly sorted ascending order!',
          'Degenerate BSTs (unbalanced skew into a line) degrade to O(N); AVL or Red-Black balance restores O(log N).',
        ],
        bulletsHi: [
          'Balanced BST mein search, insert aur delete O(log N) lete hain.',
          'BST ka In-order traversal (Left -> Root -> Right) hamesha sorted order deta hai!',
          'Agar tree ek taraf jhuk jaye toh O(N) ho sakta hai, isliye self-balancing zaroori hota hai.',
        ],
      },
      {
        title: 'Tree Traversals (DFS vs BFS)',
        titleHi: 'Tree Traversals: DFS aur BFS',
        summary: 'Techniques to systematically visit every node in a tree exactly once.',
        summaryHi: 'Tree ke har node ko ek baar dekhne ke algorithms.',
        bullets: [
          'Pre-order (Root, Left, Right): Ideal for serialization and deep tree cloning.',
          'In-order (Left, Root, Right): Ideal for BST sorted enumeration.',
          'Post-order (Left, Right, Root): Ideal for bottom-up cleanup, tree deletion, and subtree size computation.',
          'Level-order (BFS): Uses a FIFO queue to visit nodes generation by generation.',
        ],
        bulletsHi: [
          'Pre-order: Root -> Left -> Right (Tree clone karne ke liye).',
          'In-order: Left -> Root -> Right (BST sorted dekhne ke liye).',
          'Post-order: Left -> Right -> Root (Bottom-up calculation ke liye).',
          'Level-order (BFS): Queue ke zariye har level ek saath visit karta hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'BST Search / Insert (Balanced)', time: 'O(log N)', space: 'O(log N)', note: 'Height-bounded tree recursion' },
      { operation: 'BST Search (Unbalanced Worst-Case)', time: 'O(N)', space: 'O(N)', note: 'Skewed tree behaves like a linked list' },
      { operation: 'Tree Traversal (All Nodes)', time: 'O(N)', space: 'O(H)', note: 'Visits every node once; stack memory equals height H' },
      { operation: 'Binary Heap Min/Max Extract', time: 'O(log N)', space: 'O(1)', note: 'Heapify sift-down restoration' },
    ],
    examples: [
      {
        title: 'In-Order Traversal & BST Search',
        titleHi: 'BST In-Order Traversal Code',
        description: 'Traverse a binary search tree to produce sorted items and search for target values.',
        descriptionHi: 'BST mein search karna aur in-order traversal se sorted array nikalna.',
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}

function searchBST(root: TreeNode | null, target: number): TreeNode | null {
  if (root === null || root.val === target) return root;
  if (target < root.val) {
    return searchBST(root.left, target); // Search left subtree
  } else {
    return searchBST(root.right, target); // Search right subtree
  }
}

function inorder(root: TreeNode | null, result: number[] = []): number[] {
  if (root !== null) {
    inorder(root.left, result);  // Left
    result.push(root.val);       // Root
    inorder(root.right, result); // Right
  }
  return result;
}`,
        explanation: 'In-order traversal visits smaller elements before the root, and the root before larger elements, naturally producing sorted output in O(N) time.',
        explanationHi: 'Left subtree root se pehle aur root right se pehle visit hota hai, jisse naturally sorted result milta hai.',
      },
    ],
    keyTakeaways: [
      'In a BST, In-order traversal is your secret weapon to get sorted data.',
      'Tree height H determines operational efficiency: log(N) when balanced, N when degenerate.',
      'Heaps allow O(1) peek of minimum/maximum with O(log N) updates.',
    ],
    keyTakeawaysHi: [
      'BST ka In-order traversal sorted array deta hai.',
      'Tree ki height H performance decide karti hai (balanced mein log N).',
      'Heap se sabse badi ya chhoti value O(1) mein milti hai.',
    ],
  },
  'graph-portal': {
    worldId: 'graph-portal',
    title: 'Graph Portal',
    titleHi: 'Graph Portal',
    subtitle: 'Vertices, edges, network connectivity, and shortest path finding',
    subtitleHi: 'Networks, BFS, DFS aur shortest path algorithms',
    unlockTile: 24,
    overview: 'Pass through the Graph Portal, where any node can connect to any other. Graphs model complex interconnected networks — road maps, social graphs, internet routing, and dependency compilation. Master Adjacency Lists, BFS shortest paths, DFS connectivity, and Dijkstra.',
    overviewHi: 'Graph Portal mein har node doosre node se connect ho sakta hai. Yahan Adjacency Lists, BFS shortest paths, DFS components aur Dijkstra seekhne ko milta hai.',
    concepts: [
      {
        title: 'Graph Representations: List vs Matrix',
        titleHi: 'Graph Representation: List vs Matrix',
        summary: 'How graphs are encoded into data structures in memory.',
        summaryHi: 'Graph ko memory mein store karne ke do main tarike.',
        bullets: [
          'Adjacency List: Map or Array of lists mapping each vertex to its immediate neighbors. Optimal space O(V + E) for real-world sparse graphs.',
          'Adjacency Matrix: V x V 2D grid. Fast O(1) edge existence query, but consumes heavy O(V²) memory.',
        ],
        bulletsHi: [
          'Adjacency List: Har node ke paas uske neighbors ki list hoti hai (Space O(V+E)). Real world ke liye best.',
          'Adjacency Matrix: V x V table jo O(V²) memory leti hai.',
        ],
      },
      {
        title: 'BFS for Shortest Paths in Unweighted Graphs',
        titleHi: 'BFS: Shortest Path ka Guarnatee',
        summary: 'Breadth-First Search radiates outward in concentric rings, guaranteeing shortest unweighted distance.',
        summaryHi: 'BFS concentric layers mein aage badhta hai, isliye unweighted graph mein shortest path deta hai.',
        bullets: [
          'Uses a FIFO queue and a visited Set to avoid getting trapped in cycles.',
          'The first time BFS visits a target node, it has reached it via the fewest possible edges.',
          'Time complexity: O(V + E) where V is vertices and E is edges.',
        ],
        bulletsHi: [
          'FIFO queue aur Visited set ka use hota hai taaki cycle mein na phasein.',
          'Jab pehli baar target milta hai, woh minimum edges wala shortest path hota hai.',
          'Time Complexity: O(V + E).',
        ],
      },
    ],
    complexities: [
      { operation: 'Breadth-First Search (BFS)', time: 'O(V + E)', space: 'O(V)', note: 'Queue + visited set for unweighted shortest path' },
      { operation: 'Depth-First Search (DFS)', time: 'O(V + E)', space: 'O(V)', note: 'Call stack for component discovery and cycle detection' },
      { operation: 'Dijkstra (Weighted Shortest Path)', time: 'O((V + E) log V)', space: 'O(V)', note: 'Min-priority queue for non-negative weights' },
      { operation: 'Topological Sort (DAG)', time: 'O(V + E)', space: 'O(V)', note: 'Linear ordering of dependencies using Kahn’s BFS or DFS' },
    ],
    examples: [
      {
        title: 'Shortest Path with BFS in an Unweighted Graph',
        titleHi: 'BFS se Shortest Path Dhoondhna',
        description: 'Find the minimum distance (number of edges) between two nodes in a graph.',
        descriptionHi: 'BFS ke zariye do nodes ke beech ka shortest distance nikalo.',
        code: `function shortestPathBFS(graph: Record<string, string[]>, start: string, target: string): number {
  if (start === target) return 0;

  const queue: [string, number][] = [[start, 0]]; // [node, distance]
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const [current, dist] = queue.shift()!;

    for (const neighbor of graph[current] || []) {
      if (neighbor === target) {
        return dist + 1; // Found target in fewest edge transitions!
      }
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }

  return -1; // Target unreachable
}

const network = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};
console.log(shortestPathBFS(network, 'A', 'F')); // Output: 2 (A -> C -> F)`,
        explanation: 'BFS explores distance 1 neighbors before distance 2 neighbors. The first time the destination is dequeued or discovered, that distance is guaranteed to be minimal.',
        explanationHi: 'BFS pehle distance 1 wale dekhta hai phir distance 2 wale. Isliye pehli baar target milte hi shortest path pakka hota hai.',
      },
    ],
    keyTakeaways: [
      'Always maintain a visited Set to prevent infinite loops in cyclic graphs.',
      'For unweighted shortest path, use BFS; for weighted shortest path with positive weights, use Dijkstra.',
      'Adjacency Lists are the default choice in competitive programming and production systems.',
    ],
    keyTakeawaysHi: [
      'Infinite loops se bachne ke liye hamesha Visited Set use karo.',
      'Unweighted graph mein BFS shortest path deta hai; weighted mein Dijkstra use karo.',
      'Adjacency List memory efficient hoti hai.',
    ],
  },
  'dp-realm': {
    worldId: 'dp-realm',
    title: 'Dynamic Programming Realm',
    titleHi: 'Dynamic Programming Realm',
    subtitle: 'Overlapping subproblems, state transitions, memoization and tabulation',
    subtitleHi: 'Memoization, tabulation aur state transitions ka shikhar',
    unlockTile: 29,
    overview: 'Welcome to the summit of algorithmic mastery: the Dynamic Programming Realm. DP resolves problems exhibiting Optimal Substructure and Overlapping Subproblems. By caching intermediate subproblem solutions, exponential O(2^N) brute-force searches collapse into linear or polynomial O(N) runtimes.',
    overviewHi: 'Dynamic Programming Realm algorithms ka sabse powerful realm hai. Yahan Optimal Substructure aur Overlapping Subproblems wali problems ko memoization aur tabulation se super fast banaya jata hai.',
    concepts: [
      {
        title: 'The Two Pillars of Dynamic Programming',
        titleHi: 'DP ke Do Mukhya Pillars',
        summary: 'A problem is solvable by DP if and only if it exhibits both characteristics.',
        summaryHi: 'DP tabhi lagti hai jab problem mein ye do cheezein hon.',
        bullets: [
          'Optimal Substructure: The optimal solution to the problem can be constructed from optimal solutions to its smaller subproblems.',
          'Overlapping Subproblems: The same subproblems are computed over and over again during naive recursive evaluation.',
        ],
        bulletsHi: [
          'Optimal Substructure: Badi problem ka best solution chhote subproblems ke best solutions se banta hai.',
          'Overlapping Subproblems: Wahi subproblems bar-bar repeat hote hain.',
        ],
      },
      {
        title: 'Memoization (Top-Down) vs Tabulation (Bottom-Up)',
        titleHi: 'Memoization vs Tabulation',
        summary: 'Two approaches to caching subproblem solutions to prevent recomputation.',
        summaryHi: 'Subproblem answers ko save karke recomputation se bachne ke do raste.',
        bullets: [
          'Top-Down (Memoization): Keep the natural recursion, but store results in a cache (Hashmap / Array). Compute on demand.',
          'Bottom-Up (Tabulation): Fill a table iteratively starting from base cases (dp[0], dp[1], ...). Avoids recursion stack overhead and enables space optimization.',
        ],
        bulletsHi: [
          'Top-Down (Memoization): Natural recursion ke saath cache use karo. Jo calculate ho gaya use save karo.',
          'Bottom-Up (Tabulation): Loop se base cases se start karke aage table bharo. Recursion stack nahi lagta.',
        ],
      },
    ],
    complexities: [
      { operation: 'Naive Recursive Fibonacci', time: 'O(2^N)', space: 'O(N)', note: 'Explodes exponentially with duplicate work' },
      { operation: 'Memoized Top-Down Fibonacci', time: 'O(N)', space: 'O(N)', note: 'Linear subproblems solved once' },
      { operation: 'Tabulated Bottom-Up (Optimized)', time: 'O(N)', space: 'O(1)', note: 'Only keeps previous two variables in memory' },
      { operation: '0/1 Knapsack Problem', time: 'O(N x W)', space: 'O(W)', note: 'Pseudo-polynomial dynamic programming table' },
    ],
    examples: [
      {
        title: 'Fibonacci: Naive O(2^N) to O(N) Tabulation',
        titleHi: 'Fibonacci DP: Tabulation Method',
        description: 'Eliminate duplicate recursion calculations using iterative bottom-up state transition.',
        descriptionHi: 'Bottom-up DP se exponential O(2^N) ko linear O(N) aur constant O(1) space mein convert karo.',
        code: `// Space-optimized Bottom-Up Tabulation: O(N) time, O(1) space
function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let prev2 = 0; // fib(0)
  let prev1 = 1; // fib(1)

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2; // State transition: dp[i] = dp[i-1] + dp[i-2]
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

console.log(fibonacci(10)); // 55
console.log(fibonacci(50)); // 12586269025 (computes in < 1 millisecond!)`,
        explanation: 'Instead of recomputing fib(n - 2) thousands of times in a branching tree, we iterate from 2 up to n, maintaining only the last two computed values.',
        explanationHi: 'Hazaron baar wahi number calculate karne ke bajay hum pichhle do numbers ko add karte hue aage badhte hain. O(N) time, O(1) space.',
      },
      {
        title: '0/1 Knapsack Decision Transition',
        titleHi: '0/1 Knapsack Problem',
        description: 'Maximize value without exceeding weight capacity W with binary item choices.',
        descriptionHi: 'Weight capacity ke andar maximum value achieve karo.',
        code: `function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  // dp[w] stores max value with capacity w
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    // Iterate backwards to ensure each item is used at most once
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }

  return dp[capacity];
}

console.log(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)); // Output: 9`,
        explanation: 'For each item, we decide either to skip it or take it if weight permits. Backward iteration keeps memory down to a single array of size W.',
        explanationHi: 'Har item ke liye choice hoti hai: use lo ya chhodo. Reverse loop se 1D array mein hi answer aa jata hai.',
      },
    ],
    keyTakeaways: [
      'Step 1: Define what dp[i] represents in plain English.',
      'Step 2: Formulate the recurrence relation connecting dp[i] to earlier states.',
      'Step 3: Identify base cases and iteration direction.',
    ],
    keyTakeawaysHi: [
      'Pehle shabdon mein likho ki dp[i] kya represent karta hai.',
      'Recurrence formula banao jo pichhle states ko jode.',
      'Base cases aur loop ki direction decide karo.',
    ],
  },
}
