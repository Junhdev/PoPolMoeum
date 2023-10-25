'use client';
import { useCallback, HTMLAttributes } from 'react';
import { FieldValues, FieldPath, Controller, Control, useFormContext } from 'react-hook-form';
import { Button } from '../Button/Button';

// control을 Form컴포넌트에서 관리(CountInput이 Form컴포넌트의 child component이므로)
type CountInputProps<T extends FieldValues> = {
  min?: number;
  max?: number;
  control?: Control<T>;
  name: FieldPath<T>;
} & HTMLAttributes<HTMLDivElement>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CountInput = ({ control, name, min = 2, max = 50, ...rest }: CountInputProps<any>) => {
  const { setValue, getValues } = useFormContext();
  const handleClickPlus = useCallback(() => 
    setValue(name, getValues(name) + 1), 
    [getValues, name, setValue]
  );
  const handleClickMinus = useCallback(() => 
    setValue(name, getValues(name) - 1), 
    [getValues, name, setValue]
  );

  return (
    <div className="mt-5 mb-5 flex items-center" {...rest}>
      <span className="mr-2">
        스터디 인원
      </span>
      <Controller
        defaultValue={2}
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <>
            <Button type="button" onClick={handleClickMinus} disabled={value <= min} className="mr-2">
                -
            </Button>
            <input type="number" readOnly min={min} max={max} value={value} onChange={onChange} />
            <Button type="button" onClick={handleClickPlus} disabled={value >= max} className="ml--2">
                +
            </Button>
          </>
        )}
      />
    </div>
  );
};

export default CountInput;