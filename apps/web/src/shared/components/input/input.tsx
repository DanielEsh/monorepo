import { clsx } from 'clsx'
import { forwardRef, type InputHTMLAttributes } from 'react'

const COMPONENT_NAME = 'Input'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, forwardedRef) => {
    return (
      <input
        type={type}
        className={clsx(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={forwardedRef}
        {...props}
      />
    )
  },
)
Input.displayName = COMPONENT_NAME
