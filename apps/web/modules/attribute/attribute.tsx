'use client'
import {z} from "zod";
import {Form} from "../../shared/form/form";
import React from "react";
import {SubmitHandler} from "react-hook-form";

const Input = ({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        id={id}
        type="text"
        {...props}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
);

const attributeFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Поле обязательно для заполнения')
        .max(50, "Имя слишком длинное"),
});

type AttributeFormValues = z.infer<typeof attributeFormSchema>;

export const Attribute = () => {
    const handleSubmit: SubmitHandler<AttributeFormValues> = (data) => {
        console.log("Форма отправлена:", data);
    };

    const defaultValues: AttributeFormValues = {
        name: '',
    }

    return (
        <div className="max-w-[600px]">
            <h2>Attribute</h2>
            <Form schema={attributeFormSchema} defaultValues={defaultValues} onSubmit={handleSubmit}>
                <Form.Field name="name">
                    {(field) => <Input {...field} />}
                </Form.Field>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Отправить
                </button>
            </Form>
        </div>
    )
}