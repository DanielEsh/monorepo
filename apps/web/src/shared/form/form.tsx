'use client'
import { type ForwardedRef, forwardRef, type ReactNode } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import type { ZodType } from 'zod'

import { type FormContext, FormContextProvider } from './form.context'
import { FormField } from './form-field'
import { useForm } from './use-form'

export interface FormProps<Values extends FieldValues> {
  schema: ZodType<Values>
  children: ReactNode
  defaultValues?: Partial<Values>
  onSubmit: SubmitHandler<any>
}

export const FormImpl = forwardRef(
  <Values extends FieldValues>(props: FormProps<Values>, ref: ForwardedRef<HTMLFormElement>) => {
    const { schema, defaultValues, onSubmit, children } = props

    const { control, errors, handleSubmit } = useForm({
      schema,
      defaultValues,
    })

    const formContextValue: FormContext = {
      control,
      errors,
    }

    return (
      <FormContextProvider value={formContextValue}>
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </FormContextProvider>
    )
  },
)

FormImpl.displayName = 'FormImpl'

export const Form = Object.assign(FormImpl, {
  Field: FormField,
})

Form.displayName = 'Form'
