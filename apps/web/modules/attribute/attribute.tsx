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

const AttributeType = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
} as const

const allAttributesType = [
    {
        label: 'Строка',
        value: 'string',
    },
    {
        label: 'Число',
        value: 'number',
    },
    {
        label: 'Логический тип',
        value: 'boolean',
    },
]

const attributeFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Поле обязательно для заполнения')
        .max(50, "Имя слишком длинное"),
    label: z
        .string()
        .min(1, 'Поле обязательно для заполнения')
        .max(50, "Имя слишком длинное"),
    type: z.enum(AttributeType, {
        error: 'Обязательное поле'
    }).optional().refine((val) => val !== undefined, {
            message: "Тип обязателен для выбора",
        }),
    description: z.string().max(500, 'Описание слишком длинное').optional(),
});

type AttributeFormValues = z.infer<typeof attributeFormSchema>;

export const Attribute = () => {
    const handleSubmit: SubmitHandler<AttributeFormValues> = async (data) => {
        console.log("Форма отправлена:", data);
        const res = await fetch("/api/attribute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const { error } = await res.json();
            alert(`Ошибка: ${error}`);
            return;
        }
    };

    const defaultValues: AttributeFormValues = {
        name: '',
        label: '',
        type: undefined,
        description: '',
    }

    return (
        <div className="max-w-[600px]">
            <h2>Attribute</h2>
            <Form schema={attributeFormSchema} defaultValues={defaultValues} onSubmit={handleSubmit}>
                <Form.Field label="name" name="name">
                    {(field) => <Input {...field} />}
                </Form.Field>

                <Form.Field label="label" name="label">
                    {(field) => <Input {...field} />}
                </Form.Field>

                <Form.Field label="type" name="type">
                    {(field) => (
                        <select
                            {...field}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Выберите тип</option>
                            {allAttributesType.map((attributesType, index) => (
                                <option key={index} value={attributesType.value}>
                                    {attributesType.label}
                                </option>
                            ))}
                        </select>
                    )}
                </Form.Field>

                <Form.Field label="description" name="description">
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