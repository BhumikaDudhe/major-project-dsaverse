export type TileKind = 'start' | 'quiz' | 'lesson' | 'visualizer' | 'treasure' | 'checkpoint' | 'snake' | 'ladder' | 'boss' | 'finish'
export type GameProgress = {
  worldId: string
  position: number
  checkpoint: number
  xp: number
  level: number
  rolls: number
  completedChallenges: number[]
  claimedRewards: number[]
  unlockedWorldIds: string[]
  won: boolean
}

export const WORLD_IDS = ['logic-forest', 'array-kingdom', 'sorting-citadel', 'recursion-maze', 'linked-caverns', 'structure-tower', 'wisdom-tree', 'graph-portal', 'dp-realm'] as const
export const BOARD_LENGTH = 30
export const SNAKES: Record<number, number> = { 14: 7, 22: 16, 28: 20 }
export const LADDERS: Record<number, number> = { 4: 10, 9: 15, 18: 25 }
export const CHALLENGE_TILES = [2, 6, 11, 15, 17, 23, 25, 27, 29]
export const CHECKPOINT_TILES = [1, 13, 26]

export const LESSON_WORLD_UNLOCKS: Record<number, string> = {
  5: 'array-kingdom',
  8: 'sorting-citadel',
  10: 'recursion-maze',
  16: 'linked-caverns',
  19: 'structure-tower',
  20: 'wisdom-tree',
  24: 'graph-portal',
  29: 'dp-realm',
}

export function syncLessonUnlocks(progress: GameProgress): { progress: GameProgress; newlyUnlocked: string | null } {
  let updated = [...progress.unlockedWorldIds]
  let newlyUnlocked: string | null = null

  // Check all lesson thresholds reached at or before current position
  for (const [tileStr, worldId] of Object.entries(LESSON_WORLD_UNLOCKS)) {
    const tile = Number(tileStr)
    if (progress.position >= tile && !updated.includes(worldId)) {
      updated.push(worldId)
      if (!newlyUnlocked) newlyUnlocked = worldId
    }
  }

  if (updated.length !== progress.unlockedWorldIds.length) {
    return { progress: { ...progress, unlockedWorldIds: updated }, newlyUnlocked }
  }
  return { progress, newlyUnlocked: null }
}

export function switchWorld(progress: GameProgress, targetWorldId: string): GameProgress {
  if (!WORLD_IDS.includes(targetWorldId as typeof WORLD_IDS[number]) || !progress.unlockedWorldIds.includes(targetWorldId)) {
    return progress
  }
  return {
    ...progress,
    worldId: targetWorldId,
    position: 1,
    checkpoint: 1,
    rolls: 0,
    completedChallenges: [],
    claimedRewards: [],
    won: false,
  }
}

export function createInitialProgress(worldId: string = WORLD_IDS[0]): GameProgress {
  if (!WORLD_IDS.includes(worldId as typeof WORLD_IDS[number])) throw new RangeError('Unknown learning world.')
  return { worldId, position: 1, checkpoint: 1, xp: 0, level: 1, rolls: 0, completedChallenges: [], claimedRewards: [], unlockedWorldIds: [WORLD_IDS[0]], won: false }
}

export function rollDestination(position: number, roll: number, guardianDefeated = false): number {
  if (!Number.isInteger(roll) || roll < 1 || roll > 6) throw new RangeError('A dice roll must be an integer from 1 to 6.')
  if (!Number.isInteger(position) || position < 1 || position > BOARD_LENGTH) throw new RangeError('Board position must be between 1 and 30.')
  const finish = guardianDefeated ? BOARD_LENGTH : 29
  return Math.min(finish, position + roll)
}

export function resolveTileTransition(position: number): { kind: 'snake' | 'ladder'; destination: number } | null {
  if (SNAKES[position] !== undefined) return { kind: 'snake', destination: SNAKES[position] }
  if (LADDERS[position] !== undefined) return { kind: 'ladder', destination: LADDERS[position] }
  return null
}

export function tileKind(position: number): TileKind {
  if (position === 1) return 'start'
  if (CHALLENGE_TILES.includes(position)) return position === 29 ? 'boss' : position === 15 || position === 25 ? 'treasure' : 'quiz'
  if (position in SNAKES) return 'snake'
  if (position in LADDERS) return 'ladder'
  if (CHECKPOINT_TILES.includes(position)) return 'checkpoint'
  if ([7, 12, 21].includes(position)) return 'visualizer'
  if ([3, 5, 8, 10, 16, 18, 24].includes(position)) return 'lesson'
  if (position === BOARD_LENGTH) return 'finish'
  return 'lesson'
}

export function completeChallenge(progress: GameProgress, position: number, rewardXp: number): { progress: GameProgress; rewarded: boolean } {
  if (!CHALLENGE_TILES.includes(position)) throw new RangeError('There is no challenge on this tile.')
  if (progress.completedChallenges.includes(position) || progress.claimedRewards.includes(position)) return { progress, rewarded: false }
  const xp = progress.xp + rewardXp
  const completedChallenges = [...progress.completedChallenges, position]
  const claimedRewards = [...progress.claimedRewards, position]
  return { progress: { ...progress, xp, level: Math.floor(xp / 100) + 1, completedChallenges, claimedRewards }, rewarded: true }
}

export function advanceToNextWorld(progress: GameProgress): GameProgress {
  if (progress.position !== BOARD_LENGTH || !progress.completedChallenges.includes(29)) return progress
  const currentIndex = WORLD_IDS.indexOf(progress.worldId as typeof WORLD_IDS[number])
  const nextWorldId = WORLD_IDS[currentIndex + 1]
  if (!nextWorldId) return { ...progress, won: true }
  const unlockedWorldIds = progress.unlockedWorldIds.includes(nextWorldId)
    ? progress.unlockedWorldIds
    : [...progress.unlockedWorldIds, nextWorldId]
  return { ...progress, won: true, unlockedWorldIds }
}

export function enterUnlockedWorld(progress: GameProgress, worldId: string): GameProgress {
  const currentIndex = WORLD_IDS.indexOf(progress.worldId as typeof WORLD_IDS[number])
  const nextWorldId = WORLD_IDS[currentIndex + 1]
  if (!progress.won || worldId !== nextWorldId || !progress.unlockedWorldIds.includes(worldId)) return progress
  return {
    ...progress,
    worldId,
    position: 1,
    checkpoint: 1,
    rolls: 0,
    completedChallenges: [],
    claimedRewards: [],
    won: false,
  }
}

export function isValidProgress(value: unknown): value is GameProgress {
  if (!value || typeof value !== 'object') return false
  const progress = value as Partial<GameProgress>
  return typeof progress.worldId === 'string' && WORLD_IDS.includes(progress.worldId as typeof WORLD_IDS[number])
    && Number.isInteger(progress.position) && (progress.position ?? 0) >= 1 && (progress.position ?? 31) <= BOARD_LENGTH
    && Number.isInteger(progress.checkpoint) && (progress.checkpoint ?? 0) >= 1 && (progress.checkpoint ?? 31) <= BOARD_LENGTH
    && Number.isInteger(progress.xp) && (progress.xp ?? -1) >= 0
    && Number.isInteger(progress.level) && (progress.level ?? 0) >= 1
    && Number.isInteger(progress.rolls) && (progress.rolls ?? -1) >= 0
    && Array.isArray(progress.completedChallenges) && progress.completedChallenges.every((tile) => Number.isInteger(tile) && CHALLENGE_TILES.includes(tile))
    && Array.isArray(progress.claimedRewards) && progress.claimedRewards.every((tile) => Number.isInteger(tile) && CHALLENGE_TILES.includes(tile))
    && Array.isArray(progress.unlockedWorldIds) && progress.unlockedWorldIds.every((worldId) => typeof worldId === 'string')
    && typeof progress.won === 'boolean'
}