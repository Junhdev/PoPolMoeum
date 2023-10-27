'use client'

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useMemo,
    useState,
  } from "react";
  
 
  interface MultiStepFormContextValue {
    stepFormData: any;
    setStepFormData: Dispatch<SetStateAction<any>>;
    onHandleBack: () => void;
    onHandleNext: () => void;
    step: number;
  }
  
  const MultiStepFormContext = createContext<MultiStepFormContextValue>({
    stepFormData: {},
    onHandleBack: () => {},
    onHandleNext: () => {},
    setStepFormData: () => {},
    step: 0,
  });
  
  interface IProps {
    children: ReactNode;
  }
  
  
 
  
  export const MultiStepFormProvider = ({ children }: IProps) => {
    const [stepFormData, setStepFormData] = useState({});
    const [step, setStep] = useState(1);
  
    function onHandleNext() {
      setStep((prev) => prev + 1);
    }
  
    function onHandleBack() {
      setStep((prev) => prev - 1);
    }
    
    const contextValue = useMemo(
      () => ({ stepFormData, setStepFormData, step, onHandleNext,  onHandleBack }),
      [stepFormData, setStepFormData, step, onHandleNext,  onHandleBack],
    );

    
    return (
      <MultiStepFormContext.Provider
        value={ contextValue }
      >
        {children}
      </MultiStepFormContext.Provider>
    );
  }
  
  export const useMultiStepFormContext = () => {
    const ctx = useContext(MultiStepFormContext);
    if (!ctx)
      throw new Error('Cannot find MultiStepFormContext. It should be wrapped within MultiStepFormContextProvider.');
    return ctx;
  }
 
