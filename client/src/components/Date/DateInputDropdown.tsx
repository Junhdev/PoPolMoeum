'use client';

import { useRef } from 'react';
import { DayPickerSingleProps, SelectSingleEventHandler } from 'react-day-picker';
import { DropdownMenuHandle } from '@/components/Dropdown/DropdownMenu';
import Dropdown from '../Dropdown';
import DatePicker from './DatePicker';
import { format, isToday, isTomorrow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DateInputDropdownProps extends Omit<DayPickerSingleProps, 'selected' | 'onSelect' | 'mode'> {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  isError?: boolean;
}

const DateInputDropdown = ({ selected, onSelect, placeholder = '날짜 선택', isError, className, ...rest }: DateInputDropdownProps) => {
  const menuRef = useRef<DropdownMenuHandle>(null);

  const handleSelectDate: SelectSingleEventHandler = (date) => {
    onSelect(date);
    menuRef.current?.close();
  };

  const selectedDateFormat = (selectedDate: Date) => {
    const postFix = isToday(selectedDate) ? ' (오늘)' : isTomorrow(selectedDate) ? ' (내일)' : '';
  
    return (
      format(selectedDate, 'yyyy년 MM월 dd일', {
        locale: ko,
      }) + postFix
    );
  };

  return (
    <Dropdown className={className}>
      <Dropdown.Button placeholder={placeholder} isError={isError}>
        {selected ? selectedDateFormat(selected) : null}
      </Dropdown.Button>
      {
      /* 모바일 대응
      mobile ? (
        <Dropdown.BottomSheet ref={menuRef} title="날짜 선택" selectable selectedItemKey={selected?.toString()}>
          <DatePicker {...rest} selected={selected} onSelect={handleSelectDate} />
        </Dropdown.BottomSheet>
      ) */}
        <Dropdown.Menu ref={menuRef} className='w-max max-h-max' >
          <DatePicker {...rest} selected={selected} onSelect={handleSelectDate} />
        </Dropdown.Menu>
     
    </Dropdown>
  );
};

export default DateInputDropdown;