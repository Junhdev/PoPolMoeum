import { useFormContext } from "react-hook-form";
import InputDropdown from "@/components/Input/InputDropdown";

export const universitySelection = [
  { 
    id: 1,
    name: '광운대학교'
  },
  { 
    id: 2,
    name: '숭실대학교'
  },
  { 
    id: 3,
    name: '서울과학기술대학교'
  },
  { 
    id: 4,
    name: '국민대학교'
  },
  { 
    id: 5,
    name: '중앙대학교'
  },
  { 
    id: 6,
    name: '서울시립대학교'
  },
];

/* 위에서 name property만 뽑아서 배열로 만들어주기!
const subjectNameSelection: string[] | undefined = []
subjectData.forEach((element) => subjectNameSelection.push(element.name));

// 추후 id이용해서 선택된 것 찾기 -> filter
*/

const UniversityInput = () => {
    // useForm에서 가져온 control
    const { control } = useFormContext();
  
    return (
      <div>
        <div>
            대학교
          <div className="mt-20 mb-5 flex items-start gap-10">
            <InputDropdown
              title={'대학교 선택'}
              control={control}
              name={'universityId'}
              placeholder="대학교 선택"
              selections={universitySelection}
            />
          </div>
        </div>
      </div>
    );
};

export default UniversityInput;