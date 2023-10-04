import { useFormContext } from "react-hook-form";
import InputDropdown from "../Input/InputDropdown";

export const frequencySelection = [
    '주 1회', 
    '주 2회',
    '주 3회',
    '주 4회',
    '주 5회',
    '주 6회',
    '매일'
];

const FrequencyInput = () => {
    // useForm에서 가져온 control
    const { control } = useFormContext();
  
    return (
      <div>
        <div>
            시간
          <div className="mt-20 mb-5 flex items-start gap-10">
            <InputDropdown
              title={'주당 스터디 횟수'}
              control={control}
              name={'frequency'}
              placeholder="주 몇회"
              selections={frequencySelection}
            />
          </div>
        </div>
      </div>
    );
};
  
  export default FrequencyInput;