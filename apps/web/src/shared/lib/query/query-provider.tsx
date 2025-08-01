'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { getQueryClient } from './query-config'

interface Props {
  children: ReactNode
}

export const QueryProvider = ({ children }: Props) => {
  const client = getQueryClient()

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
