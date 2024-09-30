'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper = (props: any) => {
    const router = useRouter();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/sign-in'); 
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default WithAuth;
