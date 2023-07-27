'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
} 

const Button = ({   
    children,
    className,
    ...rest
}: ButtonProps) => {
    return (
        <button {...rest}>
            <div>{children}</div>
        </button>
    );
};

export default Button;