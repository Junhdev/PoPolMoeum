'use client';

import { useAuthState } from '@/context/auth';
import LoginHeader from './LoginHeader';
import UnloginHeader from './UnLoginHeader';

const AuthHeader = () => {

  const { authenticated } = useAuthState();
 

  return (
  <>
    {authenticated ? <LoginHeader /> : <UnloginHeader />}
  </>
  )
};

export default AuthHeader;