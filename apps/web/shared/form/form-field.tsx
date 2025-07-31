import {Children, isValidElement, cloneElement, ReactNode} from 'react'
import { Controller, useFormContext, type FieldValues } from 'react-hook-form'

export interface FormFieldProps {
    children: ReactNode
    className?: string
    name: string
    onBlur?(): void
}

interface childrenFormProps extends FieldValues {
    invalid: boolean
}

export const FormField = (props: FormFieldProps) => {
    const { children, className, name, onBlur } = props
    const { control } = useFormContext()

    const childrenWithFormFieldProps = (fieldProps: childrenFormProps) => {
        return Children.map(children, (child) => {
            if (isValidElement(child)) {
                return cloneElement(child, fieldProps)
            }
            return child
        })
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className={className} aria-invalid={fieldState.invalid}>
                    {childrenWithFormFieldProps({
                        invalid: fieldState.invalid,
                        ...field,
                    })}

                    <div className="text-red-500">{fieldState.error?.message}</div>
                </div>
            )}
        />
    )
}
