import { useFormContext } from "react-hook-form";
import InputDropdown from "../Input/InputDropdown";


export const frequencySelection = [
  { 
    id: 1,
    name: '주 1회'
  },
  { 
    id: 2,
    name: '주 2회'
  },
  { 
    id: 3,
    name: '주 3회'
  },
  { 
    id: 4,
    name: '주 4회'
  },
  { 
    id: 5,
    name: '주 5회'
  },
  { 
    id: 6,
    name: '주 6회'
  },
  { 
    id: 7,
    name: '매일'
  },
];


const FrequencyInput = () => {
    // useForm에서 가져온 control
    const { control } = useFormContext();
  
    return (
      
      
      <div className="grid content-between items-center md:row-auto md:gap-2 md:items-start">
        <span>
          주당 스터디 횟수
        </span>
          <div className="mt-2 mb-5 flex items-start gap-10">
            <InputDropdown
              title={'주당 스터디 횟수'}
              control={control}
              name={'frequency'}
              placeholder="주 몇회"
              selections={frequencySelection}
            />
          </div>
          
        </div>
     
    );
};
  
  export default FrequencyInput;