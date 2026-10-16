export type CodeExample = {
  title: string
  titleHi: string
  description: string
  descriptionHi: string
  code: string
  output?: string
  explanation: string
  explanationHi: string
}

export type KeyConcept = {
  title: string
  titleHi: string
  content: string
  contentHi: string
  points: string[]
  pointsHi: string[]
}

export type ComplexityDetail = {
  operation: string
  time: string
  space: string
  note: string
}

export type SubtopicTheory = {
  moduleId: string
  moduleTitle: string
  moduleTitleHi: string
  subtopicTitle: string
  subtopicTitleHi: string
  estimatedTime: string
  overview: string
  overviewHi: string
  concepts: KeyConcept[]
  complexities?: ComplexityDetail[]
  examples: CodeExample[]
  pitfalls: string[]
  pitfallsHi: string[]
  takeaways: string[]
  takeawaysHi: string[]
}

export const CURRICULUM_THEORY: Record<string, SubtopicTheory> = {
  // ==========================================
  // MODULE 1: PROGRAMMING BASICS
  // ==========================================
  'basics:Variables & data types': {
    moduleId: 'basics',
    moduleTitle: 'Programming basics',
    moduleTitleHi: 'Programming ki basics',
    subtopicTitle: 'Variables & data types',
    subtopicTitleHi: 'Variables aur Data Types',
    estimatedTime: '8 min',
    overview: 'Variables are designated containers in memory that hold data values during program execution. Understanding how primitive types and reference types differ in memory allocation is the cornerstone of writing bug-free algorithms.',
    overviewHi: 'Variables memory mein store kiye gaye named boxes hain jo program ke chalte waqt data hold karte hain. Primitive aur Reference types memory mein kaise kaam karte hain, ye samajhna DSA ke liye sabse pehla kadam hai.',
    concepts: [
      {
        title: 'Primitive Types vs Reference Types',
        titleHi: 'Primitive vs Reference Types',
        content: 'Primitive types (numbers, strings, booleans, null, undefined) store values directly on the call stack. Reference types (arrays, objects) store a pointer on the stack pointing to data on the heap memory.',
        contentHi: 'Primitive types (numbers, booleans, strings) direct value stack par store karte hain. Reference types (objects, arrays) stack par ek memory address pointer rakhte hain jo heap ko point karta hai.',
        points: [
          'Primitives are immutable and copied by VALUE: modifying one variable never alters another.',
          'Objects and arrays are copied by REFERENCE: multiple variables can point to the same underlying memory block.',
          'Shallow copies (e.g. [...arr] or Object.assign) copy references of nested objects, while deep copies create entirely independent clones.',
        ],
        pointsHi: [
          'Primitives value se copy hote hain: ek variable badalne se doosra nahi badalta.',
          'Objects aur arrays reference se copy hote hain: ek ko badla toh doosra bhi badal jayega.',
          'Shallow copy sirf top-level elements ko naya banati hai, nested objects wahi rehte hain.',
        ],
      },
      {
        title: 'Mutability & Variable Declarations (const vs let)',
        titleHi: 'const vs let aur Mutability',
        content: 'Choosing proper declarations prevents unintentional reassignments and establishes clear programmer intent.',
        contentHi: 'Sahi variable declaration code ko safe banata hai aur bugs se bachata hai.',
        points: [
          'const prevents re-binding the variable name to a new memory reference.',
          'Note: const does NOT make objects or arrays immutable (their properties and elements can still be mutated).',
          'let allows reassignment and is scoped to the enclosing block {}. Avoid legacy var due to hoisting pitfalls.',
        ],
        pointsHi: [
          'const variable ko nayi value re-assign hone se rokta hai.',
          'Dhyan dein: const array ya object ke elements ko mutate hone se nahi rokta.',
          'let block-scoped hota hai aur loop counters ke liye best hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Primitive Read / Write', time: 'O(1)', space: 'O(1)', note: 'Direct CPU stack register lookup' },
      { operation: 'Reference Copy (pointer)', time: 'O(1)', space: 'O(1)', note: 'Only copies the 64-bit memory address' },
      { operation: 'Array / Object Shallow Clone', time: 'O(N)', space: 'O(N)', note: 'Allocates new memory for all N top-level items' },
    ],
    examples: [
      {
        title: 'Value Copy vs Reference Copy Demo',
        titleHi: 'Value vs Reference Copy ka Asar',
        description: 'Demonstrating why modifying an array reference mutates both variables, unlike primitive numbers.',
        descriptionHi: 'Dekhein kaise array reference copy karne par dono variables ek hi memory ko update karte hain.',
        code: `// 1. Primitive copy (Independent)
let scoreA = 100;
let scoreB = scoreA; // Copied by value
scoreB = 250;
console.log(scoreA); // Output: 100 (unaffected!)

// 2. Reference copy (Shared memory!)
const originalArray = [10, 20, 30];
const sharedArray = originalArray; // Copied by reference pointer
sharedArray.push(99);
console.log(originalArray); // Output: [10, 20, 30, 99] (both changed!)

// 3. Safe clone using spread operator
const independentArray = [...originalArray];
independentArray.push(500);
console.log(originalArray);    // [10, 20, 30, 99]
console.log(independentArray); // [10, 20, 30, 99, 500]`,
        output: 'scoreA remains 100, originalArray reflects 99, independentArray has 500',
        explanation: 'Because objects and arrays reside in heap memory, assignment transfers only the pointer address. Modifying through one reference changes the shared memory.',
        explanationHi: 'Kyunki objects heap memory mein rehte hain, assignment sirf pointer copy karta hai. Isliye kisi bhi variable se update karne par dono jagah change dikhta hai.',
      },
    ],
    pitfalls: [
      'Assuming const prevents mutating array elements or object keys.',
      'Comparing objects with === (checks reference equality, not content equality; [] === [] is always false).',
      'Accidentally mutating function input arguments instead of creating a copy.',
    ],
    pitfallsHi: [
      'Ye sochna ki const array ke elements ko badalne se rok lega.',
      'Do alag arrays ko === se compare karna ([] === [] hamesha false hota hai).',
      'Function ke input array ko galti se mutate kar dena.',
    ],
    takeaways: [
      'Default to const; only use let when a variable must be reassigned.',
      'Use the spread operator [...arr] when you need an independent array copy.',
      'Primitives are stored by value; compound data structures are stored by reference.',
    ],
    takeawaysHi: [
      'Hamesha const use karein; jab reassign karna ho tabhi let lagayein.',
      'Naya independent array banane ke liye [...arr] spread operator use karein.',
      'Primitives value se aur arrays/objects reference se store hote hain.',
    ],
  },

  'basics:Conditions and loops': {
    moduleId: 'basics',
    moduleTitle: 'Programming basics',
    moduleTitleHi: 'Programming ki basics',
    subtopicTitle: 'Conditions and loops',
    subtopicTitleHi: 'Conditions aur Loops',
    estimatedTime: '12 min',
    overview: 'Control flow structures steer program execution. Conditionals choose which code paths to execute based on Boolean predicates, while loops repeat execution until termination invariants are satisfied.',
    overviewHi: 'Control flow program ke chalne ka rasta tay karta hai. If-else se faisla hota hai ki kaunsa code execute ho, aur loops ek hi kaam ko baar-baar repeat karne mein madad karte hain.',
    concepts: [
      {
        title: 'Conditional Branching & Guard Clauses',
        titleHi: 'Conditionals aur Guard Clauses',
        content: 'Structure conditions to handle edge cases and invalid inputs first (guard clauses) to avoid deeply nested code.',
        contentHi: 'Guard clauses use karke pehle invalid cases aur base cases handle karo taaki code simple aur clean rahe.',
        points: [
          'Strict equality === checks both type and value without unexpected type coercion.',
          'Short-circuit evaluation: In (A && B), if A is false, B is never evaluated. In (A || B), if A is true, B is skipped.',
          'Guard clauses return early, keeping the happy path linear and legible without 5 levels of nested if-statements.',
        ],
        pointsHi: [
          '=== value aur type dono check karta hai, bina kisi unexpected conversion ke.',
          'Short-circuiting: (false && anything) mein agla part run nahi hota.',
          'Pehle hi invalid inputs par return karke deep nesting se bacha jata hai.',
        ],
      },
      {
        title: 'Loops, Invariants & Boundary Safety',
        titleHi: 'Loops aur Boundary Safety',
        content: 'Loops repeat code across a range or condition. The critical requirement is a guaranteed termination condition.',
        contentHi: 'Loop ka sabse zaroori niyam hai ki uski termination condition hamesha hit honi chahiye.',
        points: [
          'For loops: best for known bounds (0 to N - 1).',
          'While loops: best when the number of iterations depends on runtime events or condition convergence.',
          'Off-by-one errors: Arrays of length N have indices 0 to N - 1. Loop must check i < N, NOT i <= N.',
        ],
        pointsHi: [
          'For loop tab use karo jab counting pehle se pata ho (0 se N - 1).',
          'While loop tab best hai jab condition ke hisaab se rukna ho.',
          'Off-by-one error se bacho: array length N ke liye i < N use karo.',
        ],
      },
    ],
    complexities: [
      { operation: 'Conditional Check (if / switch)', time: 'O(1)', space: 'O(1)', note: 'Direct boolean branching' },
      { operation: 'Linear Loop (1 to N)', time: 'O(N)', space: 'O(1)', note: 'Executes body N times' },
      { operation: 'Nested Loop (N outer x M inner)', time: 'O(N * M)', space: 'O(1)', note: 'Multiplies iterations; can become a bottleneck' },
    ],
    examples: [
      {
        title: 'Guard Clauses & Safe Sum Loop',
        titleHi: 'Guard Clauses aur Loop Example',
        description: 'Using early return to guard against empty input, then accumulating with a loop.',
        descriptionHi: 'Khali array ko pehle hi guard clause se handle karo, phir loop se sum nikalo.',
        code: `function sumPositiveNumbers(nums: number[]): number {
  // 1. Guard clause: Handle empty or invalid input immediately
  if (!nums || nums.length === 0) return 0;

  let total = 0;
  
  // 2. Linear traversal with loop control
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0) {
      continue; // Skip negative numbers and zero
    }
    total += nums[i];
  }

  return total;
}

console.log(sumPositiveNumbers([10, -5, 20, -1, 30])); // Output: 60`,
        output: '60',
        explanation: 'The function returns early if input is invalid. Inside the loop, continue skips non-positive items in O(N) time.',
        explanationHi: 'Invalid input par function pehle hi return kar deta hai. Loop ke andar continue negative numbers ko skip karta hai.',
      },
    ],
    pitfalls: [
      'Writing <= array.length which attempts to access undefined past the array bound.',
      'Forgetting to increment the pointer in a while loop, triggering an infinite freeze.',
      'Using == instead of ===, leading to unexpected truthy coercions (e.g., 0 == "").',
    ],
    pitfallsHi: [
      'i <= array.length likhna jo array ke bahar undefined access karta hai.',
      'While loop mein counter increment karna bhool jana, jisse infinite loop ban jata hai.',
      '== use karne se unexpected type conversion bugs aana.',
    ],
    takeaways: [
      'Write guard clauses at the top of functions for early exits.',
      'Array bounds are strictly 0 <= index < length.',
      'Check loop termination invariants before running.',
    ],
    takeawaysHi: [
      'Function ke top par guard clauses lagakar code clean rakhein.',
      'Valid array index hamesha 0 se length - 1 hota hai.',
      'Loop chalane se pehle check karein ki rukne ka raasta pakka hai.',
    ],
  },

  'basics:Functions, step by step': {
    moduleId: 'basics',
    moduleTitle: 'Programming basics',
    moduleTitleHi: 'Programming ki basics',
    subtopicTitle: 'Functions, step by step',
    subtopicTitleHi: 'Functions, Step by Step',
    estimatedTime: '10 min',
    overview: 'Functions are reusable, isolated units of logic. Mastering parameter passing, return semantics, scope isolation, and higher-order composition transforms sprawling scripts into modular, testable software.',
    overviewHi: 'Functions reusable logic blocks hote hain jo inputs lete hain aur calculated output dete hain. Scope, parameters aur return values ko achhi tarah samajhna algorithms ke liye zaroori hai.',
    concepts: [
      {
        title: 'Execution Call Stack & Activation Frames',
        titleHi: 'Call Stack aur Stack Frames',
        content: 'When a function is called, the JavaScript engine pushes an activation frame containing parameters and local variables onto the call stack.',
        contentHi: 'Jab function call hota hai, toh call stack par ek naya frame banta hai jisme parameters aur local variables rehte hain.',
        points: [
          'LIFO execution: The currently executing function sits at the top of the stack.',
          'When return is evaluated, the frame is popped, and control returns to the caller with the result value.',
          'Local variables exist only during frame lifetime, preventing cross-function pollution.',
        ],
        pointsHi: [
          'Stack LIFO rule follow karta hai: sabse naya function top par rehta hai.',
          'Return hit hote hi frame stack se nikal jaata hai aur caller ko result milta hai.',
          'Local variables function ke bahar access nahi ho sakte.',
        ],
      },
      {
        title: 'Pure Functions vs Side Effects',
        titleHi: 'Pure Functions aur Side Effects',
        content: 'A pure function produces the same output for the same arguments and causes zero observable side effects.',
        contentHi: 'Pure function wahi hai jo same input par hamesha same output de aur bahar ki kisi cheez ko mutate na kare.',
        points: [
          'Side effects include mutating global variables, changing input arrays in-place, or modifying external state.',
          'Pure functions are deterministic, easy to test, and safe to parallelize or memoize.',
        ],
        pointsHi: [
          'Side effects ka matlab bahar ke variables ya input arrays ko mutate karna hota hai.',
          'Pure functions test karne mein asaan hote hain aur caching (memoization) ke liye perfect hain.',
        ],
      },
    ],
    complexities: [
      { operation: 'Function Call & Return', time: 'O(1)', space: 'O(1)', note: 'Stack pointer adjustment and frame creation' },
      { operation: 'Higher-Order Map/Filter (N elements)', time: 'O(N)', space: 'O(N)', note: 'Iterates array and builds new result' },
    ],
    examples: [
      {
        title: 'Pure Function vs Impure Mutation',
        titleHi: 'Pure vs Impure Function Code',
        description: 'Comparing a pure function that returns a new array with an impure function that corrupts external state.',
        descriptionHi: 'Dekhein kaise pure function naya array return karta hai bina original ko kharab kiye.',
        code: `// ❌ IMPURE: Mutates the caller's array directly
function addBonusImpure(scores: number[], bonus: number): void {
  for (let i = 0; i < scores.length; i++) {
    scores[i] += bonus; // Mutating input directly!
  }
}

// ✅ PURE: Returns a new array, keeping original untouched
function addBonusPure(scores: number[], bonus: number): number[] {
  return scores.map(score => score + bonus);
}

const originalScores = [70, 85, 90];
const updated = addBonusPure(originalScores, 10);

console.log(originalScores); // [70, 85, 90] (Preserved!)
console.log(updated);        // [80, 95, 100] (New result)`,
        output: 'Original remains [70, 85, 90], updated is [80, 95, 100]',
        explanation: 'Pure functions preserve data integrity. Callers can safely pass arrays without worrying about surprise mutations.',
        explanationHi: 'Pure functions se original data safe rehta hai, isliye code mein unexpected bugs nahi aate.',
      },
    ],
    pitfalls: [
      'Forgetting the return keyword, which causes the function to implicitly return undefined.',
      'Mutating argument objects/arrays inside helper functions without caller awareness.',
      'Relying on global variables instead of passing arguments explicitly.',
    ],
    pitfallsHi: [
      'return statement likhna bhool jana (jisse function undefined return karta hai).',
      'Function ke andar original input array ko bina bataye mutate kar dena.',
      'Arguments pass karne ke bajay global variables par depend karna.',
    ],
    takeaways: [
      'Strive for pure functions whenever writing algorithmic logic.',
      'Every function should have a single, well-defined responsibility.',
      'Remember that return immediately exits the function and hands back a value.',
    ],
    takeawaysHi: [
      'DSA algorithms mein pure functions likhne ki koshish karein.',
      'Har function ka ek hi clear kaam hona chahiye.',
      'return milte hi function usi waqt khatam ho jata hai.',
    ],
  },

  // ==========================================
  // MODULE 2: ARRAYS & STRINGS
  // ==========================================
  'arrays:Array fundamentals': {
    moduleId: 'arrays',
    moduleTitle: 'Arrays & strings',
    moduleTitleHi: 'Arrays aur strings',
    subtopicTitle: 'Array fundamentals',
    subtopicTitleHi: 'Array Fundamentals',
    estimatedTime: '8 min',
    overview: 'Arrays are the bedrock of sequential data structures. Because array elements occupy contiguous memory slots, any element can be read in instantaneous O(1) time via its mathematical index formula.',
    overviewHi: 'Arrays lagatar memory slots mein elements rakhte hain. Contiguous memory ki wajah se kisi bhi index par direct jump karke value O(1) time mein read ki ja sakti hai.',
    concepts: [
      {
        title: 'Memory Contiguity & The O(1) Access Formula',
        titleHi: 'Memory Contiguity aur Index Formula',
        content: 'The CPU computes the exact memory address of any element instantaneously without traversing prior items.',
        contentHi: 'CPU ko agle elements traverse nahi karne padte; direct address formula se location mil jaati hai.',
        points: [
          'Address Formula: Address(i) = BaseAddress + (i * ElementSizeInBytes).',
          'Zero-indexing represents the offset distance from the beginning of the memory block.',
          'Random access is O(1) time regardless of whether the array has 5 or 5,000,000 elements.',
        ],
        pointsHi: [
          'Memory address = BaseAddress + i * ElementSize.',
          'Zero index ka matlab shuruwat se kitni doori (offset) hai.',
          'Index access hamesha O(1) hota hai chahe array kitna bhi bada ho.',
        ],
      },
      {
        title: 'Insertion & Deletion Shifts',
        titleHi: 'Insert aur Delete ka Shift Cost',
        content: 'Adding or removing elements anywhere other than the end requires shifting adjacent elements to maintain contiguity.',
        contentHi: 'End ke alawa kisi bhi jagah insert ya delete karne par baaki elements ko aage ya peeche khiskana padta hai.',
        points: [
          'Insert at tail (push): O(1) amortized.',
          'Insert at head (unshift): O(N) because all N existing elements must shift right by 1 index.',
          'Delete from head (shift): O(N) because all N - 1 items must shift left.',
        ],
        pointsHi: [
          'Aakhiri mein add karna (push) O(1) amortized hai.',
          'Shuru mein add karna (unshift) O(N) leta hai kyunki sabhi elements aage khisakte hain.',
          'Shuru se hatana (shift) bhi O(N) leta hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Access by Index: arr[i]', time: 'O(1)', space: 'O(1)', note: 'Constant time memory offset calculation' },
      { operation: 'Append to Tail: push()', time: 'O(1)*', space: 'O(1)', note: 'Amortized constant time' },
      { operation: 'Insert at Head / Index K', time: 'O(N)', space: 'O(1)', note: 'Shifts subsequent elements' },
      { operation: 'Linear Search: indexOf()', time: 'O(N)', space: 'O(1)', note: 'Unsorted scan of every element' },
    ],
    examples: [
      {
        title: 'In-Place Array Reversal',
        titleHi: 'Array ko In-Place Reverse Karna',
        description: 'Reversing an array without allocating a secondary array by swapping symmetric indices.',
        descriptionHi: 'Bina extra memory liye array ke elements ko aapas mein swap karke reverse karo.',
        code: `function reverseInPlace(arr: number[]): void {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap elements at left and right
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left++;
    right--;
  }
}

const numbers = [10, 20, 30, 40, 50];
reverseInPlace(numbers);
console.log(numbers); // Output: [50, 40, 30, 20, 10]`,
        output: '[50, 40, 30, 20, 10]',
        explanation: 'We iterate N/2 times swapping elements from both edges inward. Time Complexity: O(N), Space Complexity: O(1) auxiliary.',
        explanationHi: 'Hum dono kinaron se elements swap karte hue beech tak aate hain. Time O(N) aur Space O(1).',
      },
    ],
    pitfalls: [
      'Using unshift() or splice(0, 1) inside a loop, unintentionally creating an O(N²) quadratic disaster.',
      'Forgetting that array indices start at 0, resulting in off-by-one errors.',
    ],
    pitfallsHi: [
      'Loop ke andar unshift() ya splice() use karna jisse program slow (O(N²)) ho jaye.',
      'Index 0 se shuru hota hai ye bhool kar length tak loop chalana.',
    ],
    takeaways: [
      'Arrays are ideal when you need instant O(1) index lookups.',
      'Append at the end is O(1); insert at the beginning is O(N).',
      'In-place index swaps save memory compared to creating new arrays.',
    ],
    takeawaysHi: [
      'Fast random access ke liye Arrays sabse best hain.',
      'End mein insert O(1) hai, par front mein O(N) lagta hai.',
      'In-place swap extra memory bachata hai.',
    ],
  },

  'arrays:Two pointers': {
    moduleId: 'arrays',
    moduleTitle: 'Arrays & strings',
    moduleTitleHi: 'Arrays aur strings',
    subtopicTitle: 'Two pointers',
    subtopicTitleHi: 'Two Pointers Technique',
    estimatedTime: '12 min',
    overview: 'The Two-Pointer technique is one of the highest-yield interview patterns. By coordinating two index references moving across an array, you eliminate redundant nested loops and reduce quadratic O(N²) brute-force searches to single-pass linear O(N) solutions.',
    overviewHi: 'Two Pointers technique interview problems ka sabse popular pattern hai. Do pointers ko ek saath move karke O(N²) nested loops ko O(N) linear time mein badal diya jata hai.',
    concepts: [
      {
        title: 'Opposite-Direction Pointers (Inward Convergence)',
        titleHi: 'Opposite-Direction Pointers',
        content: 'One pointer starts at index 0 and another at index N - 1, converging toward the middle based on conditions.',
        contentHi: 'Ek pointer shuruwat (0) par aur doosra aakhiri (N-1) par hota hai, jo beech ki taraf badhte hain.',
        points: [
          'Best suited for sorted arrays or symmetric properties (e.g. Palindrome verification, Sorted Two Sum).',
          'Monotonic condition: In a sorted array, moving the left pointer rightward strictly increases the sum; moving right leftward strictly decreases it.',
          'Guarantees that each element is inspected at most once, achieving O(N) time with O(1) space.',
        ],
        pointsHi: [
          'Sorted arrays aur palindromes ke liye best pattern hai.',
          'Sorted array mein: left badhane se sum badhta hai, right ghataney se sum ghata hai.',
          'Har element max ek baar check hota hai, isliye O(N) time aur O(1) space.',
        ],
      },
      {
        title: 'Equi-Direction Pointers (Fast & Slow Runners)',
        titleHi: 'Fast aur Slow Pointers',
        content: 'Both pointers move in the same direction, with the fast pointer scanning while the slow pointer tracks the boundary of valid data.',
        contentHi: 'Dono pointers aage ki taraf chalte hain; fast pointer scan karta hai aur slow pointer valid data ko place karta hai.',
        points: [
          'Used for in-place deduplication, partition filtering, and sliding windows.',
          'Eliminates the need for secondary output arrays, solving problems in-place with O(1) space.',
        ],
        pointsHi: [
          'Duplicates hatane aur in-place filter karne ke liye use hota hai.',
          'Bina naya array banaye existing array ko hi O(1) space mein modify karta hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Opposite Two Pointers', time: 'O(N)', space: 'O(1)', note: 'Pointers meet in at most N steps' },
      { operation: 'Fast & Slow Runner', time: 'O(N)', space: 'O(1)', note: 'Fast pointer sweeps array exactly once' },
    ],
    examples: [
      {
        title: 'Two Sum in Sorted Array',
        titleHi: 'Sorted Two Sum Example',
        description: 'Find two numbers that add to a target in O(N) time and O(1) space.',
        descriptionHi: 'Sorted array mein do numbers dhoondho jinka sum target ke barabar ho.',
        code: `function twoSumSorted(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left, right]; // Found exact pair!
    } else if (sum < target) {
      left++;  // Sum too small -> advance left pointer
    } else {
      right--; // Sum too large -> decrement right pointer
    }
  }

  return null; // No pair exists
}

console.log(twoSumSorted([2, 7, 11, 15, 20], 22)); // Output: [0, 4] (2 + 20 = 22)`,
        output: '[0, 4]',
        explanation: 'Because the array is sorted, we eliminate an entire row or column of search space on every comparison, finishing in linear O(N) time.',
        explanationHi: 'Array sorted hone ki wajah se har step par aadha search space discard ho jata hai. Total time O(N) aur memory O(1).',
      },
      {
        title: 'Remove Duplicates from Sorted Array In-Place',
        titleHi: 'Sorted Array se Duplicates Hatana',
        description: 'Using fast and slow pointers to keep only unique elements at the front of the array.',
        descriptionHi: 'Fast aur slow pointer ki madad se bina naya array banaye unique elements rakho.',
        code: `function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let slow = 0; // Boundary of unique elements

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast]; // Write next unique item
    }
  }

  return slow + 1; // Length of unique prefix
}

const arr = [1, 1, 2, 2, 3, 4, 4];
const len = removeDuplicates(arr);
console.log(arr.slice(0, len)); // Output: [1, 2, 3, 4]`,
        output: '[1, 2, 3, 4]',
        explanation: 'Slow advances only when fast encounters a novel element. All operations are in-place in O(N) time and O(1) memory.',
        explanationHi: 'Slow tabhi aage badhta hai jab fast ko naya number milta hai. O(N) time aur O(1) memory.',
      },
    ],
    pitfalls: [
      'Applying two-pointer sum to an UNSORTED array (you must sort it first or use a Hash Set).',
      'Using left <= right when the problem prohibits using the same element twice (must use left < right).',
    ],
    pitfallsHi: [
      'Unsorted array par direct two-pointer lagana (pehle sort karna zaroori hai).',
      'left <= right use karna jab ek hi element do baar use na karna ho.',
    ],
    takeaways: [
      'If the array is sorted and you need pairs or triplets, think Two Pointers.',
      'Two pointers compress O(N²) brute-force loops into O(N) linear scans.',
      'No extra memory is allocated (O(1) space).',
    ],
    takeawaysHi: [
      'Sorted array mein pair ya triplet dhoondhna ho toh Two Pointers socho.',
      'Two Pointers O(N²) ko O(N) bana deta hai.',
      'Extra memory zero lagti hai (O(1) space).',
    ],
  },

  'arrays:Strings & frequency maps': {
    moduleId: 'arrays',
    moduleTitle: 'Arrays & strings',
    moduleTitleHi: 'Arrays aur strings',
    subtopicTitle: 'Strings & frequency maps',
    subtopicTitleHi: 'Strings aur Frequency Maps',
    estimatedTime: '10 min',
    overview: 'Strings are sequences of characters. In JavaScript, strings are immutable. A Frequency Map counts occurrences of individual characters, providing the foundational mechanism to solve anagrams, character grouping, and window matching in O(N) time.',
    overviewHi: 'Strings characters ka sequence hote hain aur JavaScript mein immutable hote hain. Frequency Map har character ka count track karta hai, jo anagrams aur window problems ko O(N) mein solve karta hai.',
    concepts: [
      {
        title: 'String Immutability & Concatenation Cost',
        titleHi: 'String Immutability aur Memory',
        content: 'Strings cannot be modified in-place. Concatenating strings inside a loop copies the entire string each time, taking O(N²) time.',
        contentHi: 'Strings in-place change nahi ho sakte. Loop mein + se concatenate karne par har baar nayi copy banti hai (O(N²)).',
        points: [
          'str[0] = "x" will silently fail in JavaScript.',
          'To construct strings dynamically, push parts into an array and call array.join("") at the end for O(N) efficiency.',
        ],
        pointsHi: [
          'str[0] = "x" karne se string change nahi hota.',
          'Strings ko dynamic banane ke liye array mein push karke aakhiri mein .join("") karein.',
        ],
      },
      {
        title: 'Frequency Maps (Hash Map vs Integer Array)',
        titleHi: 'Frequency Map (Hash Map vs Array)',
        content: 'Count character occurrences to check anagrams, find duplicates, and inspect letter distributions in O(1) space for fixed alphabets.',
        contentHi: 'Characters ka count rakh kar anagrams aur duplicates jaldi check kiye jaate hain.',
        points: [
          'Using an object/Map: Works for all unicode characters: map[char] = (map[char] || 0) + 1.',
          'Using a 26-length integer array for lowercase English letters: freq[char.charCodeAt(0) - 97]++.',
          'Two strings are anagrams if and only if their frequency maps are identical.',
        ],
        pointsHi: [
          'Map ya Object mein: map[char] = (map[char] || 0) + 1.',
          'Lowercase English letters ke liye 26 size ka array sabse fast hota hai.',
          'Agar do strings ke frequency count same hain toh woh Anagrams hain.',
        ],
      },
    ],
    complexities: [
      { operation: 'Build Frequency Map', time: 'O(N)', space: 'O(K)', note: 'K is unique character count (K <= 26 for English)' },
      { operation: 'Compare Two Maps', time: 'O(K)', space: 'O(1)', note: 'Compares alphabet frequencies in constant time' },
      { operation: 'Loop String Concatenation (+)', time: 'O(N²)', space: 'O(N)', note: 'Reallocates new string on every concatenation' },
    ],
    examples: [
      {
        title: 'Valid Anagram Verification',
        titleHi: 'Valid Anagram Check Karna',
        description: 'Determine if string T is a rearrangement of string S in linear time using a frequency map.',
        descriptionHi: 'Frequency map se check karo ki kya doosra string pehle wale ka anagram hai.',
        code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const count: Record<string, number> = {};

  // Increment for s, decrement for t
  for (let i = 0; i < s.length; i++) {
    count[s[i]] = (count[s[i]] || 0) + 1;
    count[t[i]] = (count[t[i]] || 0) - 1;
  }

  // All counts must return to zero
  for (const char in count) {
    if (count[char] !== 0) return false;
  }

  return true;
}

console.log(isAnagram("listen", "silent")); // Output: true
console.log(isAnagram("rat", "car"));       // Output: false`,
        output: 'true for "listen"/"silent", false for "rat"/"car"',
        explanation: 'We increment counts for characters in s and decrement for t in a single pass. If all frequencies cancel out to zero, they are perfect anagrams in O(N) time and O(1) space.',
        explanationHi: 'Pehle string ke letters add karte hain aur doosre ke subtract. Agar end mein sabka count 0 bachta hai toh dono Anagrams hain. O(N) time.',
      },
    ],
    pitfalls: [
      'Concatenating strings inside a loop with += instead of using an array join.',
      'Not checking lengths first: if s.length !== t.length, they can never be anagrams.',
    ],
    pitfallsHi: [
      'Loop mein += se string jodna jo memory aur time dono kharab karta hai.',
      'Length pehle check na karna (agar length alag hai toh direct false return karo).',
    ],
    takeaways: [
      'Frequency maps reduce complex string matching into simple integer comparisons.',
      'For lowercase letters, a size-26 array is faster than an object/map.',
      'Always check string length equality as a fast guard clause.',
    ],
    takeawaysHi: [
      'Frequency map se string matching asaan ho jati hai.',
      'English letters ke liye 26 size ka array sabse fast hota hai.',
      'Shuru mein hi lengths compare karke return karein.',
    ],
  },

  // ==========================================
  // MODULE 3: SEARCHING
  // ==========================================
  'search:Linear search': {
    moduleId: 'search',
    moduleTitle: 'Searching',
    moduleTitleHi: 'Searching',
    subtopicTitle: 'Linear search',
    subtopicTitleHi: 'Linear Search',
    estimatedTime: '8 min',
    overview: 'Linear Search is the universal baseline search algorithm. It examines every item sequentially from index 0 through index N - 1. When an array is unsorted and lacks indexed metadata, linear search is the only sound method to find an element.',
    overviewHi: 'Linear Search sabse basic search algorithm hai jo shuru se lekar aakhiri tak har element ko ek-ek karke check karta hai. Jab data unsorted ho, tab Linear Search hi guaranteed rasta hota hai.',
    concepts: [
      {
        title: 'Sequential Scanning Invariant',
        titleHi: 'Sequential Scanning ka Niyam',
        content: 'Check each element against the target value until a match is found or the collection ends.',
        contentHi: 'Har element ko target se compare karte jao jab tak match na mile ya array khatam na ho jaye.',
        points: [
          'Best-case time: O(1) when the target is located at index 0.',
          'Worst-case time: O(N) when the target is at the final index or not in the array.',
          'Requires no prerequisites: works on unsorted, sorted, linked, or streaming data.',
        ],
        pointsHi: [
          'Best case: O(1) jab pehla hi element target ho.',
          'Worst case: O(N) jab target last mein ho ya mile hi na.',
          'Iske liye array ka sorted hona zaroori nahi hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Linear Search: Best Case', time: 'O(1)', space: 'O(1)', note: 'Target is the very first element' },
      { operation: 'Linear Search: Worst Case', time: 'O(N)', space: 'O(1)', note: 'Scans all N elements' },
      { operation: 'Linear Search: Average Case', time: 'O(N)', space: 'O(1)', note: 'Scans ~N/2 elements on average' },
    ],
    examples: [
      {
        title: 'Linear Search with Early Exit',
        titleHi: 'Linear Search Code Example',
        description: 'Searching for a target value and immediately returning its index upon match.',
        descriptionHi: 'Target milte hi turant index return karo taaki aage ka loop na chale.',
        code: `function linearSearch<T>(arr: T[], target: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Early exit as soon as target is found!
    }
  }
  return -1; // Target not found in entire array
}

const items = ['apple', 'banana', 'mango', 'orange'];
console.log(linearSearch(items, 'mango')); // Output: 2
console.log(linearSearch(items, 'grapes')); // Output: -1`,
        output: '2 for "mango", -1 for "grapes"',
        explanation: 'We iterate through the array. If a match occurs, return immediately. If loop finishes, return -1 in O(N) time.',
        explanationHi: 'Har element ko check karte hain. Jaise hi match milta hai index return ho jata hai, warna loop khatam hone par -1.',
      },
    ],
    pitfalls: [
      'Continuing to loop after finding the target instead of returning early.',
      'Assuming linear search is always bad: for small arrays (N < 20), linear search is faster than sorting + binary search.',
    ],
    pitfallsHi: [
      'Target milne ke baad bhi loop chalate rehna (early return na karna).',
      'Chhote arrays ke liye linear search fast hota hai kyunki sorting ka overhead nahi hota.',
    ],
    takeaways: [
      'Always return early when the target is found.',
      'Linear search is the only universal option for unsorted data.',
      'For repeated queries on large datasets, sort first or build a hash set.',
    ],
    takeawaysHi: [
      'Target milte hi turant return karein.',
      'Unsorted data ke liye linear search hi kaam karta hai.',
      'Agar baar-baar search karna ho toh pehle sort karein ya Hash Set use karein.',
    ],
  },

  'search:Binary search intuition': {
    moduleId: 'search',
    moduleTitle: 'Searching',
    moduleTitleHi: 'Searching',
    subtopicTitle: 'Binary search intuition',
    subtopicTitleHi: 'Binary Search Intuition',
    estimatedTime: '12 min',
    overview: 'Binary Search is the gold standard for searching sorted collections. By repeatedly comparing the target to the middle element, it eliminates half of the remaining search space with every comparison, reducing linear O(N) scans to logarithmic O(log N) speeds.',
    overviewHi: 'Binary Search sorted data ke liye gold standard hai. Har step par beech wale element se compare karke ye aadhi search space ko discard kar deta hai, jisse O(N) linear time O(log N) mein badal jata hai.',
    concepts: [
      {
        title: 'The Halving Principle (Logarithmic Scaling)',
        titleHi: 'The Halving Principle (O(log N))',
        content: 'Dividing the problem in half iteratively collapses astronomical numbers into tiny counts.',
        contentHi: 'Har comparison mein search space aadhi ho jaati hai, isliye hazaron ya lakhon elements kuch hi steps mein search ho jaate hain.',
        points: [
          'Searching 1,000 items takes at most 10 comparisons (2^10 = 1024).',
          'Searching 1,000,000 items takes at most 20 comparisons (2^20 ≈ 1,000,000).',
          'Searching 4,000,000,000 items (the entire 32-bit address space) takes only 32 comparisons!',
        ],
        pointsHi: [
          '1,000 items mein max 10 steps lagte hain (2^10 = 1024).',
          '10 lakh items mein max 20 steps lagte hain (2^20 ≈ 10 lakh).',
          '400 crore items mein sirf 32 comparisons lagte hain!',
        ],
      },
      {
        title: 'The Three Pointers & Mid Calculation',
        titleHi: 'Three Pointers aur Mid Formula',
        content: 'Low, high, and mid pointers define the active search interval.',
        contentHi: 'Low, high aur mid pointers search boundary ko control karte hain.',
        points: [
          'Search space is represented by the closed interval [low, high].',
          'Loop runs while low <= high.',
          'Safe Midpoint formula: mid = low + Math.floor((high - low) / 2) to prevent potential 32-bit integer overflow.',
        ],
        pointsHi: [
          'Search space [low, high] interval mein hoti hai.',
          'Loop tab tak chalta hai jab tak low <= high ho.',
          'Overflow se bachne ke liye: mid = low + Math.floor((high - low) / 2).',
        ],
      },
    ],
    complexities: [
      { operation: 'Binary Search: Best Case', time: 'O(1)', space: 'O(1)', note: 'Target is the exact middle element on pass 1' },
      { operation: 'Binary Search: Average & Worst', time: 'O(log N)', space: 'O(1)', note: 'Halves search space on each step' },
    ],
    examples: [
      {
        title: 'Standard Iterative Binary Search',
        titleHi: 'Iterative Binary Search Code',
        description: 'Locating a target value in a sorted array in O(log N) time and O(1) space.',
        descriptionHi: 'Sorted array mein target value ko O(log N) time mein dhoondho.',
        code: `function binarySearch(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    // Prevent integer overflow with low + (high - low) / 2
    const mid = low + Math.floor((high - low) / 2);

    if (nums[mid] === target) {
      return mid; // Target found!
    } else if (nums[mid] < target) {
      low = mid + 1; // Target is in right half -> discard left half
    } else {
      high = mid - 1; // Target is in left half -> discard right half
    }
  }

  return -1; // Target does not exist in array
}

const sortedList = [3, 8, 12, 19, 24, 31, 45, 59, 72, 88];
console.log(binarySearch(sortedList, 31)); // Output: 5
console.log(binarySearch(sortedList, 50)); // Output: -1`,
        output: '5 for 31, -1 for 50',
        explanation: 'At each comparison, half of the array is discarded. With 10 elements, it finds 31 in just 3 comparisons.',
        explanationHi: 'Har comparison par aadha array chhut jata hai. 10 elements mein se sirf 3 steps mein 31 mil jata hai.',
      },
    ],
    pitfalls: [
      'Forgetting that Binary Search ONLY works if the array is already SORTED.',
      'Using low < high instead of low <= high, which skips the final 1-element candidate.',
      'Using (low + high) / 2 instead of low + (high - low) / 2 in fixed-width languages.',
    ],
    pitfallsHi: [
      'Ye bhool jana ki Binary Search sirf SORTED array par hi kaam karta hai.',
      'low < high likhna (low <= high likhna zaroori hai warna aakhiri element skip ho sakta hai).',
      'mid nikaalte waqt integer overflow ka dhyan na rakhna.',
    ],
    takeaways: [
      'The prerequisite for Binary Search is sorted order or monotonic predicate behavior.',
      'Runtime is O(log N); space is O(1) iterative.',
      'Always use low <= high and mid = low + Math.floor((high - low) / 2).',
    ],
    takeawaysHi: [
      'Binary Search ke liye array ka sorted hona zaroori hai.',
      'Runtime O(log N) aur memory O(1) hoti hai.',
      'Hamesha low <= high condition aur safe mid formula use karein.',
    ],
  },

  'search:Search boundaries': {
    moduleId: 'search',
    moduleTitle: 'Searching',
    moduleTitleHi: 'Searching',
    subtopicTitle: 'Search boundaries',
    subtopicTitleHi: 'Search Boundaries (Lower & Upper Bound)',
    estimatedTime: '10 min',
    overview: 'When sorted arrays contain duplicate values, standard binary search stops at an arbitrary matching index. Boundary search variants pinpoint the first occurrence (lower bound) or last occurrence (upper bound), and form the foundation for Binary Search on Answer Spaces.',
    overviewHi: 'Jab sorted array mein duplicate values hon, toh standard binary search kisi bhi ek index par ruk jati hai. Search boundaries se hum first occurrence (lower bound) aur last occurrence (upper bound) exact nikaal sakte hain.',
    concepts: [
      {
        title: 'Lower Bound (First Occurrence)',
        titleHi: 'Lower Bound: Pehli Occurrence',
        content: 'When target is found at mid, do not terminate! Continue searching the left half to find if earlier instances exist.',
        contentHi: 'Jab mid par target mil jaye, toh turant mat ruko! Left half mein aage check karo ki kya usse pehle bhi wahi number hai.',
        points: [
          'When nums[mid] === target: record result = mid, then set high = mid - 1 to look left.',
          'When nums[mid] < target: low = mid + 1.',
          'When nums[mid] > target: high = mid - 1.',
        ],
        pointsHi: [
          'Agar nums[mid] === target: result = mid save karo aur high = mid - 1 karke left dhoondho.',
          'Agar chhota hai toh low = mid + 1, bada hai toh high = mid - 1.',
        ],
      },
      {
        title: 'Upper Bound (Last Occurrence)',
        titleHi: 'Upper Bound: Aakhiri Occurrence',
        content: 'When target is found at mid, continue searching the right half to find if later instances exist.',
        contentHi: 'Jab target mil jaye, toh right half mein dhoondho taaki aakhiri occurrence mil sake.',
        points: [
          'When nums[mid] === target: record result = mid, then set low = mid + 1 to look right.',
          'Together, lower bound and upper bound allow finding the exact range and count of duplicates in O(log N) time.',
        ],
        pointsHi: [
          'nums[mid] === target milne par result = mid save karo aur low = mid + 1 karke right jao.',
          'Dono bounds se duplicates ka exact range aur total count O(log N) mein nikalta hai.',
        ],
      },
    ],
    complexities: [
      { operation: 'Find First Occurrence', time: 'O(log N)', space: 'O(1)', note: 'Logarithmic boundary convergence' },
      { operation: 'Find Last Occurrence', time: 'O(log N)', space: 'O(1)', note: 'Logarithmic boundary convergence' },
      { operation: 'Count Duplicates in Sorted Array', time: 'O(log N)', space: 'O(1)', note: 'upper_bound - lower_bound + 1' },
    ],
    examples: [
      {
        title: 'First and Last Position of Element',
        titleHi: 'First aur Last Position Dhoondhna',
        description: 'Find the starting and ending position of a given target value in a sorted array with duplicates.',
        descriptionHi: 'Duplicates wale sorted array mein target ki shuruwat aur aakhiri position nikalo.',
        code: `function findFirstAndLast(nums: number[], target: number): [number, number] {
  function findBound(isFirst: boolean): number {
    let low = 0;
    let high = nums.length - 1;
    let bound = -1;

    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);

      if (nums[mid] === target) {
        bound = mid; // Save current index
        if (isFirst) {
          high = mid - 1; // Keep searching left for first occurrence
        } else {
          low = mid + 1;  // Keep searching right for last occurrence
        }
      } else if (nums[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return bound;
  }

  const first = findBound(true);
  const last = findBound(false);
  return [first, last];
}

const arr = [5, 7, 7, 8, 8, 8, 8, 10];
console.log(findFirstAndLast(arr, 8)); // Output: [3, 6] (indices 3 to 6 contain 8)`,
        output: '[3, 6]',
        explanation: 'We run binary search twice: once shifting left upon matches, once shifting right. Total time is 2 * O(log N) = O(log N) with O(1) extra space.',
        explanationHi: 'Binary search do baar chalta hai: ek baar left dhoondhne ke liye aur ek baar right ke liye. Total time O(log N) aur memory O(1).',
      },
    ],
    pitfalls: [
      'Stopping early at the first mid match instead of continuing to search the boundary.',
      'Counting duplicates with linear scan after binary search: if there are N duplicates, that degrades O(log N) into O(N). Always use two binary searches.',
    ],
    pitfallsHi: [
      'Pehle match par ruk jana aur boundary check na karna.',
      'Duplicate count karne ke liye linear loop lagana jisse time O(N) ho jata hai. Hamesha do binary search use karein.',
    ],
    takeaways: [
      'To find first occurrence: save mid and search left (high = mid - 1).',
      'To find last occurrence: save mid and search right (low = mid + 1).',
      'The number of occurrences in a sorted array is (last - first + 1) in O(log N) time.',
    ],
    takeawaysHi: [
      'Pehli occurrence ke liye: mid save karke left jao (high = mid - 1).',
      'Aakhiri occurrence ke liye: mid save karke right jao (low = mid + 1).',
      'Sorted array mein duplicates ka count = (last - first + 1) O(log N) time mein milta hai.',
    ],
  },
}
