export const buildMode = {
    production: 'production',
    development: 'development',
} as const

export type BuildMode = typeof buildMode[keyof typeof buildMode]