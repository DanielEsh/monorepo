import { clsx } from 'clsx'
import React, { type InputHTMLAttributes, type ReactNode, useId } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  indeterminate?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, indeterminate = false, disabled, ...props }, ref) => {
    const id = useId()

    const isChecked = indeterminate ? false : (props.checked ?? props.defaultChecked ?? false)
    const dataState = indeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'

    return (
      <label
        htmlFor={id}
        className={clsx(
          'inline-flex items-center cursor-pointer select-none',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <div className="relative w-5 h-5">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            disabled={disabled}
            className="peer absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
            {...props}
          />
          <span
            data-state={dataState}
            className={clsx(
              'relative flex items-center justify-center w-full h-full border-2 border-gray-400 rounded transition-colors duration-200 bg-white',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-blue-400',
              {
                'bg-blue-600 border-blue-600': dataState === 'checked' || dataState === 'indeterminate',
              },
            )}
          >
            {/* Checked icon */}
            <svg
              className={clsx(
                'absolute inset-0 flex items-center justify-center w-full h-full text-black transition-opacity',
                dataState === 'checked' ? 'opacity-100' : 'opacity-0',
              )}
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M11.6666 4.0833L5.24992 10.5L2.33325 7.5833"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Indeterminate icon */}
            <svg
              className={clsx(
                'absolute inset-0 flex items-center justify-center w-full h-full text-black transition-opacity',
                dataState === 'indeterminate' ? 'opacity-100' : 'opacity-0',
              )}
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2.5 6H9.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {children && <span className="ml-2 text-sm text-gray-900">{children}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
