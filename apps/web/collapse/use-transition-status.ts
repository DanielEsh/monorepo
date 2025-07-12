import { useState, useEffect, useRef } from 'react';

// Определяем возможные состояния перехода
export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

interface UseTransitionStatusArgs {
    in: boolean; // Открыт ли компонент
    timeout?: number; // Длительность анимации в мс
}

interface UseTransitionStatusResult {
    status: TransitionStatus;
    hasExited: boolean;
}

/**
 * Хук для управления состояниями CSS-переходов.
 * Аналог логики из MUI Base UI и react-transition-group.
 */
export function useTransitionStatus({ in: inProp, timeout = 200 }: UseTransitionStatusArgs): UseTransitionStatusResult {
    const [status, setStatus] = useState<TransitionStatus>(inProp ? 'entered' : 'exited');
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Очищаем предыдущий таймер при изменении inProp или размонтировании
        const clearTimer = () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
                timeoutId.current = null;
            }
        };

        if (inProp) {
            // Когда `in` становится true
            clearTimer();
            setStatus('entering'); // 1. Начинаем вход

            // Запускаем таймер, чтобы после его окончания перейти в состояние 'entered'
            timeoutId.current = setTimeout(() => {
                setStatus('entered'); // 2. Вход завершен
                timeoutId.current = null;
            }, timeout);

        } else {
            // Когда `in` становится false
            clearTimer();
            setStatus('exiting'); // 1. Начинаем выход

            // Запускаем таймер на время анимации
            timeoutId.current = setTimeout(() => {
                setStatus('exited'); // 2. Выход завершен
                timeoutId.current = null;
            }, timeout);
        }

        // Очистка при размонтировании
        return clearTimer;
    }, [inProp, timeout]);

    return {
        status,
        hasExited: status === 'exited',
    };
}