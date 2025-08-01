import { cache } from 'react'

import { QueryClient, type QueryClientConfig } from '@tanstack/react-query'

const STALE_TIME = 1000 * 60 * 5 // 5 minutes

export const config: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: STALE_TIME,
            retry: 0,
        },
        mutations: {
            onError: (error: Error) => {
                console.error(error.message)
            },
        },
    },
}

export const getQueryClient = cache(() => new QueryClient(config))
