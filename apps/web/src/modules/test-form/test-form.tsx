import React, { ReactNode } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Компоненты ввода
const Input = ({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    id={id}
    type="text"
    {...props}
    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
)

const NumberInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="number"
    {...props}
    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
)

// Обёртка формы и поля
interface FormProps {
  children: ReactNode
  className?: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
}
const Form = ({ children, className, onSubmit }: FormProps) => (
  <form
    onSubmit={onSubmit}
    className={className}
    children={children}
  />
)

interface FormFieldProps {
  label: string
  name: keyof FormValues
  control: any
  errors: any
  children: (field: any) => ReactNode
}
const FormField = ({ label, name, control, errors, children }: FormFieldProps) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <>{children(field)}</>
      }}
    />
    {errors[name] && <p className="mt-1 text-sm text-red-600">{(errors[name] as any).message}</p>}
  </div>
)

const frameworks = ['React', 'Vue', 'Angular'] as const

// Zod-схема и типы
const formSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(50, 'Имя слишком длинное'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа').max(50, 'Фамилия слишком длинная'),
  age: z.number().int('Возраст должен быть целым числом').min(0, 'Возраст не может быть отрицательным'),
  framework: z.string().refine((val) => frameworks.includes(val as any), {
    message: 'Выберите один из фреймворков',
  }),
})
type FormValues = z.infer<typeof formSchema>

export const TestForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: 0,
      framework: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Форма отправлена:', data)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Тестовая форма</h2>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          label="Имя"
          name="firstName"
          control={control}
          errors={errors}
        >
          {(field) => <Input {...field} />}
        </FormField>

        <FormField
          label="Фамилия"
          name="lastName"
          control={control}
          errors={errors}
        >
          {(field) => <Input {...field} />}
        </FormField>

        <FormField
          label="Возраст"
          name="age"
          control={control}
          errors={errors}
        >
          {(field) => (
            <NumberInput
              id="age"
              {...field}
              // Преобразуем значение из строки в число
              value={field.value}
              onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
              step={1}
              min={0}
              placeholder="Введите возраст"
            />
          )}
        </FormField>

        <FormField
          label="Фреймворк"
          name="framework"
          control={control}
          errors={errors}
        >
          {(field) => (
            <select
              {...field}
              id="framework"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите фреймворк</option>
              {frameworks.map((fw) => (
                <option
                  key={fw}
                  value={fw}
                >
                  {fw}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Отправить
        </button>
      </Form>
    </div>
  )
}
