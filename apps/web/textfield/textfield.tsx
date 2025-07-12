'use client'
import React, { useId } from 'react';
import Input from '../input/input';
import fieldStyles from './textfield.module.css';

type TextfieldProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> & {
    label?: string;
    error?: boolean;
    helperText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
    ({ label, error, helperText, onChange, ...props }, ref) => {
        const id = useId();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Удаляем все цифры из значения
            const filteredValue = e.target.value.replace(/[0-9]/g, '');
            e.target.value = filteredValue; // Модифицируем событие "на лету"

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

export default Textfield;