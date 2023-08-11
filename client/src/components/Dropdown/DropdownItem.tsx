'use client';

import { LiHTMLAttributes, MouseEvent } from 'react';

import cx from 'classnames';
import { useDropdownMenuContext } from './contexts/DropdownMenuContext';
import CheckedIcon from './Icons/CheckedIcon';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  itemKey: string;
  //size?: Size;
}

const DropdownItem = ({ children, className, onClick, itemKey, /*size,*/ ...rest }: Props) => {
  const { selectable, selectedItemKey, onSelectChange, toggleClose } = useDropdownMenuContext();

  const handleClickItem = (e: MouseEvent<HTMLLIElement>) => {
    if (selectable) onSelectChange(selectedItemKey === itemKey ? null : itemKey);
    onClick?.(e);
    toggleClose();
  };

  const isSelected = selectable && selectedItemKey === itemKey;

  return (
    <li
      tabIndex={0}
      role="menuitemradio"
      aria-checked={isSelected}
      onClick={handleClickItem}
      className={cx(className, isSelected ? 'bg-slate-600' : 'bg-orange-400')}
      {...rest}
    >
      {children}
      {isSelected && (
        <span  aria-hidden={true}>
          <CheckedIcon />
        </span>
      )}
    </li>
  );
};

export default DropdownItem;