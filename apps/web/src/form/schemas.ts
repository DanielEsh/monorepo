import { z } from 'zod'

// Схема для первой формы (Проект)
export const projectSchema = z.object({
  name: z.string().min(3, { message: 'Наименование должно быть не менее 3 символов' }),
  url: z.string().url({ message: 'Введите корректную ссылку' }).or(z.literal('')), // Ссылка или пустая строка
  isPublished: z.boolean().default(false),
  hasAnalytics: z.boolean().default(false),
})

// Тип для данных формы проекта
export type ProjectFormData = z.infer<typeof projectSchema>

// Схема для второй формы (Габариты)
export const dimensionsSchema = z.object({
  material: z.string().min(2, { message: 'Материал обязателен' }),
  color: z.string().min(3, { message: 'Цвет обязателен' }),
  vendorCode: z.string().optional(), // Необязательное поле
  // z.coerce.number() пытается преобразовать строку в число, что идеально для инпутов
  width: z.coerce.number().positive({ message: 'Ширина должна быть больше нуля' }),
  height: z.coerce.number().positive({ message: 'Высота должна быть больше нуля' }),
})

// Тип для данных формы габаритов
export type DimensionsFormData = z.infer<typeof dimensionsSchema>
