import { useMultiStepFormContext } from "@/components/Form/context/MultiStepFormContext";
import FirstStepSignUpForm from "./FirstStepSignUpForm";
import SecondStepSignUpForm from "./SecondStepSignUpForm";

const MultiStepSignUpForm = () => {
    const { step } = useMultiStepFormContext();
    switch (step) {
      case 1:
        return <FirstStepSignUpForm />;
      case 2:
        return <SecondStepSignUpForm />;
      default:
        return null;
    }
  }

export default MultiStepSignUpForm;