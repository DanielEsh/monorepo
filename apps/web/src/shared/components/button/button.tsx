import { clsx } from 'clsx'
import React, { forwardRef } from 'react'

import type { ButtonProps } from './types'
import { UnstyledButton } from './unstyled-button/unstyled-button'

const COMPONENT_NAME = 'Button'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'default', children, className, prefixSlot, suffixSlot, type = 'button', ...restProps },
    forwardedRef,
  ) => {
    const _className = clsx('rounded-md', className, {
      'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
    })

    return (
      <UnstyledButton
        type={type}
        ref={forwardedRef}
        className={_className}
        {...restProps}
      >
        {prefixSlot}
        {children}
        {suffixSlot}
      </UnstyledButton>
    )
  },
)

Button.displayName = COMPONENT_NAME
