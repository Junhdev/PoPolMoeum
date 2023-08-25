import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
  } from "react";
  
  interface MultiStepFormContextValue {
    formData: any;
    setFormData: Dispatch<SetStateAction<any>>;
    onHandleBack: () => void;
    onHandleNext: () => void;
    step: number;
  }
  
  const MultiStepFormContext = createContext<MultiStepFormContextValue>({
    formData: {},
    onHandleBack: () => {},
    onHandleNext: () => {},
    setFormData: () => {},
    step: 0,
  });
  
  interface IProps {
    children: ReactNode;
  }
  
  const MultiStepFormContextProvider = ({ children }: IProps) => {
    const [formData, setFormData] = useState();
    const [step, setStep] = useState(1);
  
    function onHandleNext() {
      setStep((prev) => prev + 1);
    }
  
    function onHandleBack() {
      setStep((prev) => prev - 1);
    }
  
    return (
      <MultiStepFormContext.Provider
        value={{ formData, setFormData, onHandleBack, onHandleNext, step }}
      >
        {children}
      </MultiStepFormContext.Provider>
    );
  }
  
  const useMultiStepFormContext = () => {
    const ctx = useContext(MultiStepFormContext);
    if (!ctx)
      throw new Error('Cannot find FormStepContext. It should be wrapped within FormStepContextProvider.');
    return ctx;
  }
 
  export { MultiStepFormContextProvider, useMultiStepFormContext }