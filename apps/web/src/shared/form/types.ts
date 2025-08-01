import type { SubmitHandler } from 'react-hook-form'
import type { ZodType } from 'zod'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FormFieldValues = Record<string, any>
export type FormSchema<Values extends FormFieldValues> = ZodType<Values>
export type FormDefaultValues<Values extends FormFieldValues> = Partial<Values>
export type FormSubmitHandler<Values extends FormFieldValues> = SubmitHandler<Values>
