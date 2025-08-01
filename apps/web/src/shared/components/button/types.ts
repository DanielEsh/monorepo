import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type UnstyledButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export interface ButtonProps extends UnstyledButtonProps {
  variant?: 'default' | 'secondary' | 'link'
  prefixSlot?: ReactNode
  suffixSlot?: ReactNode
  children: ReactNode
}
