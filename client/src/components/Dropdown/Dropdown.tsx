'use client';

import { ReactNode } from 'react';
import { DropdownContextProvider } from './contexts/DropdownContext';

interface Props {
    isAlwaysOpen?: boolean;
    className?: string;
    children: ReactNode;
  }


const Dropdown = ({ children, ...rest }: Props) => {
  return (
    <DropdownContextProvider {...rest}>
        {children}
    </DropdownContextProvider>
  );
};

export default Dropdown;