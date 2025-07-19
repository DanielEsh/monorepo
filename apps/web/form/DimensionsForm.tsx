'use client';

import React from 'react';
import { useAppForm } from '../hooks/useAppForm';
import { dimensionsSchema, type DimensionsFormData } from './schemas';
import Textfield from '../textfield/textfield';
import Intfield from '../intfield/intfield';
import { Button } from '@repo/ui/button';

export function DimensionsForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useAppForm(dimensionsSchema);

    const onSubmit = (data: DimensionsFormData) => {
        console.log('Данные формы габаритов:', data);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Textfield
                label="Материал"
                {...register('material')}
                error={!!errors.material}
                helperText={errors.material?.message}
            />
            <Textfield
                label="Цвет"
                {...register('color')}
                error={!!errors.color}
                helperText={errors.color?.message}
            />
            <Textfield
                label="Артикул (необязательно)"
                {...register('vendorCode')}
                error={!!errors.vendorCode}
                helperText={errors.vendorCode?.message}
            />
            <Intfield
                label="Ширина (см)"
                {...register('width')}
                error={!!errors.width}
                helperText={errors.width?.message}
            />
            <Intfield
                label="Высота (см)"
                {...register('height')}
                error={!!errors.height}
                helperText={errors.height?.message}
            />

            <button type="submit" disabled={isSubmitting} style={{ marginTop: '1rem' }}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить габариты'}
            </button>
        </form>
    );
}