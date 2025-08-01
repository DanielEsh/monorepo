'use client'
import { z } from 'zod'

import { Button, Checkbox, Input } from '../../shared/components'
import { Form, type FormSubmitHandler } from '../../shared/form'

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
  name: z.string().min(1, 'Поле обязательно для заполнения').max(50, 'Имя слишком длинное'),
  label: z.string().min(1, 'Поле обязательно для заполнения').max(50, 'Имя слишком длинное'),
  type: z
    .enum(AttributeType, {
      error: 'Обязательное поле',
    })
    .optional()
    .refine((val) => val !== undefined, {
      message: 'Тип обязателен для выбора',
    }),
  description: z.string().max(500, 'Описание слишком длинное').optional(),
  required: z.boolean().default(false).optional(),
})

type AttributeFormValues = z.infer<typeof attributeFormSchema>

export const Attribute = () => {
  const handleSubmit: FormSubmitHandler<AttributeFormValues> = async (data) => {
    console.log('Форма отправлена:', data)
    const res = await fetch('/api/attribute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const { error } = await res.json()
      alert(`Ошибка: ${error}`)
      return
    }
  }

  const defaultValues: AttributeFormValues = {
    name: '',
    label: '',
    type: undefined,
    description: '',
    required: false,
  }

  return (
    <div className="max-w-[600px]">
      <h2>Attribute</h2>
      <Form
        schema={attributeFormSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <Form.Field
          label="name"
          name="name"
        >
          {(field) => <Input {...field} />}
        </Form.Field>

        <Form.Field
          label="label"
          name="label"
        >
          {(field) => <Input {...field} />}
        </Form.Field>

        <Form.Field
          label="type"
          name="type"
        >
          {(field) => (
            <select
              {...field}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите тип</option>
              {allAttributesType.map((attributesType, index) => (
                <option
                  key={index}
                  value={attributesType.value}
                >
                  {attributesType.label}
                </option>
              ))}
            </select>
          )}
        </Form.Field>

        <Form.Field
          label="description"
          name="description"
        >
          {(field) => <Input {...field} />}
        </Form.Field>

        <Form.Field
          label="Обязательное поле"
          name="required"
        >
          {(field) => (
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            >
              Сделать обязательным
            </Checkbox>
          )}
        </Form.Field>

        <Button
          type="submit"
          className="px-4 py-2"
        >
          Отправить
        </Button>
      </Form>
    </div>
  )
}
