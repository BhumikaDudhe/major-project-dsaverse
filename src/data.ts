export type View = 'dashboard' | 'learn' | 'visualizer' | 'arena' | 'quests' | 'planner' | 'mentor' | 'gamezone' | 'grimoire'
export type Language = 'EN' | 'HI'

export interface TestCase {
  input: string
  expected: string
}

export interface LadderStep {
  step: number
  title: { en: string; hi: string }
  prompt: { en: string; hi: string }
  starterCode: string
  testCases: TestCase[]
  invarianceTestCase: TestCase // Secret test case to verify true concept understanding
  socraticHints: {
    tier1_concept: { en: string; hi: string }
    tier2_edgeCase: { en: string; hi: string }
    tier3_pseudocode: { en: string; hi: string }
  }
}

export interface ProblemChain {
  id: string
  track: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  steps: LadderStep[]
}

// 4-STEP CONTINUOUS MICRO-LADDER: HASHMAP FREQUENCY MASTERY
export const activeChains: ProblemChain[] = [
  {
    id: 'hashmap-frequency',
    track: 'HASHMAPS & STRINGS',
    title: 'Frequency Mastery Ladder',
    difficulty: 'Easy',
    steps: [
      {
        step: 1,
        title: {
          en: 'Level 1: The Item Counter',
          hi: 'Level 1: Canteen Ka Order Counter'
        },
        prompt: {
          en: 'Given a list of order items, count the frequency of each item and return the frequency map.',
          hi: 'Orders ki list di gayi hai. Har item ka total count nikaal kar map/dict return karo.'
        },
        starterCode: `function countFrequencies(orders) {
  // Level 1: Count item occurrences
  const freqMap = {};
  
  // Your code here
  
  return freqMap;
}`,
        testCases: [
          { input: '["samosa", "chai", "samosa", "vada"]', expected: '{"samosa":2,"chai":1,"vada":1}' },
          { input: '["chai", "chai"]', expected: '{"chai":2}' }
        ],
        invarianceTestCase: {
          input: '["maggi", "coffee", "maggi", "maggi"]',
          expected: '{"maggi":3,"coffee":1}'
        },
        socraticHints: {
          tier1_concept: {
            en: 'What data structure allows key-value storage so we can increment counts in O(1) time?',
            hi: 'Kaunsa data structure use karein jisme key-value pair store karke count O(1) me update ho sake?'
          },
          tier2_edgeCase: {
            en: 'Check if the item already exists in the map. If not, initialize it to 0 before adding 1.',
            hi: 'Check karo kya item pehle se map me hai? Agar nahi, toh 0 se shuru karo phir 1 add karo.'
          },
          tier3_pseudocode: {
            en: 'For item in orders: freqMap[item] = (freqMap[item] || 0) + 1',
            hi: 'Loop chalao orders par: freqMap[item] = (freqMap[item] || 0) + 1'
          }
        }
      },
      {
        step: 2,
        title: {
          en: 'Level 2: The Odd Order Out',
          hi: 'Level 2: Odd Frequency Ka Samosa Chor'
        },
        prompt: {
          en: 'REFACTOR STEP 1: Using your Level 1 frequency map, return an array of items that appear an ODD number of times.',
          hi: 'LEVEL 1 KA CODE REUSE KARO: Frequency map banane ke baad, sirf un items ki list return karo jinki frequency ODD hai.'
        },
        starterCode: `// Your working code from Level 1 will carry over here automatically!`,
        testCases: [
          { input: '["samosa", "samosa", "chai", "vada", "vada"]', expected: '["chai"]' },
          { input: '["a", "b", "a", "b", "c"]', expected: '["c"]' }
        ],
        invarianceTestCase: {
          input: '["x", "x", "x", "y"]',
          expected: '["x","y"]'
        },
        socraticHints: {
          tier1_concept: {
            en: 'How do you check if a number is odd using an arithmetic operator?',
            hi: 'Odd number check karne ke liye kaunsa operator use hota hai?'
          },
          tier2_edgeCase: {
            en: 'Iterate over the keys of your freqMap and inspect each frequency count with count % 2 !== 0.',
            hi: 'freqMap ke keys par iterate karo aur check karo: count % 2 !== 0.'
          },
          tier3_pseudocode: {
            en: 'Result = []; For key in freqMap: if freqMap[key] % 2 !== 0 push key; return Result',
            hi: 'Result array banao. freqMap ke har key ke liye agar count odd hai, toh push karo.'
          }
        }
      }
    ]
  }
]

export const topics = [
  { id: 'basics', title: 'Programming basics', hindi: 'Programming ki basics', unit: '01', level: 'Start here', time: '2.5 hrs', progress: 100, color: 'mint', lessons: ['Variables & data types', 'Conditions and loops', 'Functions, step by step'] },
  { id: 'arrays', title: 'Arrays & strings', hindi: 'Arrays aur strings', unit: '02', level: 'Foundation', time: '72%', progress: 72, color: 'cyan', lessons: ['Array fundamentals', 'Two pointers', 'Strings & frequency maps'] },
  { id: 'search', title: 'Searching', hindi: 'Searching', unit: '03', level: 'Foundation', time: '3 hrs', progress: 38, color: 'violet', lessons: ['Linear search', 'Binary search intuition', 'Search boundaries'] }
]

export const companies = ['TCS', 'Infosys', 'Cognizant', 'Accenture', 'Amazon', 'Microsoft', 'Google']