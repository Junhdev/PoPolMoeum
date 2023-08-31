'use client';

import { useNavigation, CaptionProps } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '../Button/Button';


const DateCaption = ({ displayMonth }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className='flex justify-between items-center gap-2'>
      <span>
        {format(
            displayMonth, 
            'yyyy.MM', {
            locale: ko,
        })}
      </span>
      <div className='flex items-center'>
        <Button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        />
        <Button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        />
      </div>
    </div>
  );
};

export default DateCaption;