'use client';

import CaretDownIcon from './Icons/CaretDownIcon';
import DropdownToggle from './DropdownToggle';
import { ButtonProps } from '../Button/Button';
interface DropdownButtonProps extends ButtonProps {
  placeholder?: string;
  isError?: boolean;
}

const DropdownButton = ({
  children,
  placeholder = '선택',
  onClick,
  isError = false,
  size,
  className,
  color,
  ...rest
}: DropdownButtonProps) => {
  return (
    <DropdownToggle
      className={className}
      color={color}
      size={size}
      onClick={onClick}
      {...rest}
    >
      <span>{children ?? placeholder}</span>
      <span aria-hidden={true}>
        <CaretDownIcon size={24} />
      </span>
    </DropdownToggle>
  );
};

export default DropdownButton;