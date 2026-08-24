import { useCallback } from 'react'
import { useForm as useHookForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'

export const useForm = <T extends Record<string, any>>(
  schema: ZodSchema,
  onSubmit: (data: T) => Promise<void> | void,
  options?: Omit<UseFormProps<T>, 'resolver'>
) => {
  const form = useHookForm<T>({
    ...options,
    resolver: zodResolver(schema),
  })

  const handleSubmit = useCallback(
    async (data: T) => {
      try {
        await onSubmit(data)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    },
    [onSubmit]
  )

  return {
    ...form,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
