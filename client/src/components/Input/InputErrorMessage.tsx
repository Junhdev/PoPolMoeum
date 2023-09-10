
import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface InputErrorMessageProps {
  children?: ReactNode;
  className?: string;
}

// FormInput이 아닌 external controlled Input들의 에러메시지
export const InputErrorMessage: FC<InputErrorMessageProps> = ({
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