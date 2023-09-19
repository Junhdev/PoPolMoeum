import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { useAuthState } from '@/context/auth';
import { useMultiStepFormContext } from '@/components/Form/context/MultiStepFormContext';
import { Form } from '@/components/Form/Form';
import { FormInput } from '@/components/Form/FormInput';
import { Button } from '@/components/Button/Button';

export type FirstStepSignUpValue = {
    username: string;
    user_id: string;
    password: string;
    email: string;
}

export const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/

// multi step 으로 ( 마이페이지의 관심 카테고리와 연결 !
// ex) 아이콘으로!! 관심 분야를 선택해주세요.. 추후 이 관심분야를 바탕으로 추천 분야 스터디!)
const SignUp = () => {
    const router = useRouter();
    const { authenticated } = useAuthState();

    if (authenticated) router.push("/");
    


        const firstStepSignUpSchema = Yup.object().shape({
            // 추후 대학교 검색 api 생성하여 받아오기
            // 폼 안에 드롭다운으로 선택 구현
            // 날짜 위치 선택 구현
            username: Yup.string()
            .min(1, '너무 짧습니다')
            .max(10, '10자 이내로 입력해 주세요')
            .required('사용자 이름을 입력해 주세요'),
            user_id: Yup.string()
            .min(3, '너무 짧습니다')
            .max(15, '15자 이내로 입력해 주세요')
            .required('아이디를 입력해 주세요'),
            password: Yup.string()
            .min(3, '너무 짧습니다')
            .max(20, '20자 이내로 입력해 주세요')
            .required('비밀번호를 입력해 주세요')
            .matches(
                passwordReg,
                '비밀번호는 대문자, 소문자, 숫자 조합으로 입력해주세요',
              ),
              /*
              password2: Yup.string()
              .required('비밀번호를 확인해주세요')
              .oneOf([Yup.ref('password1'), null], '비밀번호가 다릅니다.'),
              */
            email: Yup.string()
            .email('이메일 형식에 맞게 입력해주세요')
            .min(3, '너무 짧습니다')
            .max(50, '50자 이내로 입력해 주세요')
            .required('이메일을 입력해주세요'),
            
          })
    
        const { stepFormData, setStepFormData, onHandleNext } = useMultiStepFormContext();
        
    
        const handleCreateFirstStep = (data: FirstStepSignUpValue) => {
            setStepFormData((prev: any) => ({ ...prev, ...data }));
            onHandleNext();
        };
    
        return (
            <div>
              <div>
                <p className="mb-4 mt-1 text-sm">
                  회원가입
                </p>
                <Form<FirstStepSignUpValue>
                  onSubmit={handleCreateFirstStep}
                  options={{
                    resolver: yupResolver(firstStepSignUpSchema),
                    defaultValues: stepFormData,
                    mode: 'onBlur'
                  }}
                >
                  <FormInput<FirstStepSignUpValue>
                    name="username"
                    placeholder="사용자 이름을 입력해 주세요"
                    className="mb-4"
                    hasWhiteSpace
                  />
                  <FormInput<FirstStepSignUpValue>
                    name="user_id"
                    className="mb-4"
                    placeholder="아이디를 입력해 주세요."
                  />
                  <FormInput<FirstStepSignUpValue>
                    name="password"
                    className="mb-4"
                    placeholder="비밀번호를 입력해 주세요."
                  />
                  <FormInput<FirstStepSignUpValue>
                    name="email"
                    className="mb-4"
                    placeholder="이메일을 입력해 주세요."
                  />
                  <Button color='red'>
                    다음
                  </Button>
                </Form>
              </div>
            </div>
          )
    
    }
    
   

   

export default SignUp;