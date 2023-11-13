import Link from "next/link";
import { Button } from "../Button/Button";

const UnloginHeader = () => {
    
    return (
      <Link href={"/login"}>
        <Button color="red" size="small" >
          로그인
        </Button>
      </Link>
    );
  };
  
  export default UnloginHeader;