
import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface FormErrorMessageProps {
  children?: ReactNode;
  className?: string;
}

export const FormInputErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => {
  return (
    <p
      className={classNames(
        'inline-block text-left text-sm text-red-600',
        className,
      )}
    >
      {children}
    </p>
  )
}