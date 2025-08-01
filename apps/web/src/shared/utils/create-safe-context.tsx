import { ReactNode } from 'react'
import { createContext, useContext } from 'react'

interface ProviderProps<ContextValue> {
  value: ContextValue
  children: ReactNode
}

export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null)

  const useSafeContext = () => {
    const ctx = useContext(Context)

    if (ctx === null) {
      throw new Error(errorMessage)
    }

    return ctx
  }

  const Provider = ({ children, value }: ProviderProps<ContextValue>) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  )

  return [Provider, useSafeContext] as const
}
