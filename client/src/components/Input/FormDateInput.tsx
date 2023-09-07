'use client';

import dayjs from 'dayjs';
import { HTMLAttributes } from 'react';
import { FieldValues, FieldPath, Controller, Control } from 'react-hook-form';
import DateInputDropdown from '../Date/DateInputDropdown';

type TControl<T extends FieldValues> = {
  control?: Control<T>;
  name: FieldPath<T>;
} & HTMLAttributes<HTMLDivElement>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormDateInput = ({ ...props }: TControl<any>) => {
  const { name, control } = props;
  const now = dayjs().format('YYYY년 MM월 DD일 (오늘)');

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          <DateInputDropdown placeholder={now} selected={value} onSelect={onChange} />
          { /* 에러메시지 yup으로 
          <InputErrorMessage name={name} showError={true} />
          */ }
        </>
      )}
    />
  );
};

export default FormDateInput;