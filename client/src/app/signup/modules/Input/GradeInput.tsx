import { useFormContext } from "react-hook-form";
import InputDropdown from "@/components/Input/InputDropdown";

export const gradeSelection = [
  { 
    id: 1,
    name: '1학년'
  },
  { 
    id: 2,
    name: '2학년'
  },
  { 
    id: 3,
    name: '3학년'
  },
  { 
    id: 4,
    name: '4학년'
  },
  { 
    id: 5,
    name: '휴학'
  },
  { 
    id: 6,
    name: '졸업'
  },
];

const GradeInput = () => {
    
    const { control } = useFormContext();
  
    return (
      <div>
        <div>
            학년
          <div className="mt-20 mb-5 flex items-start gap-10">
            <InputDropdown
              title={'학년 선택'}
              control={control}
              name={'gradeId'}
              placeholder="학년 선택"
              selections={gradeSelection}
            />
          </div>
        </div>
      </div>
    );
};

export default GradeInput;