import { clsx } from 'clsx'
import React, { forwardRef } from 'react'

import type { UnstyledButtonProps } from '../types'
import styles from './unstyled-button.module.css'

const COMPONENT_NAME = 'UnstyledButton'

export const UnstyledButton = forwardRef<HTMLButtonElement, UnstyledButtonProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const _className = clsx(styles.root, className)

    return (
      <button
        type="button"
        ref={forwardedRef}
        className={_className}
        {...restProps}
      >
        {children}
      </button>
    )
  },
)

UnstyledButton.displayName = COMPONENT_NAME
