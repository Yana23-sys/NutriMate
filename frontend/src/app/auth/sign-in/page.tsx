'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { useRouter } from 'next/navigation'
import { login } from '@/store/auth/slice'
import { useState, useEffect } from 'react'


const SignInPage = (): JSX.Element => {
    const router = useRouter()
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated])

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleLogin = () => {
      setEmailError(false)
      setPasswordError(false)

      if (!email) {
        setEmailError(true)
        setErrorMessage('Please enter your email address')
        return
      }
      if (!password) {
        setPasswordError(true)
        setErrorMessage('Please enter your password')
        return
      }

      if (!validateEmail(email)) {
          setErrorMessage('Please enter a valid email address')
          return
      }

      setErrorMessage('')
      dispatch(login({ email, password }))
    }

    return (
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? 'border-red-500' : ''}
                  
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  value={password} 
                  id="password" 
                  type="password" 
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? 'border-red-500' : ''}
                   />
              </div>

              {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
              )}

              <Button type="submit" className="w-full" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/assets/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
  }

  export default SignInPage