'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonStyled } from "./style";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'red' | 'blue' | 'grey' | 'white';
  size?: 'xsmall' | 'small' | 'medium' | 'large' ;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Button = ({ color, size, className, children, disabled, onClick, ...rest }: ButtonProps) => {
  return (
    <ButtonStyled color={color} size={size} className={className}>
      <button
        {...rest}
        disabled={disabled}
        onClick={onClick}
      >
      {children}
    </button>
    </ButtonStyled>
  );
}