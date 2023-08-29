'use client';

import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import DateCaption from './DateCaption';


interface DatePickerProps extends Omit<DayPickerSingleProps, 'mode'> {
  mode?: 'single';
}

const DatePicker = ({ mode = 'single', ...props }: DatePickerProps) => {
  return (
    <DayPicker
      {...props}
      className='flex content-center bg-slate-400'
      components={{
        Caption: DateCaption,
      }}
      disabled={{ before: new Date() }}
      fromMonth={new Date()}
      locale={ko}
      mode={mode}
      modifiersClassNames={{
        today: 'today',
        disabled: 'disabled',
        selected: 'selected',
      }}
    />
  );
};

export default DatePicker;