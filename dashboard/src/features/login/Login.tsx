import type { FC } from "react"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useFrappeAuth } from "frappe-react-sdk"
export const FormSchema = z.object({
    name: z.string().min(1, { message: "Invalid name Address" }),
    password: z.string().min(2, { message: "Password must be min 8 char" })
})

export type FormValues = z.infer<typeof FormSchema>
const Login: FC = () => {
    const {login , isLoading} = useFrappeAuth()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            password: ""
        }
    })

    const onsubmit = async (data: FormValues) => {
        login({
            username:data.name,
            password:data.password
        }).then(()=>{console.log('login successfull')}).catch(()=>{
            console.log('error in login')
        })

    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your name below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {errors.root && <p>{errors.root.message}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    placeholder="m@example.com"
                                    required
                                />
                                {errors.name && <p>{errors.name.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" {...register("password")} required />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                        </div>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                {isLoading ? "Submiting..." : "Submit"}
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login