'use client'

import { HTMLAttributes } from "react";
import { Control, Controller, DeepMap, FieldError, FieldPath, FieldValues } from "react-hook-form";
import Dropdown from "../Dropdown";
import { ErrorMessage } from "@hookform/error-message";
import { InputErrorMessage } from "./InputErrorMessage";
import _ from "lodash";

type TControl<T extends FieldValues> = {
    control: Control<T>;
    /** Input을 구분짓는 고유한 이름입니다. 한 폼안에는 오직 하나의 이름만이 존재해야 합니다. name을 전달해야 form validation이 가능합니다. */
    name: FieldPath<T>;
    /** Dropdown 아이템의 리스트입니다. */
    selections?: number[];
    /** 모바일 BottomSheet DropDown에 해당하는 타이틀입니다. */
    title?: string;
    errors?: Partial<DeepMap<T, FieldError>>
  } & HTMLAttributes<HTMLDivElement>;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const InputDropdown = ({ ...props }: TControl<any>) => {
    // errors는 Form컴포넌트에서 받아온 props(InputDropdown 컴포넌트가 결국 Form컴포넌트의 child컴포넌트이므로 !)
    const { name, control, placeholder,  selections = ['default'], errors } = props;
    //const mobile = useIsMobile();
    const errorMessages = _.get(errors, name)
    // const hasError = !!(errors && errorMessages)

    return (
      <div className='relative grid items-center'>
        <Controller
          defaultValue={null}
          control={control}
          name={name}
          render={({ field: { value, onChange }, fieldState }) => (
            <Dropdown>
              <Dropdown.Button
                type="button"
                isError={Boolean(fieldState.error)}
                placeholder={placeholder}
                style={{ width: '100%' }}
              >
                {value}
              </Dropdown.Button>
              {/*
              {mobile ? (
                <Dropdown.BottomSheet
                  title={title}
                  selectable
                  selectedItemKey={value}
                  onSelectChange={onChange}
                  className={bottomSheetContent}
                >
                  {selections.map((v) => (
                    <Dropdown.Item key={v} itemKey={v}>
                      {v}
                    </Dropdown.Item>
                  ))}
                </Dropdown.BottomSheet>
                  ) : ( */}
                <Dropdown.Menu selectable selectedItemKey={value} onSelectChange={onChange}>
                  {selections.map((v) => (
                    <Dropdown.Item key={v} itemKey={v}>
                      {v}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
            </Dropdown>
          )}
        />
        <ErrorMessage
            errors={errors}
            name={name as any}
            render={({ message }) => (
            <InputErrorMessage className="mt-1">{message}</InputErrorMessage>
            )}
        />
      </div>
    );
  };
  
  export default InputDropdown;

  