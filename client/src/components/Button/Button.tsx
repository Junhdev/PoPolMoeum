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

export const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <ButtonStyled className={className} {...rest}>
      {children}
    </ButtonStyled>
  );
}