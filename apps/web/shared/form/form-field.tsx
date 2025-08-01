import React, {forwardRef, ReactNode} from "react";
import {useFormContext} from "./form.context";
import {Controller} from "react-hook-form";

export interface FormProps {
    label?: string;
    name: string;
    children: (field: any) => ReactNode;
}

export const FormField = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
    const {label, name, children} = props
    const {control, errors} = useFormContext()

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <>
                            {children(field)}
                        </>
                    )
                }}
            />
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{(errors[name] as any).message}</p>
            )}
        </div>
    );
});

FormField.displayName = "FormField";
