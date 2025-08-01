'use client'
import React from 'react'
import styles from './input.module.css'

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, disabled, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`${styles.input} ${className ?? ''}`}
      data-error={error}
      data-disabled={disabled}
      disabled={disabled}
      {...props}
    />
  )
})

export default Input
