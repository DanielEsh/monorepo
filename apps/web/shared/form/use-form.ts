import {
    type FieldValues as ReactHookFormFieldValues,
    type DefaultValues,
    type UseFormReturn,
    useForm as useReactHookForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'

export function useForm<T extends ReactHookFormFieldValues>(
    formSchema: ZodType<T>,
    defaultValues?: DefaultValues<T>,
): UseFormReturn<T> {
    // @ts-ignore
    return useReactHookForm<T>({
        // @ts-ignore
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues,
    });
}
