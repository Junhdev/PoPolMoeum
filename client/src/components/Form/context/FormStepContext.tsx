import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
  } from "react";
  
  interface FormStepContextValue {
    formData: any;
    setFormData: Dispatch<SetStateAction<any>>;
    onHandleBack: () => void;
    onHandleNext: () => void;
    step: number;
  }
  
  const FormStepContext = createContext<FormStepContextValue>({
    formData: {},
    onHandleBack: () => {},
    onHandleNext: () => {},
    setFormData: () => {},
    step: 0,
  });
  
  interface IProps {
    children: ReactNode;
  }
  
  const FormStepContextProvider = ({ children }: IProps) => {
    const [formData, setFormData] = useState();
    const [step, setStep] = useState(1);
  
    function onHandleNext() {
      setStep((prev) => prev + 1);
    }
  
    function onHandleBack() {
      setStep((prev) => prev - 1);
    }
  
    return (
      <FormStepContext.Provider
        value={{ formData, setFormData, onHandleBack, onHandleNext, step }}
      >
        {children}
      </FormStepContext.Provider>
    );
  }
  
  const useFormStepContext = () => {
    return useContext(FormStepContext);
  }

  export default { FormStepContextProvider, useFormStepContext }