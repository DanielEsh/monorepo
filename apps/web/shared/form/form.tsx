import {forwardRef, FormHTMLAttributes, ReactNode} from 'react'
import {
    FormProvider,
    type FieldValues as ReactHookFormFieldValues,
    type SubmitHandler,
    type UseFormReturn,
} from 'react-hook-form'
import { FormField } from './form-field'

export interface FormProps<FieldValues extends ReactHookFormFieldValues> {
    className: string;
    children: ReactNode
    methods: UseFormReturn<FieldValues>
    id?: string
    onReset?: () => void
    onSubmit: SubmitHandler<FieldValues>
}

const COMPONENT_NAME = 'Form'

export const FormImpl = forwardRef<HTMLFormElement, FormProps<any>>(
    (props, forwardedRef) => {
        const { children, className, methods, onSubmit, onReset, ...restProps } =
            props

        return (
            <FormProvider {...methods}>
                <form
                    ref={forwardedRef}
                    className={className}
                    onReset={onReset}
                    {...restProps}
                >
                    {children}
                </form>
        </FormProvider>
    )
    },
)

export const Form = Object.assign(FormImpl, {
    Field: FormField,
})
Form.displayName = COMPONENT_NAME


