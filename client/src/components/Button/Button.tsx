'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
} 

const Button = ({   
    children,
    className,
    onClick,
    ...rest
}: ButtonProps) => {
    return (
        <button className={className} onClick={onClick} {...rest}>
            <div>{children}</div>
        </button>
    );
};

export default Button;