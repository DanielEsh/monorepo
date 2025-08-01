import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm } from 'react-hook-form'

interface UseFormOptions {
  schema: any
  defaultValues: any
}

interface UseFormReturn {
  control: any
  errors: any
  handleSubmit: any
}

export function useForm({ schema, defaultValues }: UseFormOptions) {
  const { control, formState, handleSubmit } = useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  return {
    control,
    errors: formState.errors,
    handleSubmit,
  }
}
