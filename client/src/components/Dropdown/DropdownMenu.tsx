'use client';

import { HTMLAttributes, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import cx from 'classnames';

import { useDropdownContext } from './contexts/DropdownContext';
import { type DropdownMenuContextValue, DropdownMenuContextProvider } from './contexts/DropdownMenuContext';


interface Props extends HTMLAttributes<HTMLUListElement>, Partial<DropdownMenuContextValue> {

}

export interface DropdownMenuHandle {
  /** menu를 닫는다 */
  close: () => void;
}

const DropdownMenu = forwardRef<DropdownMenuHandle, Props>(
  (
    {
      children,
      className,
      selectable = false,
      selectedItemKey = null,
      onSelectChange = () => null,
      ...rest
    },
    ref,
  ) => {
    const { isOpen, toggleClose, menuId } = useDropdownContext();

    const dropdownMenuContextValue = useMemo(
      () => ({ selectable, selectedItemKey, onSelectChange, toggleClose }),
      [selectable, selectedItemKey, onSelectChange, toggleClose],
    );

    useImperativeHandle(ref, () => ({
      close: toggleClose,
    }));

    useEffect(() => {
      window.addEventListener('scroll', toggleClose);
      return () => {
        window.removeEventListener('scroll', toggleClose);
      };
    }, [toggleClose]);

    return (
      <DropdownMenuContextProvider value={dropdownMenuContextValue}>
        <ul
          aria-hidden={!isOpen}
          id={menuId}
          role="menu"
          tabIndex={-1}
          className={cx(className, { 'hidden' : !isOpen })}
          {...rest}
        >
          {children}
        </ul>
      </DropdownMenuContextProvider>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;