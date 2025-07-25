'use client'

import React, { useEffect, useState, createContext, useContext } from 'react'
import { createClient } from '../../../../utils/superbase/client'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

// Create context for sharing auth state
const AuthContext = createContext<{
  user: User | null
  session: Session | null
  loading: boolean
}>({
  user: null,
  session: null,
  loading: true
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        console.log('Auth state changed:', event, session)
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            // Redirect to dashboard or home page
            router.push('/ok')
            break
          case 'SIGNED_OUT':
            // Redirect to login page
            router.push('/login')
            break
          case 'TOKEN_REFRESHED':
            // Token was refreshed, session updated
            break
        }
      }, 0)
    })

    return () => subscription.unsubscribe()
  }, [router])

  return React.createElement(AuthContext.Provider, 
    { value: { user, session, loading } }, 
    children
  )
}