'use client'
import React, { useState, useId, PropsWithChildren } from 'react'
import { useTransitionStatus } from './use-transition-status' // Импортируем наш хук
import styles from './collapsible.module.css' // Импортируем стили как модуль

type CollapsibleProps = PropsWithChildren<{
  title: React.ReactNode
  initialOpen?: boolean
}>

const ANIMATION_TIMEOUT = 200 // Должно совпадать с transition-duration в CSS

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ title, children, initialOpen = false }, ref) => {
    const [isOpen, setIsOpen] = useState(initialOpen)
    const contentId = useId()

    // Получаем статус анимации из нашего хука
    const { status, hasExited } = useTransitionStatus({
      in: isOpen,
      timeout: ANIMATION_TIMEOUT,
    })

    const handleToggle = () => {
      setIsOpen((prev) => !prev)
    }

    return (
      <div
        className={styles.root}
        ref={ref}
      >
        <button
          type="button"
          className={styles.trigger}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          {title}
        </button>

        {/* Скрываем элемент из DOM и дерева доступности только после завершения анимации выхода */}
        <div
          id={contentId}
          className={styles.content}
          data-status={status} // Передаем статус в data-атрибут для CSS
          hidden={hasExited}
        >
          <div className={styles.contentInner}>
            <div className={styles.contentPadding}>{children}</div>
          </div>
        </div>
      </div>
    )
  },
)

export default Collapsible
