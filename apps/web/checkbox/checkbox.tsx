'use client'
import React, { useId, PropsWithChildren } from 'react';
import styles from './checkbox.module.css';

type CheckboxProps = PropsWithChildren<
    Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
    /**
     * Если true, отображает промежуточное состояние.
     */
    indeterminate?: boolean;
}
>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ children, className, indeterminate = false, disabled, ...props }, ref) => {
        const id = useId();
        const isChecked = indeterminate ? false : props.checked ?? props.defaultChecked ?? false;

        const dataState = indeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked';

        return (
            <label
                htmlFor={id}
                className={`${styles.root} ${className ?? ''}`}
                data-disabled={disabled}
            >
                <input
                    type="checkbox"
                    id={id}
                    className={styles.input}
                    ref={ref}
                    disabled={disabled}
                    {...props}
                />
                <span className={styles.indicator} data-state={dataState}>
          {/* Иконка для галочки */}
                    <svg
                        className={styles.icon}
                        data-visible={dataState === 'checked'}
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                    >
            <path d="M11.6666 4.0833L5.24992 10.5L2.33325 7.5833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

                    {/* Иконка для промежуточного состояния */}
                    <svg
                        className={styles.icon}
                        data-visible={dataState === 'indeterminate'}
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
             <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
                {children && <span className={styles.label}>{children}</span>}
            </label>
        );
    }
);

export default Checkbox;