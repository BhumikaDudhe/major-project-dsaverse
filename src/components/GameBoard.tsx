import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, CircleHelp, Code2, Compass, Crown, Dice5, Flag, Gauge, Gem, GitBranch, Lightbulb, LockKeyhole, LogOut, MoveDownRight, MoveUpRight, Play, RotateCcw, Shield, Sparkles, Swords, Trophy, WandSparkles, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AvatarId, Language, Profile } from '../lib/auth'
import { advanceToNextWorld, BOARD_LENGTH, CHECKPOINT_TILES, completeChallenge, createInitialProgress, enterUnlockedWorld, isValidProgress, LESSON_WORLD_UNLOCKS, resolveTileTransition, rollDestination, switchWorld, syncLessonUnlocks, tileKind, WORLD_IDS, type GameProgress, type TileKind } from '../lib/gameRules'
import { loadProgress, saveProgress } from '../lib/progress'
import { worlds } from '../lib/worlds'
import { getWorldChallenges } from '../lib/worldQuestions'
import { WORLD_THEORY, WORLD_UNLOCK_TILES } from '../lib/worldTheory'
import '../worldTheory.css'

type Option = { id: string; label: string }
export type WorldChallenge = { tile: number; title: string; topic: string; prompt: string; options: Option[]; answer: string; explanation: string; hint: string; reward: number; kind: 'quiz' | 'dry-run' | 'debug' | 'treasure' | 'boss' }

export const logicForestChallenges: WorldChallenge[] = [
  { tile: 2, title: 'The Variable Rune', topic: 'Variables', prompt: 'A value changes while your program runs. Which name best describes that storage?', options: [{ id: 'constant', label: 'A constant' }, { id: 'variable', label: 'A variable' }, { id: 'loop', label: 'A loop' }], answer: 'variable', explanation: 'A variable stores a value that can change while the program runs.', hint: 'Think of a named box whose contents can be updated.', reward: 25, kind: 'quiz' },
  { tile: 6, title: 'Loop Lantern', topic: 'Loops', prompt: 'Dry run: let total = 0; for (let i = 1; i < 4; i++) total += i. What is total?', options: [{ id: '3', label: '3' }, { id: '6', label: '6' }, { id: '10', label: '10' }], answer: '6', explanation: 'The loop adds 1, then 2, then 3. The final total is 6.', hint: 'Write each pass: total becomes 1, then 3, then 6.', reward: 35, kind: 'dry-run' },
  { tile: 11, title: 'Condition Gate', topic: 'Conditions', prompt: 'A gate opens only if score >= 50. What happens when score is exactly 50?', options: [{ id: 'opens', label: 'The gate opens' }, { id: 'closed', label: 'The gate stays closed' }, { id: 'error', label: 'The condition is invalid' }], answer: 'opens', explanation: 'The >= operator means greater than or equal to, so 50 passes.', hint: 'The equals sign is part of the condition too.', reward: 35, kind: 'quiz' },
  { tile: 15, title: 'First Treasure', topic: 'Big-O basics', prompt: 'Which operation takes constant time for an array?', options: [{ id: 'index', label: 'Read the value at a known index' }, { id: 'find', label: 'Find an unknown value by scanning' }, { id: 'insert', label: 'Insert at the beginning' }], answer: 'index', explanation: 'Array indexing jumps directly to a known position, which is O(1).', hint: 'You already know exactly which slot to visit.', reward: 50, kind: 'treasure' },
  { tile: 17, title: 'Debug the Trail', topic: 'Debugging', prompt: 'This loop should visit every array index. What is the bug? for (let i = 0; i <= items.length; i++)', options: [{ id: 'start', label: 'It should start at 1' }, { id: 'bound', label: 'Use i < items.length, not <=' }, { id: 'type', label: 'The loop must use a string' }], answer: 'bound', explanation: 'The last valid index is length - 1. Using <= reads one index past the array.', hint: 'For 3 items, valid indexes are 0, 1, and 2.', reward: 40, kind: 'debug' },
  { tile: 23, title: 'Function Bridge', topic: 'Functions', prompt: 'A function calculates a result and the caller needs to use it. Which keyword sends the result back?', options: [{ id: 'print', label: 'print' }, { id: 'return', label: 'return' }, { id: 'continue', label: 'continue' }], answer: 'return', explanation: 'return hands a value back to the code that called the function.', hint: 'It is the opposite of keeping the result inside the function.', reward: 40, kind: 'quiz' },
  { tile: 25, title: 'Artifact Cache', topic: 'Algorithm thinking', prompt: 'You need to remember whether a value was already seen. Which tool is a good fit?', options: [{ id: 'set', label: 'A set' }, { id: 'screen', label: 'A screenshot' }, { id: 'loop-only', label: 'A second copy of the input' }], answer: 'set', explanation: 'A set tracks unique values and checks membership efficiently.', hint: 'Choose a data structure built to track unique items.', reward: 55, kind: 'treasure' },
  { tile: 27, title: 'Boolean Bridge', topic: 'Conditions', prompt: 'What does (true && false) evaluate to?', options: [{ id: 'true', label: 'true' }, { id: 'false', label: 'false' }, { id: 'null', label: 'null' }], answer: 'false', explanation: '&& is true only when both sides are true.', hint: 'Both conditions must pass for AND.', reward: 45, kind: 'quiz' },
  { tile: 29, title: 'The Logic Guardian', topic: 'Boss battle', prompt: 'A stack follows which rule when removing an item?', options: [{ id: 'fifo', label: 'First in, first out' }, { id: 'lifo', label: 'Last in, first out' }, { id: 'random', label: 'Remove a random item' }], answer: 'lifo', explanation: 'A stack is LIFO: the newest item is the first one removed.', hint: 'Imagine taking the top plate from a pile.', reward: 100, kind: 'boss' },
]

const wait = (duration: number) => new Promise((resolve) => window.setTimeout(resolve, duration))
const avatarIcons: Record<AvatarId, LucideIcon> = { apprentice: Sparkles, scholar: BookOpen, wayfinder: Compass, spark: Zap }
const tileIcons: Record<TileKind, LucideIcon> = { start: Sparkles, quiz: CircleHelp, lesson: BookOpen, visualizer: GitBranch, treasure: Gem, checkpoint: Flag, snake: MoveDownRight, ladder: MoveUpRight, boss: Shield, finish: Trophy }
const tileLabels: Record<TileKind, string> = { start: 'START', quiz: 'RUNE QUIZ', lesson: 'LESSON', visualizer: 'VISUALIZER', treasure: 'TREASURE', checkpoint: 'CHECKPOINT', snake: 'SNAKE', ladder: 'LADDER', boss: 'BOSS', finish: 'PORTAL' }
const tileLabelsHi: Record<TileKind, string> = { start: 'SHURU', quiz: 'QUIZ', lesson: 'LESSON', visualizer: 'VISUALIZER', treasure: 'KHZANA', checkpoint: 'CHECKPOINT', snake: 'SAANP', ladder: 'SEEDHI', boss: 'BOSS', finish: 'PORTAL' }

function boardPosition(position: number) {
  const rowFromBottom = Math.floor((position - 1) / 5)
  const offset = (position - 1) % 5
  const column = rowFromBottom % 2 === 0 ? offset + 1 : 5 - offset
  return { gridColumn: column, gridRow: 6 - rowFromBottom }
}

function isChallengeDone(progress: GameProgress, position: number) {
  return progress.completedChallenges.includes(position)
}

export function GameBoard({ profile, userId, preview, onLanguageChange, onOpenHub, onExit }: { profile: Profile; userId: string | null; preview: boolean; onLanguageChange: (language: Language) => Promise<void>; onOpenHub: (xp: number) => void; onExit: () => void }) {
  const [game, setGame] = useState<GameProgress>(createInitialProgress)
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [moving, setMoving] = useState(false)
  const [rolling, setRolling] = useState(false)
  const [dice, setDice] = useState<number | null>(null)
  const [pendingTile, setPendingTile] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null)
  const [message, setMessage] = useState('Roll the die to take your first step into Logic Forest.')
  const [worldPreview, setWorldPreview] = useState<string | null>(null)
  const [theoryTab, setTheoryTab] = useState<'theory' | 'examples' | 'complexity' | 'takeaways'>('theory')
  const [languageBusy, setLanguageBusy] = useState(false)
  const saveQueue = useRef<Promise<void>>(Promise.resolve())
  const hi = profile.language === 'HI'
  const AvatarIcon = avatarIcons[profile.avatar]
  const visibleTileLabels = hi ? tileLabelsHi : tileLabels
  const worldIndex = WORLD_IDS.indexOf(game.worldId as typeof WORLD_IDS[number])
  const currentWorld = worlds[worldIndex]
  const worldNameHi: Record<string, string> = { 'logic-forest': 'Logic Forest', 'array-kingdom': 'Array Kingdom', 'sorting-citadel': 'Sorting Citadel', 'recursion-maze': 'Recursion Mirror Maze', 'linked-caverns': 'Linked List Caverns', 'structure-tower': 'Stack aur Queue Tower', 'wisdom-tree': 'Tree of Wisdom', 'graph-portal': 'Graph Portal', 'dp-realm': 'Dynamic Programming Realm' }
  const currentWorldName = hi ? worldNameHi[game.worldId] : currentWorld.name
  const worldFocusHi: Record<string, string> = { 'logic-forest': 'Variables, conditions, loops aur functions', 'array-kingdom': 'Indexing, search, two pointers aur prefix sums', 'sorting-citadel': 'Bubble, insertion, selection, merge aur quicksort', 'recursion-maze': 'Call stack, base cases aur backtracking', 'linked-caverns': 'Nodes, references, insertion aur reversal', 'structure-tower': 'Push, pop, enqueue aur dequeue', 'wisdom-tree': 'Binary trees, BST, traversals aur heaps', 'graph-portal': 'Graph representation, BFS, DFS aur shortest paths', 'dp-realm': 'Memoization, tabulation aur DP missions' }
  const challengeByTile = useMemo(() => {
    if (game.worldId !== 'logic-forest') return new Map(getWorldChallenges(game.worldId, profile.language).map((challenge) => [challenge.tile, challenge]))
    const translations: Record<number, { title: string; topic: string; prompt: string; options: string[]; explanation: string; hint: string }> = {
        2: { title: 'Variable Rune', topic: 'Variables', prompt: 'Program chalte waqt value badalti hai. Is storage ko kya kehte hain?', options: ['Constant', 'Variable', 'Loop'], explanation: 'Variable aisi value store karta hai jo program chalte waqt badal sakti hai.', hint: 'Ek named box socho jiska content update ho sakta hai.' },
        6: { title: 'Loop Lantern', topic: 'Loops', prompt: 'Dry run: total = 0; i = 1 se 3 tak add karte hain. Final total kya hai?', options: ['3', '6', '10'], explanation: 'Loop 1, phir 2, phir 3 add karta hai. Final total 6 hai.', hint: 'Har pass likho: total 1, phir 3, phir 6.' },
        11: { title: 'Condition Gate', topic: 'Conditions', prompt: 'Gate tab khulta hai jab score >= 50. Score exactly 50 ho toh kya hoga?', options: ['Gate khulega', 'Gate band rahega', 'Condition invalid hai'], explanation: '>= ka matlab greater than ya equal to hai, isliye 50 pass hota hai.', hint: 'Condition mein equals sign bhi included hai.' },
        15: { title: 'Pehla Treasure', topic: 'Big-O basics', prompt: 'Array mein kaunsa operation constant time leta hai?', options: ['Known index par value read karna', 'Scan karke unknown value dhoondhna', 'Shuru mein insert karna'], explanation: 'Known array index direct access deta hai, jo O(1) hota hai.', hint: 'Tumhe pehle se pata hai kis slot par jaana hai.' },
        17: { title: 'Trail ka Bug', topic: 'Debugging', prompt: 'Loop ko har array index visit karna hai. Bug kya hai? i <= items.length', options: ['1 se start karo', 'i < items.length use karo', 'String use karna hoga'], explanation: 'Last valid index length - 1 hai. <= array ke bahar access karta hai.', hint: '3 items ke valid indexes 0, 1, 2 hain.' },
        23: { title: 'Function Bridge', topic: 'Functions', prompt: 'Function result calculate karta hai; caller ko result kaise milega?', options: ['print', 'return', 'continue'], explanation: 'return value ko calling code tak wapas bhejta hai.', hint: 'Result ko function ke andar rakhne ke bajay wapas bhejo.' },
        25: { title: 'Artifact Cache', topic: 'Algorithm thinking', prompt: 'Value pehle dekhi hai ya nahi yaad rakhna hai. Kaunsa tool sahi hai?', options: ['Set', 'Screenshot', 'Input ki second copy'], explanation: 'Set unique values track karta hai aur membership jaldi check karta hai.', hint: 'Unique items rakhne ke liye bana data structure chuno.' },
        27: { title: 'Boolean Bridge', topic: 'Conditions', prompt: '(true && false) ka result kya hoga?', options: ['true', 'false', 'null'], explanation: '&& tabhi true hota hai jab dono sides true hon.', hint: 'AND mein dono conditions pass honi chahiye.' },
        29: { title: 'Logic Guardian', topic: 'Boss battle', prompt: 'Stack item remove karte waqt kaunsa rule follow karta hai?', options: ['First in, first out', 'Last in, first out', 'Random item'], explanation: 'Stack LIFO hai: jo item sabse naya aaya, woh pehle nikalta hai.', hint: 'Plates ke pile se sabse upar wali plate uthao.' },
    }
    const hiChallenges = logicForestChallenges.map((challenge) => {
      if (!hi) return challenge
      const translated = translations[challenge.tile]
      return { ...challenge, title: translated.title, topic: translated.topic, prompt: translated.prompt, options: challenge.options.map((option, index) => ({ ...option, label: translated.options[index] })), explanation: translated.explanation, hint: translated.hint }
    })
    return new Map(hiChallenges.map((challenge) => [challenge.tile, challenge]))
  }, [game.worldId, profile.language, hi])
  const challengeTiles = useMemo(() => new Set(challengeByTile.keys()), [challengeByTile])
  const activeChallenge = pendingTile === null ? null : challengeByTile.get(pendingTile) ?? null

  useEffect(() => {
    let cancelled = false
    setReady(false); setLoadError('')
    void loadProgress(userId, preview).then((saved) => {
      if (!cancelled) {
        const loaded = isValidProgress(saved) ? saved : createInitialProgress()
        const { progress: synced } = syncLessonUnlocks(loaded)
        setGame(synced)
        setReady(true)
      }
    }).catch((error: unknown) => {
      if (!cancelled) { setLoadError(error instanceof Error ? error.message : 'Could not load saved journey.'); setReady(true) }
    })
    return () => { cancelled = true }
  }, [userId, preview])

  useEffect(() => {
    if (!ready || loadError || moving || rolling) return
    let cancelled = false
    const snapshot = game
    saveQueue.current = saveQueue.current.catch(() => undefined).then(() => saveProgress(userId, preview, snapshot))
    void saveQueue.current.then(() => { if (!cancelled) setSaveError('') }).catch((error: unknown) => {
      if (!cancelled) setSaveError(error instanceof Error ? error.message : 'Progress could not be saved.')
    })
    return () => { cancelled = true }
  }, [game, ready, userId, preview, loadError, moving, rolling])

  const landOn = async (position: number) => {
    // Automatically unlock worlds reached by lesson milestones
    const { progress: synced, newlyUnlocked } = syncLessonUnlocks({ ...game, position })
    if (newlyUnlocked) {
      setGame(synced)
    }

    if (challengeTiles.has(position) && !isChallengeDone(game, position)) {
      setPendingTile(position); setShowHint(false); setFeedback(null)
      return
    }
    const transition = resolveTileTransition(position)
    if (transition?.kind === 'snake') {
      const destination = transition.destination
      setMessage(hi ? `Tile ${position} ka saanp tumhe ${destination} par le aaya. XP nahi ghata. Wahan se dobara roll karo.` : `A forest snake slides from tile ${position} to ${destination}. No XP is lost. Roll again from the new spot.`)
      await wait(650)
      setGame((current) => ({ ...current, position: destination }))
      return
    }
    if (transition?.kind === 'ladder') {
      const destination = transition.destination
      setMessage(hi ? `Tile ${position} se seedhi ${destination} tak jaati hai. Chadh jao, XP tumhara hai.` : `A ladder connects tile ${position} to ${destination}. Climb it and keep your earned XP.`)
      await wait(650)
      setGame((current) => ({ ...current, position: destination }))
      await landOn(destination)
      return
    }
    if (CHECKPOINT_TILES.includes(position) && position > game.checkpoint) {
      setGame((current) => ({ ...current, checkpoint: position }))
      setMessage(hi ? `Checkpoint tile ${position} par save hua. Wapas aaoge toh yahin se shuru hoga.` : `Checkpoint saved at tile ${position}. If you leave and return, your journey resumes here.`)
      return
    }
    if (position === BOARD_LENGTH) {
      const unlocked = advanceToNextWorld({ ...game, position })
      const nextWorld = worlds[worldIndex + 1]
      setGame(unlocked)
      setMessage(unlocked.won && nextWorld
        ? (hi ? `${currentWorld.name} complete! ${nextWorld.name} unlock ho gaya.` : `${currentWorld.name} complete! ${nextWorld.name} is unlocked.`)
        : unlocked.won ? (hi ? 'Saare worlds complete! Tumne DSAverse master kar liya.' : 'All worlds complete! You have mastered the Academy.')
        : hi ? 'Portal kholne ke liye pehle tile 29 ke Guardian ko harao.'
        : `The final portal needs the ${currentWorld.name} Guardian challenge first. Return to tile 29 and complete it.`)
      return
    }
    const kind = tileKind(position)
    if (newlyUnlocked) {
      const targetWorld = worlds.find((w) => w.id === newlyUnlocked)
      const name = hi ? worldNameHi[newlyUnlocked] : targetWorld?.name
      setMessage(hi
        ? `🎉 Tile ${position} Lesson clear: ${name} UNLOCK ho gaya! Left rail par click karke iski theory aur examples padho.`
        : `🎉 Lesson Milestone at Tile ${position}! ${name} is UNLOCKED in Academy Worlds! Click it on the left to read theory & code examples.`)
      return
    }
    const unlockTarget = LESSON_WORLD_UNLOCKS[position]
    if (kind === 'lesson' && unlockTarget) {
      const targetWorld = worlds.find((w) => w.id === unlockTarget)
      const name = hi ? worldNameHi[unlockTarget] : targetWorld?.name
      setMessage(hi
        ? `📖 Tile ${position} · Lesson: ${name} unlocked hai! Left rail par click karke iski theory aur examples padhein.`
        : `📖 Tile ${position} · Lesson: ${name} is unlocked! Click on it in Academy Worlds to view its theory & examples.`)
      return
    }
    setMessage(kind === 'visualizer' ? (hi ? `Tile ${position}: visualizer mein agla algorithm step guess karo.` : `Visualizer tile ${position}: pause and predict what the algorithm does next.`) : kind === 'lesson' ? (hi ? `Tile ${position}: pattern ko aaram se samjho. XP nahi katega.` : `Lesson tile ${position}: take a breath and notice the pattern. No XP is at risk here.`) : (hi ? `Tile ${position} clear! Agli move ke liye ready ho.` : `Tile ${position} cleared. Choose your next move when you are ready.`))
  }

  const roll = async () => {
    if (!ready || moving || rolling || pendingTile !== null || game.won || loadError) return
    setMoving(true); setRolling(true); setFeedback(null); setMessage('The die is rolling...')
    const value = Math.floor(Math.random() * 6) + 1
    setDice(value)
    await wait(520)
    setRolling(false)
    const destination = rollDestination(game.position, value, game.completedChallenges.includes(29))
    const spaces = destination - game.position
    for (let step = 1; step <= spaces; step++) {
      const next = game.position + step
      setGame((current) => ({ ...current, position: next, rolls: current.rolls + (step === 1 ? 1 : 0) }))
      await wait(190)
    }
    setMoving(false)
    await landOn(destination)
  }

  const answer = (optionId: string) => {
    if (pendingTile === null || !activeChallenge) return
    if (optionId !== activeChallenge.answer) {
      setFeedback({ correct: false, text: hi ? 'Abhi nahi. Kuch nahi ghatega. Ek aur jawab ya hint try karo.' : 'Not quite. Nothing is lost. Try another answer or reveal a hint.' })
      return
    }
    setGame((current) => completeChallenge(current, pendingTile, activeChallenge.reward).progress)
    setFeedback({ correct: true, text: activeChallenge.explanation })
    setShowHint(false)
    setMessage(activeChallenge.kind === 'boss'
      ? (hi ? `${activeChallenge.explanation} Guardian haar gaya! Portal par dobara aao aur agla world unlock karo.` : `${activeChallenge.explanation} Guardian defeated! Return to the portal to unlock the next world.`)
      : (hi ? `${activeChallenge.explanation} +${activeChallenge.reward} XP. Aage badho!` : `${activeChallenge.explanation} +${activeChallenge.reward} XP. Keep going!`))
  }

  const resetPreview = () => {
    if (!preview) return
    const fresh = createInitialProgress()
    setGame(fresh); setPendingTile(null); setFeedback(null); setDice(null); setShowHint(false); setMessage(hi ? 'Demo progress reset ho gaya. Pehla step ready hai.' : 'Demo progress reset. Your first step is ready.')
  }

  const enterNextWorld = () => {
    const nextWorld = worlds[worldIndex + 1]
    if (!nextWorld || !game.won) return
    setGame(enterUnlockedWorld(game, nextWorld.id))
    setPendingTile(null); setFeedback(null); setDice(null); setShowHint(false)
    setMessage(hi ? `${worldNameHi[nextWorld.id]} mein swagat hai. Naya path shuru karo!` : `Welcome to ${nextWorld.name}. Your next path begins!`)
  }

  const changeLanguage = async () => {
    setLanguageBusy(true)
    try { await onLanguageChange(hi ? 'EN' : 'HI') }
    catch (error) { setSaveError(error instanceof Error ? error.message : 'Could not update language preference.') }
    finally { setLanguageBusy(false) }
  }

  const tileNodes = useMemo(() => Array.from({ length: BOARD_LENGTH }, (_, index) => {
    const position = index + 1
    const kind = tileKind(position)
    const Icon = tileIcons[kind]
    const challenge = challengeByTile.get(position)
    const { gridColumn, gridRow } = boardPosition(position)
    const completed = isChallengeDone(game, position)
    const className = ['board-tile', `tile-${kind}`, position === game.position ? 'player-here' : '', pendingTile === position ? 'tile-pending' : '', completed ? 'tile-completed' : ''].filter(Boolean).join(' ')
    return <div key={position} className={className} style={{ gridColumn, gridRow }} aria-label={`Tile ${position}: ${visibleTileLabels[kind]}`}><span className="tile-number">{String(position).padStart(2, '0')}</span><Icon size={16} /><span className="tile-kind">{visibleTileLabels[kind]}</span>{challenge && !completed && <i className="tile-quest-dot" />}{position === game.position && <span className={`player-token avatar-${profile.avatar}`}><AvatarIcon size={16} /></span>}</div>
  }), [game.position, game.worldId, profile.avatar, pendingTile, game.completedChallenges, challengeByTile, visibleTileLabels, AvatarIcon])

  const previewWorld = worlds.find((world) => world.id === worldPreview)
  const nextWorld = worlds[worldIndex + 1]
  const isUnlocked = (worldId: string) => game.unlockedWorldIds.includes(worldId)
  const worldRows = worlds.map((world, index) => {
    const active = world.id === game.worldId
    const unlocked = isUnlocked(world.id)
    const canEnter = game.won && world.id === nextWorld?.id && unlocked
    const unlockTile = WORLD_UNLOCK_TILES[world.id]
    const status = active
      ? (hi ? 'CHAL RAHA HAI' : 'IN PROGRESS')
      : index < worldIndex
      ? (hi ? 'COMPLETE' : 'COMPLETE')
      : canEnter
      ? (hi ? 'AGLA LEVEL' : 'NEXT LEVEL')
      : unlocked
      ? (hi ? 'UNLOCKED · THEORY READY' : 'UNLOCKED · READ THEORY')
      : unlockTile
      ? (hi ? `Lesson Tile ${unlockTile} par unlock` : `Unlocks at Lesson Tile ${unlockTile}`)
      : world.requirement
    return (
      <button
        key={world.id}
        className={`world-row ${active ? 'world-active' : ''} ${unlocked ? 'world-unlocked' : ''}`}
        onClick={() => {
          setTheoryTab('theory')
          setWorldPreview(world.id)
        }}
        title={unlocked ? `Open ${world.name} theory & examples` : `Reach Lesson Tile ${unlockTile} to unlock`}
      >
        <span className="world-index">{unlocked ? <Check size={13} /> : <LockKeyhole size={12} />}</span>
        <span className="world-row-copy">
          <strong>{hi ? worldNameHi[world.id] : world.name}</strong>
          <small>{status}</small>
        </span>
        <ChevronRight size={13} />
      </button>
    )
  })

  return <main className="academy-game">
    {game.won && <section className="world-complete-banner"><div><Trophy size={19} /><span><strong>{hi ? `${currentWorldName} complete!` : `${currentWorld.name} complete!`}</strong><small>{nextWorld ? (hi ? `${worldNameHi[nextWorld.id]} unlock ho gaya. Agla level ready hai.` : `${nextWorld.name} is unlocked. Your next level is ready.`) : (hi ? 'Saare learning worlds complete ho gaye!' : 'You completed every learning world!')}</small></span></div>{nextWorld && <button onClick={enterNextWorld}>{hi ? `${worldNameHi[nextWorld.id]} mein jao` : `Enter ${nextWorld.name}`} <ArrowRight size={14} /></button>}</section>}
    <header className="game-topbar"><button className="game-brand" onClick={() => { setTheoryTab('theory'); setWorldPreview(game.worldId); }}><span className="academy-sigil"><Sparkles size={17} /></span><span>DSA<span>verse</span><small>ARCANE ACADEMY</small></span></button><div className="game-breadcrumb"><span>{hi ? 'ACADEMY' : 'THE ACADEMY'}</span><ChevronRight size={13} /><strong>{hi ? `WORLD ${String(worldIndex + 1).padStart(2, '0')} · ${currentWorldName.toUpperCase()}` : `WORLD ${String(worldIndex + 1).padStart(2, '0')} · ${currentWorld.name.toUpperCase()}`}</strong></div><div className="game-player"><button className="game-hub-link" onClick={() => onOpenHub(game.xp)}><BookOpen size={14} /> {hi ? 'Padhai hub' : 'Study hub'}</button><button className="game-language" disabled={languageBusy} onClick={() => void changeLanguage()}>{hi ? 'हि' : 'EN'} <span>⌄</span></button><span className="game-player-avatar"><AvatarIcon size={16} /></span><span className="game-player-name">{profile.display_name}</span><span className="preview-status">{preview ? 'DEMO MODE' : `LV ${game.level}`}</span><button className="game-exit" aria-label={preview ? (hi ? 'Log out' : 'Log out') : (hi ? 'Sign out' : 'Sign out')} onClick={onExit}><LogOut size={16} /></button></div></header>
    {preview && <div className="preview-ribbon"><Sparkles size={13} /> DEMO MODE <span>— data is stored only in this browser.</span><button onClick={resetPreview}><RotateCcw size={12} /> Reset Demo Progress</button></div>}
    {saveError && !preview && <div className="save-warning" role="status"><LockKeyhole size={14} /> Your game is open, but cloud save failed: {saveError}. Apply the Supabase migration and check project settings.</div>}
    <section className="academy-heading"><div><span className="world-eyebrow"><i /> {hi ? `WORLD ${String(worldIndex + 1).padStart(2, '0')} · NAYA SHURU KARNE WALON KE LIYE` : `WORLD ${String(worldIndex + 1).padStart(2, '0')} · BEGINNER FRIENDLY`}</span><h1>{currentWorldName} <span>{String(worldIndex + 1).padStart(2, '0')}</span></h1><p>{hi ? `Is world mein: ${worldFocusHi[game.worldId]}. Har sahi answer se progress aur XP badhega; galat jawab par kuch nahi ghatega.` : `Explore ${currentWorld.focus}. Solve each rune to earn XP; incorrect answers never take progress away.`}</p></div><div className="journey-stats"><div><span>{hi ? 'TUMHARA LEVEL' : 'YOUR LEVEL'}</span><strong>{String(game.level).padStart(2, '0')}<small> / APPRENTICE</small></strong></div><div><span>{hi ? 'EXPERIENCE' : 'EXPERIENCE'}</span><strong>{game.xp}<small> XP</small></strong></div><div><span>{hi ? 'CHECKPOINT' : 'CHECKPOINT'}</span><strong>{String(game.checkpoint).padStart(2, '0')}<small> / 30</small></strong></div></div></section>
    {loadError ? <section className="game-error"><LockKeyhole size={21} /><h2>Could not load this journey</h2><p>{loadError}</p><button onClick={() => window.location.reload()}>Retry</button></section> : !ready ? <div className="game-loading"><Sparkles size={19} /> Restoring your path through the forest...</div> : <section className="game-layout">
      <aside className="world-rail"><div className="rail-title"><span>{hi ? 'ACADEMY WORLDS' : 'ACADEMY WORLDS'}</span><span>{String(worldIndex + 1).padStart(2, '0')} / 09</span></div><div className="world-list">{worldRows}</div><div className="rail-artifact"><div className="artifact-gem"><Gem size={18} /></div><div><span>{hi ? 'FOREST ARTIFACT' : 'WORLD ARTIFACT'}</span><strong>{game.claimedRewards.length} / 5 shards</strong></div><div className="artifact-progress"><i style={{ width: `${Math.min(100, game.claimedRewards.length / 5 * 100)}%` }} /></div></div><div className="rail-mentor"><span className="mentor-stamp"><WandSparkles size={15} /></span><div><strong>{hi ? 'Hint chahiye?' : 'Need a nudge?'}</strong><small>{hi ? 'Galat jawab par XP nahi ghatega.' : 'Wrong answers never take XP.'}</small></div></div></aside>
      <section className="board-column"><div className="board-toolbar"><div><span className="section-kicker">THE WINDING TRAIL</span><h2>Make your move</h2></div><div className="board-key"><span><i className="key-ladder" /> Ladder</span><span><i className="key-snake" /> Snake</span><span><i className="key-challenge" /> Challenge</span></div></div><div className="board-frame"><div className="board-flora flora-a">✦</div><div className="board-flora flora-b">✧</div><div className="forest-board">{tileNodes}<svg className="route-lines" viewBox="0 0 500 600" preserveAspectRatio="none" aria-hidden="true"><path d="M50 550 C150 550 350 550 450 550 C470 550 450 450 350 450 C250 450 150 450 50 450 C30 450 50 350 150 350 C250 350 350 350 450 350 C470 350 450 250 350 250 C250 250 150 250 50 250 C30 250 50 150 150 150 C250 150 350 150 450 150 C470 150 450 50 350 50 C250 50 150 50 50 50" /></svg></div><div className="board-event-labels"><span className="event-snake"><MoveDownRight size={13} /> 14 → 7</span><span className="event-ladder"><MoveUpRight size={13} /> 4 → 10</span><span className="event-ladder second-ladder"><MoveUpRight size={13} /> 18 → 25</span></div></div><div className="board-caption"><span><Sparkles size={13} /> Roll, move, solve, repeat. You cannot lose XP here.</span><span>{game.rolls} {game.rolls === 1 ? 'roll' : 'rolls'} taken</span></div></section>
      <aside className="quest-panel"><div className="quest-panel-top"><span className="section-kicker">{hi ? 'AGLA STEP' : 'YOUR NEXT STEP'}</span><span className={`quest-live ${moving || rolling ? 'is-moving' : ''}`}><i /> {moving || rolling ? (hi ? 'CHAL RAHA HAI' : 'MOVING') : pendingTile ? (hi ? 'CHALLENGE' : 'CHALLENGE') : (hi ? 'READY' : 'READY')}</span></div>{activeChallenge ? <div className="challenge-card"><div className={`challenge-emblem emblem-${activeChallenge.kind}`}><Swords size={18} /></div><div className="challenge-topic">{activeChallenge.topic} <span>· TILE {activeChallenge.tile}</span></div><h2>{activeChallenge.title}</h2><p className="challenge-prompt">{activeChallenge.prompt}</p><div className="challenge-answers">{activeChallenge.options.map((option, index) => <button key={option.id} disabled={feedback?.correct} onClick={() => answer(option.id)}><span>{String.fromCharCode(65 + index)}</span>{option.label}{feedback?.correct && option.id === activeChallenge.answer && <Check size={14} />}</button>)}</div>{feedback && <div className={`answer-feedback ${feedback.correct ? 'answer-correct' : 'answer-wrong'}`} role="status"><span>{feedback.correct ? (hi ? 'SAHI JAWAB' : 'RUNE SOLVED') : (hi ? 'DOBARA TRY KARO' : 'TRY AGAIN')}</span><p>{feedback.text}</p></div>}{feedback?.correct ? <button className="roll-button challenge-continue" onClick={() => setPendingTile(null)}>{hi ? 'Aage chalo' : 'Continue'} <ArrowRight size={14} /></button> : <button className="hint-reveal" onClick={() => setShowHint(!showHint)}><Sparkles size={13} /> {showHint ? activeChallenge.hint : hi ? 'Ek hint dekho' : 'Reveal a gentle hint'}</button>}</div> : <div className="next-step-card"><div className={`dice-cube ${rolling ? 'dice-rolling' : ''}`}>{dice ? <span>{dice}</span> : <Dice5 size={26} />}</div><h2>{game.won ? (hi ? 'Naya realm ready hai.' : 'A new realm awaits.') : game.position === BOARD_LENGTH ? (hi ? 'Portal par pahunch gaye.' : 'Portal reached.') : `Tile ${game.position} · ${visibleTileLabels[tileKind(game.position)]}`}</h2><p>{game.won ? (nextWorld ? (hi ? `${worldNameHi[nextWorld.id]} unlock ho gaya. Upar jaakar enter karo.` : `${nextWorld.name} is unlocked. Use the continue action above.`) : (hi ? 'Saare worlds complete!' : 'All worlds complete!')) : message}</p><div className="last-roll">{dice ? <><span>{hi ? 'LAST ROLL' : 'LAST ROLL'}</span><strong>{dice}</strong><span>{hi ? 'SPACES' : 'SPACES'}</span></> : <><span>{hi ? 'EK DIE' : 'ONE DIE'}</span><strong>1–6</strong><span>{hi ? 'SPACES' : 'SPACES'}</span></>}</div><button className="roll-button" disabled={moving || rolling || pendingTile !== null || game.won || !ready} onClick={() => void roll()}>{rolling ? <><Sparkles size={16} /> {hi ? 'Roll ho raha hai...' : 'Rolling...'}</> : moving ? <><ArrowRight size={16} /> {hi ? 'Aage badh rahe...' : 'Moving...'}</> : game.won ? <><Trophy size={16} /> {hi ? 'World complete' : 'World complete'}</> : <><Dice5 size={16} /> {hi ? 'Dice roll karo' : 'Roll the die'} <ArrowRight size={15} /></>}</button><span className="roll-note">{hi ? 'Lives nahi. XP penalty nahi. Apne pace par seekho.' : 'No lives. No XP penalties. Learn at your pace.'}</span></div>}
        <div className="quest-panel-bottom"><span><Zap size={13} /> {hi ? 'AGLA REWARD' : 'NEXT REWARD'}</span><strong>{activeChallenge ? `+${activeChallenge.reward} XP` : '+25–100 XP'}</strong></div><div className="save-indicator"><i /> {preview ? (hi ? 'Is browser mein save hai' : 'Saved in this browser') : saveError ? 'Cloud save needs attention' : 'Progress syncs to your account'}</div></aside>
    </section>}
    <footer className="game-footer"><span><Crown size={13} /> THE ARCANE ACADEMY OF ALGORITHMS</span><span>{hi ? `World ${worldIndex + 1} of 9 · Progress isi browser mein saved hai` : `World ${worldIndex + 1} of 9 · Progress saves as you play`}</span></footer>
    {previewWorld && (() => {
      const theory = WORLD_THEORY[previewWorld.id]
      const unlocked = isUnlocked(previewWorld.id)
      const isActive = previewWorld.id === game.worldId
      const unlockTile = WORLD_UNLOCK_TILES[previewWorld.id]
      const title = hi ? (theory?.titleHi || worldNameHi[previewWorld.id]) : (theory?.title || previewWorld.name)
      const subtitle = hi ? (theory?.subtitleHi || previewWorld.subtitle) : (theory?.subtitle || previewWorld.subtitle)
      const overview = hi ? (theory?.overviewHi || theory?.overview) : (theory?.overview || `${previewWorld.subtitle}. Topics: ${previewWorld.focus}.`)

      return (
        <div className="world-modal-backdrop" role="presentation" onClick={() => setWorldPreview(null)}>
          <section
            className="world-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="world-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="world-modal-close-btn" aria-label="Close" onClick={() => setWorldPreview(null)}>
              ×
            </button>

            <header className="world-modal-header">
              <div className="world-modal-header-top">
                <span className={`world-modal-badge ${unlocked ? 'is-unlocked' : 'is-locked'}`}>
                  {unlocked ? <CheckCircle2 size={13} /> : <LockKeyhole size={12} />}
                  {unlocked
                    ? (hi ? `WORLD UNLOCKED` : `WORLD UNLOCKED`)
                    : (hi ? `LOCKED · TILE ${unlockTile} LESSON CHAHIYE` : `LOCKED · REACH TILE ${unlockTile} LESSON`)}
                </span>
                {isActive && (
                  <span className="world-modal-badge is-unlocked">
                    <Sparkles size={12} /> {hi ? 'CURRENT REALM' : 'CURRENT REALM'}
                  </span>
                )}
              </div>

              <h2 id="world-modal-title">{title}</h2>
              <p className="world-modal-subtitle">{subtitle}</p>

              <div className={`world-modal-banner ${unlocked ? 'banner-unlocked' : 'banner-locked'}`}>
                {unlocked ? (
                  <>
                    <Sparkles size={16} />
                    <span>
                      {hi
                        ? `✨ Ye world unlock ho chuka hai! Iski core theory, memory mechanics aur real code examples neeche explore karein.`
                        : `✨ Unlocked! Explore core theory, memory architectures, complexities, and real-world code examples below.`}
                    </span>
                  </>
                ) : (
                  <>
                    <LockKeyhole size={16} />
                    <span>
                      {hi
                        ? `🔒 Unlock condition: Board par Tile ${unlockTile} (Lesson) tak pahunchein. Tab tak theory aur code examples preview kar sakte hain.`
                        : `🔒 Unlock condition: Reach Tile ${unlockTile} (Lesson) on the board. You can preview the theory and code examples below!`}
                    </span>
                  </>
                )}
              </div>
            </header>

            <nav className="world-modal-tabs">
              <button
                className={`world-tab-btn ${theoryTab === 'theory' ? 'tab-active' : ''}`}
                onClick={() => setTheoryTab('theory')}
              >
                <BookOpen size={14} /> {hi ? 'Theory aur Concepts' : 'Core Theory'}
              </button>
              <button
                className={`world-tab-btn ${theoryTab === 'examples' ? 'tab-active' : ''}`}
                onClick={() => setTheoryTab('examples')}
              >
                <Code2 size={14} /> {hi ? 'Code Examples' : 'Code Examples'}
              </button>
              <button
                className={`world-tab-btn ${theoryTab === 'complexity' ? 'tab-active' : ''}`}
                onClick={() => setTheoryTab('complexity')}
              >
                <Gauge size={14} /> {hi ? 'Time Complexity' : 'Complexity Matrix'}
              </button>
              <button
                className={`world-tab-btn ${theoryTab === 'takeaways' ? 'tab-active' : ''}`}
                onClick={() => setTheoryTab('takeaways')}
              >
                <Lightbulb size={14} /> {hi ? 'Important Takeaways' : 'Key Takeaways'}
              </button>
            </nav>

            <div className="world-modal-body">
              {theoryTab === 'theory' && (
                <>
                  <div className="world-overview-card">
                    <p>{overview}</p>
                  </div>

                  <div className="theory-concepts-list">
                    {theory?.concepts.map((concept, idx) => (
                      <article key={idx} className="theory-concept-card">
                        <h3>
                          <BookOpen size={16} /> {hi ? (concept.titleHi || concept.title) : concept.title}
                        </h3>
                        <p className="concept-summary">
                          {hi ? (concept.summaryHi || concept.summary) : concept.summary}
                        </p>
                        <ul>
                          {(hi && concept.bulletsHi ? concept.bulletsHi : concept.bullets).map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {theoryTab === 'examples' && (
                <div className="theory-examples-list">
                  {theory?.examples.map((example, idx) => (
                    <article key={idx} className="theory-example-card">
                      <header className="theory-example-header">
                        <h4>{hi ? (example.titleHi || example.title) : example.title}</h4>
                        <span className="complexity-badge">TypeScript / JS</span>
                      </header>
                      <p className="example-desc">
                        {hi ? (example.descriptionHi || example.description) : example.description}
                      </p>
                      <div className="theory-code-container">
                        <pre>
                          <code>{example.code}</code>
                        </pre>
                      </div>
                      <p className="example-explanation">
                        💡 <strong>{hi ? 'Samjhein' : 'Explanation'}:</strong>{' '}
                        {hi ? (example.explanationHi || example.explanation) : example.explanation}
                      </p>
                    </article>
                  ))}
                </div>
              )}

              {theoryTab === 'complexity' && (
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
                      {theory?.complexities.map((item, idx) => (
                        <tr key={idx}>
                          <td><strong>{item.operation}</strong></td>
                          <td><span className="complexity-badge">{item.time}</span></td>
                          <td><span className="complexity-badge">{item.space}</span></td>
                          <td>{hi ? (item.noteHi || item.note) : item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {theoryTab === 'takeaways' && (
                <div className="takeaways-card">
                  <h3>
                    <Lightbulb size={18} /> {hi ? 'Core Principles aur Best Practices' : 'Core Principles & Best Practices'}
                  </h3>
                  <ul className="takeaways-list">
                    {(hi && theory?.keyTakeawaysHi ? theory.keyTakeawaysHi : theory?.keyTakeaways || []).map((tip, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <footer className="world-modal-footer">
              {unlocked && !isActive && (
                <button
                  className="world-modal-btn-primary"
                  onClick={() => {
                    setGame((current) => switchWorld(current, previewWorld.id))
                    setWorldPreview(null)
                    setPendingTile(null)
                    setFeedback(null)
                    setDice(null)
                    setShowHint(false)
                    setMessage(hi
                      ? `${title} realm mein travel kiya! Roll karo naya safar shuru karne ke liye.`
                      : `Traveled to ${title}! Roll the die to begin this realm's path.`)
                  }}
                >
                  <Play size={14} /> {hi ? `${title} mein Travel Karo` : `Travel to ${title}`}
                </button>
              )}
              <button className="world-modal-btn-secondary" onClick={() => setWorldPreview(null)}>
                {hi ? 'Board par Wapas' : 'Back to Board'}
              </button>
            </footer>
          </section>
        </div>
      )
    })()}
  </main>
}