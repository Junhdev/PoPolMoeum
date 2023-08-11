'use client';

import { useContext, createContext, ReactNode } from 'react';

interface DropdownMenuContextValue {
  selectable: boolean;
  selectedItemKey: string | null;
  onSelectChange: (itemKey: string | null) => void;
  toggleClose: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

const DropdownMenuContextProvider = ({ children, value }: { children: ReactNode; value: DropdownMenuContextValue }) => {
  return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>;
};

const useDropdownMenuContext = () => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx)
    throw new Error('Cannot find DropdownMenuContext. It should be wrapped within DropdownMenuContextProvider.');
  return ctx;
};

export { DropdownMenuContextProvider, useDropdownMenuContext, type DropdownMenuContextValue };