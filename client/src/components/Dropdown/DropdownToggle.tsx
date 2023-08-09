'use client';

import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { useDropdownContext } from './contexts/DropdownContext';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownToggle = ({ children, onClick, ...rest }: Props) => {
	const { isOpen, toggleOpen, menuId } = useDropdownContext();

	const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
		toggleOpen();
		onClick?.(e);
	};

	return (
		<button
			aria-controls={menuId}
			aria-expanded={isOpen}
			aria-haspopup={true}
			aria-owns={menuId}
			type="button"
			onClick={handleClickButton}
			{...rest}
		>
			{children}
		</button>
	);
};

export default DropdownToggle;