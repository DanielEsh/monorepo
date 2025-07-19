'use client';

import React from 'react';
import { useAppForm } from '../hooks/useAppForm';
import { projectSchema, type ProjectFormData } from './schemas';
import Textfield from '../textfield/textfield';
import Checkbox from '../checkbox/checkbox';
import { Button } from '@repo/ui/button';

export function ProjectForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useAppForm(projectSchema, {
        // Начальные значения
        name: '',
        url: '',
        isPublished: true,
        hasAnalytics: false,
    });

    const onSubmit = (data: ProjectFormData) => {
        // Здесь будет логика отправки данных на сервер
        console.log('Данные формы проекта:', data);
        return new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация запроса
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Textfield
                label="Наименование проекта"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <Textfield
                label="Ссылка на проект"
                {...register('url')}
                error={!!errors.url}
                helperText={errors.url?.message}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
                <Checkbox {...register('isPublished')}>
                    Опубликовать
                </Checkbox>
                <Checkbox {...register('hasAnalytics')}>
                    Включить аналитику
                </Checkbox>
            </div>

            <Button type="submit" disabled={isSubmitting} style={{ marginTop: '1rem' }}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить проект'}
            </Button>
        </form>
    );
}