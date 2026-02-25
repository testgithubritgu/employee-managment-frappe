import { useState, type FC } from "react"
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
import { useForm, Controller } from "react-hook-form"
import { useFrappeAuth } from "frappe-react-sdk"
import { useNavigate } from "react-router-dom"
export const FormSchema = z.object({
    name: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(3, { message: "Password must be at least 8 characters" }),
    image: z
        .instanceof(FileList)
        .refine((files) => files.length === 1, "Image is required")
        .refine(
            (files) => files[0].size <= 2 * 1024 * 1024,
            "Max image size is 2MB"
        )
        .refine(
            (files) =>
                ["image/jpeg", "image/png", "image/webp"].includes(files[0].type),
            "Only JPG, PNG, WEBP allowed"
        ).optional(),
})

export type FormValues = z.infer<typeof FormSchema>
type Loading = boolean
const getLoginErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object") {
        const apiError = error as { message?: string; exception?: string }
        return apiError.message || apiError.exception || "Invalid username or password"
    }

    return "Invalid username or password"
}

const Login: FC = () => {
    const { login, isLoading } = useFrappeAuth()
    const [preview, setPreview] = useState<string | null>(null)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            password: "",
            image: undefined,
        },
    })

    const onSubmit = async (data: FormValues) => {
        try {
          
            await login({
                username: data.name,
                password: data.password,
            })
            window.location.reload()

        } catch (error: unknown) {
            setError("root", {
                type: "server",
                message: getLoginErrorMessage(error),
            })
        }
    }
    const isBusy: Loading = isLoading || isSubmitting
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
                                <Label htmlFor="image">User Image</Label>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <Input
                                            disabled={isBusy}
                                            id="image"

                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                onChange(e.target.files)
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    setPreview(URL.createObjectURL(file))
                                                }
                                            }}
                                        />
                                    )}
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="h-24 w-24 rounded-md object-cover border"
                                    />
                                )}
                                {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
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
