'use client';

import { DropdownContextProvider } from './contexts/DropdownContext';

const Dropdown = ({ children }: any) => {
  return (
    <DropdownContextProvider>
      {children}
    </DropdownContextProvider>
  );
};

export default Dropdown;