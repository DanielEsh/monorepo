'use client'
import React, { useId } from 'react';
import Input from '../input/input';
import fieldStyles from './textfield.module.css';

type IntfieldProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'type'> & {
    label?: string;
    error?: boolean;
    helperText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const Intfield = React.forwardRef<HTMLInputElement, IntfieldProps>(
    ({ label, error, helperText, onChange, ...props }, ref) => {
        const id = useId();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Оставляем только цифры
            const filteredValue = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = filteredValue;

            if (onChange) {
                onChange(e, filteredValue);
            }
        };

        return (
            <div className={fieldStyles.root}>
                {label && <label htmlFor={id} className={fieldStyles.label}>{label}</label>}
                <Input
                    id={id}
                    ref={ref}
                    error={error}
                    onChange={handleChange}
                    // Для мобильных устройств добавим правильную клавиатуру
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...props}
                />
                {helperText && (
                    <p className={`${fieldStyles.helperText} ${error ? fieldStyles.errorText : ''}`}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

export default Intfield;