'use client'

import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { FormTextarea } from "@/components/Form/FormTextarea";
import { useMultiStepFormContext } from "@/components/Form/context/MultiStepFormContext";
import { openToast } from "@/components/Toast";
import { yupResolver } from '@hookform/resolvers/yup'
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import * as Yup from 'yup'
import { FirstStepSignUpValue } from "./FirstStepSignUpForm";
import UniversityInput from "./Input/UniversityInput";
import { FormInput } from "@/components/Form/FormInput";
import GradeInput from "./Input/GradeInput";
import InterestedSubjectInput from "./Input/InterestedSubjectInput";
import { useEffect, useState } from "react";

export type SecondStepSignUpValue = {
    major: string
}



const SecondStepSignUpForm = () => {
    const router = useRouter()
    
    const secondStepSignUpSchema = Yup.object().shape({
        major: Yup.string()
        .min(2, '너무 짧습니다')
        .max(10, '10자 이내로 입력해 주세요')
        .required('전공을 입력해주세요'),
      })
    
    const { stepFormData, setStepFormData, onHandleBack } = useMultiStepFormContext();

    useEffect(()=>{
         
      console.log(stepFormData);}
      //onHandleNext()}
      ,[stepFormData])

     const handleSignUpSubmit = async (secondStepData: SecondStepSignUpValue ) => {
      setStepFormData((prev: FirstStepSignUpValue) => ({ ...prev, ...secondStepData }));
     
      /*
        try {
            
            await axios.post("/auth/signup", 
                stepFormData
            )
            
            openToast('회원가입에 성공했습니다.')
            // 로딩 UI 생성
            router.push("/login");
        } catch (error: any) {
            openToast("생성에 실패하였습니다")
        }
        */
      }
    

    return (
        <div>
          <div>
            <div className="text-xl font-bold">회원가입 step2</div>
            <p className="mb-4 mt-1 text-sm">
              대학교 및 전공을 선택하세요
            </p>
           
            <Form<SecondStepSignUpValue>
              onSubmit={handleSignUpSubmit}
              options={{
                resolver: yupResolver(secondStepSignUpSchema),
                defaultValues: stepFormData,
                mode: 'onBlur'
              }}
            >
              <UniversityInput />
              <FormInput<SecondStepSignUpValue>
                  name="major"
                  placeholder="전공을 입력해 주세요"
                  className="mb-4"
                  hasWhiteSpace
              />
              <GradeInput />
              <InterestedSubjectInput />
            
              <Button color='red' onClick={onHandleBack}>
                이전
              </Button>
              <Button color='red'>
                회원가입
              </Button>
            </Form>
          </div>
        </div>
      )

}

export default SecondStepSignUpForm;