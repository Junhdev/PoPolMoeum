import React, {
    forwardRef,
    ForwardedRef,
} from 'react'
import classNames from 'classnames'
  
export type InputSize = 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password'
  
export type InputProps = {
    id?: string;
    name: string;
    label?: string;
    type?: InputType;
    size?: InputSize;
    className?: string;
} & React.ComponentPropsWithoutRef<'input'>;

  
const sizeMap: { [key in InputSize]: string } = {
    medium: 'p-3 text-base',
    large: 'p-4 text-base',
}
  
const Input = forwardRef(function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
    const { name, label, type, placeholder, className, ...rest } = props;
      return (
        <input
          ref={ref}
          name={name}
          aria-label={label}
          type={type}
          placeholder={placeholder}
          className={classNames([
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
             sizeMap[size],
             className,
          ])}
          {...rest}
        />
      )
    },
  )
  
export default Input;