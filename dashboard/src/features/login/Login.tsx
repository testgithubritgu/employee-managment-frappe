import type { FC } from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useFrappeAuth } from "frappe-react-sdk"
import { useNavigate } from "react-router-dom"

export const FormSchema = z.object({
    name: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(2, { message: "Password must be at least 8 characters" }),
})

export type FormValues = z.infer<typeof FormSchema>

const getLoginErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object") {
        const apiError = error as { message?: string; exception?: string }
        return apiError.message || apiError.exception || "Invalid username or password"
    }

    return "Invalid username or password"
}

const Login: FC = () => {
    const { login, isLoading } = useFrappeAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    })

    const onSubmit = async (data: FormValues) => {
        try {
            await login({
                username: data.name,
                password: data.password,
            })
            navigate("/dashboard")

        } catch (error: unknown) {
            setError("root", {
                type: "server",
                message: getLoginErrorMessage(error),
            })
        }
    }
    const isBusy = isLoading || isSubmitting
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your username and password to continue
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" type="button">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Username</Label>
                                <Input
                                    disabled={isBusy}
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    placeholder="username or email"
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
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
                                <Input disabled={isBusy} id="password" type="password" {...register("password")} />
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                            {isLoading || isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                    <CardFooter className="flex-col gap-2">

                        <Button variant="outline" className="w-full" type="button">
                            Login with Google
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
