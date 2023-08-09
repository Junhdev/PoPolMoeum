'use client';

import useOutsideClick from '@/hooks/useOutSideClick';
import { useContext, createContext, useId, useState, PropsWithChildren, useCallback, useRef } from 'react';


interface DropdownContextValue {
	isOpen: boolean;
	toggleOpen: () => void;
	toggleClose: () => void;
	menuId: string;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

interface Props {
  isAlwaysOpen?: boolean;
  className?: string;
}

const DropdownContextProvider = ({
  isAlwaysOpen = false,
  className,
  children
}: PropsWithChildren<Props>) => {
	const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useOutsideClick(ref, setIsOpen);
  
  const toggleOpen = useCallback(() => {
    !isAlwaysOpen && setIsOpen(true);
  }, [isAlwaysOpen]);

  const toggleClose = useCallback(() => {
    !isAlwaysOpen && setIsOpen(false);
  }, [isAlwaysOpen]);

	return (
    <DropdownContext.Provider 
      value={{
        isOpen: isAlwaysOpen ? true : isOpen,
        toggleOpen,
        toggleClose,
        menuId,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

const useDropdownContext = () => {
	const ctx = useContext(DropdownContext);
	if (!ctx) throw new Error('Cannot find DropdownContext. It should be wrapped within DropdownContextProvider.');
	return ctx;
};

export { DropdownContextProvider, useDropdownContext };

