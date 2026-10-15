import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type Language = 'EN' | 'HI'
export type AvatarId = 'apprentice' | 'scholar' | 'wayfinder' | 'spark'
export type Profile = {
  id: string
  display_name: string
  language: Language
  avatar: AvatarId
  daily_goal_minutes: number | null
  onboarding_complete: boolean
  assessment_score: number | null
}

type OnboardingInput = Pick<Profile, 'display_name' | 'language' | 'avatar' | 'daily_goal_minutes' | 'assessment_score'>
type LocalMode = 'demo' | 'guest'
type AuthValue = {
  user: User | null
  profile: Profile | null
  loading: boolean
  isPreview: boolean
  hasSupabase: boolean
  authError: string | null
  clearAuthError: () => void
  signUp: (email: string, password: string, displayName: string) => Promise<boolean>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  startPreview: (mode?: LocalMode) => void
  exitPreview: () => void
  saveOnboarding: (input: OnboardingInput) => Promise<void>
  setLanguage: (language: Language) => Promise<void>
}

const PREVIEW_KEY = 'dsaverse.local.active.v1'
const PREVIEW_PROFILE_KEY = 'dsaverse.local.profile.v1'
const DEMO_EMAIL = 'demo@dsaverse.test'
const DEMO_PASSWORD = 'Demo123!'
const AuthContext = createContext<AuthValue | null>(null)

function readActiveMode(): LocalMode | null {
  const mode = localStorage.getItem(PREVIEW_KEY)
  return mode === 'demo' || mode === 'guest' ? mode : null
}

function readPreviewProfile(mode: LocalMode | null): Profile | null {
  if (!mode) return null
  try {
    const raw = localStorage.getItem(`${PREVIEW_PROFILE_KEY}.${mode}`)
    return raw ? JSON.parse(raw) as Profile : null
  } catch { return null }
}

function createLocalProfile(mode: LocalMode): Profile {
  return { id: mode, display_name: mode === 'demo' ? 'Demo Apprentice' : 'Guest Explorer', language: 'EN', avatar: 'apprentice', daily_goal_minutes: 25, onboarding_complete: true, assessment_score: null }
}

async function readProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  if (error) throw error
  return data as Profile | null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [localMode, setLocalMode] = useState<LocalMode | null>(readActiveMode)
  const [isPreview, setIsPreview] = useState(() => readActiveMode() !== null)
  const [previewProfile, setPreviewProfile] = useState<Profile | null>(() => readPreviewProfile(readActiveMode()))
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (readActiveMode()) {
      setLoading(false)
      return
    }
    if (!supabase) {
      setLoading(false)
      return
    }

    let active = true
    void supabase.auth.getSession().then(async ({ data, error }) => {
      if (!active) return
      if (error) setAuthError(error.message)
      setSession(data.session)
      if (data.session?.user) {
        try { setProfile(await readProfile(data.session.user.id)) }
        catch (profileError) { setAuthError(profileError instanceof Error ? profileError.message : 'Could not load your profile.') }
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (!nextSession) { setProfile(null); setLoading(false); return }
      sessionStorage.removeItem(PREVIEW_KEY)
      setIsPreview(false)
      window.setTimeout(() => {
        void readProfile(nextSession.user.id).then(setProfile).catch((error: unknown) => {
          setAuthError(error instanceof Error ? error.message : 'Could not load your profile.')
        }).finally(() => setLoading(false))
      }, 0)
    })

    return () => { active = false; subscription.unsubscribe() }
  }, [])

  const value = useMemo<AuthValue>(() => ({
    user: localMode ? null : session?.user ?? null,
    profile: localMode ? previewProfile : profile,
    loading,
    isPreview,
    hasSupabase: supabase !== null,
    authError,
    clearAuthError: () => setAuthError(null),
    signUp: async (email, password, displayName) => {
      if (!supabase) throw new Error('Demo Login needs demo@dsaverse.test and Demo123!. Or choose Continue as Guest.')
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName, avatar: 'apprentice' } } })
      if (error) throw error
      return data.session === null
    },
    signIn: async (email, password) => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        const mode: LocalMode = 'demo'
        const savedProfile = readPreviewProfile(mode)
        const localProfile = savedProfile ?? createLocalProfile(mode)
        localStorage.setItem(PREVIEW_KEY, mode)
        if (!savedProfile) localStorage.setItem(`${PREVIEW_PROFILE_KEY}.${mode}`, JSON.stringify(localProfile))
        setLocalMode(mode); setPreviewProfile(localProfile); setIsPreview(true); setAuthError(null)
        return
      }
      if (!supabase) throw new Error('Use demo@dsaverse.test with Demo123!, or choose Continue as Guest.')
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    },
    signOut: async () => {
      if (!supabase) return
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    startPreview: (mode = 'guest') => {
      const savedProfile = readPreviewProfile(mode)
      const localProfile = savedProfile ?? createLocalProfile(mode)
      localStorage.setItem(PREVIEW_KEY, mode)
      if (!savedProfile) localStorage.setItem(`${PREVIEW_PROFILE_KEY}.${mode}`, JSON.stringify(localProfile))
      setLocalMode(mode); setPreviewProfile(localProfile); setIsPreview(true); setAuthError(null)
    },
    exitPreview: () => { localStorage.removeItem(PREVIEW_KEY); setLocalMode(null); setPreviewProfile(null); setIsPreview(false) },
    saveOnboarding: async (input) => {
      if (isPreview) {
        const preview = { id: 'preview', ...input, onboarding_complete: true }
        localStorage.setItem(`${PREVIEW_PROFILE_KEY}.${localMode ?? 'guest'}`, JSON.stringify({ ...preview, id: localMode ?? 'guest' }))
        setPreviewProfile(preview)
        return
      }
      if (!supabase || !session?.user) throw new Error('Your authenticated session is missing. Please sign in again.')
      const { data, error } = await supabase.from('profiles').upsert({ id: session.user.id, ...input, onboarding_complete: true }).select('*').single()
      if (error) throw error
      setProfile(data as Profile)
    },
    setLanguage: async (language) => {
      if (isPreview) {
        setPreviewProfile((current) => {
          if (!current) return current
          const updated = { ...current, language }
          localStorage.setItem(`${PREVIEW_PROFILE_KEY}.${localMode ?? 'guest'}`, JSON.stringify(updated))
          return updated
        })
        return
      }
      if (!supabase || !session?.user) return
      const { data, error } = await supabase.from('profiles').update({ language }).eq('id', session.user.id).select('*').single()
      if (error) throw error
      setProfile(data as Profile)
    },
  }), [session, profile, loading, isPreview, previewProfile, authError, localMode])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}