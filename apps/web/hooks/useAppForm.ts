import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Абстрактный хук для работы с формами в проекте.
 * Он принимает схему валидации Zod и возвращает все необходимое
 * от react-hook-attribute с уже настроенным резолвером.
 *
 * @param schema - Схема валидации Zod.
 * @param defaultValues - Начальные значения для полей формы.
 */
export function useAppForm<T extends z.ZodType<any, any, any>>(
    schema: T,
    defaultValues?: z.infer<T>
) {
    // z.infer<T> автоматически выводит тип данных из схемы Zod!
    const form = useForm<z.infer<T>>({
        // Используем zodResolver для интеграции Zod с react-hook-attribute
        resolver: zodResolver(schema),
        // Устанавливаем значения по умолчанию
        defaultValues,
    });

    return form;
}