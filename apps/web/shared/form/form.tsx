'use client'
import React, {forwardRef, ReactNode} from "react";
import {FormContext, FormContextProvider} from "./form.context";
import {useForm} from "./use-form";
import {FormField} from "./form-field";
import {SubmitHandler} from "react-hook-form";

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    schema: any;
    defaultValues?: any;
    children: ReactNode
    onSubmit: SubmitHandler<any>;
}

export const FormImpl = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
    const {schema, defaultValues, onSubmit, children} = props

    const {control, errors, handleSubmit} = useForm({
        schema,
        defaultValues,
    })

    const formContextValue: FormContext = {
        control,
        errors,
    }

    return (
        <FormContextProvider value={formContextValue}>
            <form ref={ref} onSubmit={handleSubmit(onSubmit)} >
                {children}
            </form>
        </FormContextProvider>
    );
});

export const Form = Object.assign(FormImpl, {
    Field: FormField,
})

Form.displayName = 'Form'


