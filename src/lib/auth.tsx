import React, { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'EN' | 'HI'
export type AvatarId = 'scholar' | 'spark' | 'wayfinder' | 'alchemist' | string
export type House = 'Gryffindor' | 'Ravenclaw' | 'Slytherin' | 'Hufflepuff'

export interface Profile {
  id: string
  display_name: string
  avatar: AvatarId
  language: Language
  goal: string
  onboarding_complete: boolean
  assessment_score: number
  house?: House | string
}

export interface AuthValue {
  user: any
  profile: Profile | null
  loading: boolean
  isPreview: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string } | void>
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: string } | boolean | void>
  signOut: () => Promise<void>
  enterPreview: () => void
  exitPreview: () => void
  setLanguage: (lang: Language) => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState<boolean>(() => {
    return localStorage.getItem('dsaverse_is_preview') === 'true'
  })

  const [profile, setProfile] = useState<Profile | null>(() => {
    const saved = localStorage.getItem('dsaverse_profile')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
    return {
      id: 'demo-wizard',
      display_name: 'Aarav Mehta',
      avatar: 'scholar',
      language: 'EN',
      goal: 'DSA Mastery',
      onboarding_complete: true,
      assessment_score: 100,
      house: 'Gryffindor'
    }
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      localStorage.setItem('dsaverse_profile', JSON.stringify(profile))
    } else {
      localStorage.removeItem('dsaverse_profile')
    }
  }, [profile])

  useEffect(() => {
    localStorage.setItem('dsaverse_is_preview', String(isPreview))
  }, [isPreview])

  const signIn = async (email: string, _pass: string) => {
    setLoading(true)
    setIsPreview(false)
    const namePart = email.split('@')[0] || 'Apprentice'
    const newProfile: Profile = {
      id: 'user_' + Date.now(),
      display_name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      avatar: 'scholar',
      language: 'EN',
      goal: 'DSA Mastery',
      onboarding_complete: false,
      assessment_score: 0,
      house: 'Gryffindor'
    }
    setProfile(newProfile)
    setLoading(false)
  }

  const signUp = async (email: string, _pass: string, name?: string) => {
    setLoading(true)
    setIsPreview(false)
    const newProfile: Profile = {
      id: 'user_' + Date.now(),
      display_name: name || email.split('@')[0] || 'Apprentice',
      avatar: 'scholar',
      language: 'EN',
      goal: 'DSA Mastery',
      onboarding_complete: false,
      assessment_score: 0,
      house: 'Gryffindor'
    }
    setProfile(newProfile)
    setLoading(false)
  }

  const signOut = async () => {
    setIsPreview(false)
    setProfile(null)
  }

  const enterPreview = () => {
    setIsPreview(true)
    setProfile({
      id: 'preview-apprentice',
      display_name: 'Demo Apprentice',
      avatar: 'scholar',
      language: 'EN',
      goal: 'DSA Mastery',
      onboarding_complete: true,
      assessment_score: 100,
      house: 'Gryffindor'
    })
  }

  const exitPreview = () => {
    setIsPreview(false)
    setProfile(null)
  }

  const setLanguage = async (lang: Language): Promise<void> => {
    setProfile((prev) => (prev ? { ...prev, language: lang } : null))
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updates } : null))
  }

  return (
    <AuthContext.Provider
      value={{
        user: profile ? { id: profile.id } : null,
        profile,
        loading,
        isPreview,
        signIn,
        signUp,
        signOut,
        enterPreview,
        exitPreview,
        setLanguage,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}