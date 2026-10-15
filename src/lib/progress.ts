import { supabase } from './supabase'
import { createInitialProgress, isValidProgress, type GameProgress } from './gameRules'

const PREVIEW_PROGRESS_KEY = 'dsaverse.local.progress.v1'

function localProgressKey(userId: string | null) {
  return `${PREVIEW_PROGRESS_KEY}.${userId === 'demo' ? 'demo' : 'guest'}`
}

export async function loadProgress(userId: string | null, preview: boolean): Promise<GameProgress> {
  if (preview) {
    const raw = localStorage.getItem(localProgressKey(userId))
    if (!raw) return createInitialProgress()
    try { const value: unknown = JSON.parse(raw); return isValidProgress(value) ? value : createInitialProgress() }
    catch { return createInitialProgress() }
  }
  if (!userId || !supabase) return createInitialProgress()
  const { data, error } = await supabase.from('game_progress').select('state').eq('user_id', userId).maybeSingle()
  if (error) throw error
  return isValidProgress(data?.state) ? data.state : createInitialProgress()
}

export async function saveProgress(userId: string | null, preview: boolean, state: GameProgress): Promise<void> {
  if (preview) { localStorage.setItem(localProgressKey(userId), JSON.stringify(state)); return }
  if (!userId || !supabase) throw new Error('Authenticated progress storage is unavailable.')
  const { error } = await supabase.from('game_progress').upsert({ user_id: userId, world_id: state.worldId, board_position: state.position, xp: state.xp, level: state.level, state, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
  if (error) throw error
}