import { describe, expect, it } from 'vitest'
import { advanceToNextWorld, completeChallenge, createInitialProgress, enterUnlockedWorld, resolveTileTransition, rollDestination, syncLessonUnlocks, tileKind, WORLD_IDS } from './gameRules'
import { getWorldChallenges } from './worldQuestions'

describe('Logic Forest board rules', () => {
  it('moves by the dice count and stops at the guardian until its challenge is cleared', () => {
    expect(rollDestination(1, 4)).toBe(5)
    expect(rollDestination(26, 6)).toBe(29)
    expect(rollDestination(26, 6, true)).toBe(30)
    expect(() => rollDestination(1, 0)).toThrow(RangeError)
  })

  it('resolves the visible snake and ladder destinations', () => {
    expect(resolveTileTransition(14)).toEqual({ kind: 'snake', destination: 7 })
    expect(resolveTileTransition(18)).toEqual({ kind: 'ladder', destination: 25 })
    expect(resolveTileTransition(12)).toBeNull()
  })

  it('awards a challenge once and never farms XP from a repeat answer', () => {
    const first = completeChallenge(createInitialProgress(), 2, 25)
    const repeat = completeChallenge(first.progress, 2, 25)
    expect(first.rewarded).toBe(true)
    expect(first.progress.xp).toBe(25)
    expect(repeat.rewarded).toBe(false)
    expect(repeat.progress.xp).toBe(25)
    expect(repeat.progress.completedChallenges).toEqual([2])
  })

  it('only unlocks Array Kingdom after the guardian and finish tile', () => {
    const initial = createInitialProgress()
    expect(advanceToNextWorld({ ...initial, position: 30 }).unlockedWorldIds).toEqual(['logic-forest'])
    const defeated = completeChallenge({ ...initial, position: 29 }, 29, 100).progress
    const unlocked = advanceToNextWorld({ ...defeated, position: 30 })
    expect(unlocked.won).toBe(true)
    expect(unlocked.unlockedWorldIds).toEqual(['logic-forest', 'array-kingdom'])
  })

  it('unlocks every world in order and carries earned XP into the next world', () => {
    let progress = createInitialProgress()
    for (let index = 0; index < WORLD_IDS.length; index++) {
      const worldId = WORLD_IDS[index]
      expect(progress.worldId).toBe(worldId)
      const defeated = completeChallenge({ ...progress, position: 29 }, 29, 100).progress
      const completed = advanceToNextWorld({ ...defeated, position: 30 })
      expect(completed.won).toBe(true)
      expect(completed.unlockedWorldIds).toContain(worldId)
      const nextWorldId = WORLD_IDS[index + 1]
      if (!nextWorldId) break
      expect(completed.unlockedWorldIds).toContain(nextWorldId)
      const skipTarget = WORLD_IDS[index + 2]
      if (skipTarget) expect(enterUnlockedWorld(completed, skipTarget)).toEqual(completed)
      progress = enterUnlockedWorld(completed, nextWorldId)
      expect(progress.position).toBe(1)
      expect(progress.xp).toBe(completed.xp)
      expect(progress.completedChallenges).toEqual([])
    }
    expect(progress.unlockedWorldIds).toEqual([...WORLD_IDS])
  })

  it('provides distinct, correctly translated challenge paths for each world', () => {
    for (const worldId of WORLD_IDS.slice(1)) {
      const english = getWorldChallenges(worldId, 'EN')
      const hinglish = getWorldChallenges(worldId, 'HI')
      expect(english).toHaveLength(5)
      expect(english[0].prompt).not.toBe(hinglish[0].prompt)
      expect(english[4].kind).toBe('boss')
      expect(english.map((challenge) => challenge.tile)).toEqual([2, 11, 17, 23, 29])
    }
  })

  it('labels challenge and finish tiles consistently', () => {
    expect(tileKind(2)).toBe('quiz')
    expect(tileKind(29)).toBe('boss')
    expect(tileKind(30)).toBe('finish')
  })

  it('unlocks Array Kingdom when reaching lesson tile 5 and subsequent worlds at lesson milestones', () => {
    const initial = createInitialProgress()
    expect(initial.unlockedWorldIds).toEqual(['logic-forest'])

    // At tile 4, Array Kingdom is not unlocked yet
    const atTile4 = { ...initial, position: 4 }
    expect(syncLessonUnlocks(atTile4).progress.unlockedWorldIds).toEqual(['logic-forest'])

    // Reaching lesson tile 5 unlocks Array Kingdom
    const atTile5 = { ...initial, position: 5 }
    const res5 = syncLessonUnlocks(atTile5)
    expect(res5.newlyUnlocked).toBe('array-kingdom')
    expect(res5.progress.unlockedWorldIds).toContain('array-kingdom')

    // Reaching lesson tile 8 unlocks Sorting Citadel
    const atTile8 = { ...res5.progress, position: 8 }
    const res8 = syncLessonUnlocks(atTile8)
    expect(res8.newlyUnlocked).toBe('sorting-citadel')
    expect(res8.progress.unlockedWorldIds).toContain('sorting-citadel')
  })
})