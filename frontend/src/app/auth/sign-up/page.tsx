'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUpPage = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({resolver: zodResolver(signUpSchema)})

    const handleSignUp = (data: SignUpFormValues) => {
        console.log(data)
    }

    return (
        <div className="flex items-center justify-center h-screen w-full bg-cover bg-center bg-[url('/assets/sign-up-background.png')] bg-no-repeat">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    {...register('firstName')}
                                    className={errors.firstName ? 'border-red-500' : ''}
                                />
                                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Robinson"
                                    {...register('lastName')}
                                    className={errors.lastName ? 'border-red-500' : ''}
                                />
                                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email')}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="********"
                                type="password"
                                {...register('password')}
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" onClick={handleSubmit(handleSignUp)}>
                            Create an account
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                Sign up with Google
              </Button> */}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/auth/sign-in" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpPage
