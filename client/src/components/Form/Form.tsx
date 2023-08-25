import _ from 'lodash'
import React, { useEffect } from 'react'
import {
  useForm,
  UseFormProps,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
  options?: UseFormProps<TFormValues>
  onSubmit: SubmitHandler<TFormValues>
  children: any
  autoSubmit?: boolean
  className?: string
}

export const Form = <TFormValues extends Record<string, unknown>>({
  options,
  onSubmit,
  children,
  autoSubmit = false,
  className,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>(options)
  const handleAutoSubmit = _.debounce(onSubmit, 250, {
    maxWait: 500,
  })
  const values = methods.watch()

  useEffect(() => {
    if (autoSubmit) {
      handleAutoSubmit(values)
    }
  }, [values, autoSubmit, handleAutoSubmit])

  return (
    <FormProvider<TFormValues> {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className || ''}
      >
        {React.Children.map(children, (child) => {
          return child?.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name,
                  errors: methods.formState.errors,
                },
              })
            : child
        })}
      </form>
    </FormProvider>
  )
}