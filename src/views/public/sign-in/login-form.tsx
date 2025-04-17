import React from "react"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useAuth } from "@/hooks/use-auth"

import authService from "@/api/auth"
import profileService from "@/api/profile"
import api from "@/api"

import { cn } from "@/lib/utils"

import { routes } from "@/data"

const loginSchema = z.object({
    email: z.string().min(1, "L'email est requis"),
    password: z.string().min(1, "Le mot de passe est requis")
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [loading, setLoading] = React.useState<boolean>(false)
    const {
        setToken,
        setUser
    } = useAuth()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "emilys",
            password: "emilyspass"
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true)

        await authService.authenticate(data.email, data.password)
            .then(async (response) => {
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`
                setToken(response.data.accessToken as string, response.data.refreshToken as string)
                await getMe()
            })
            .catch((error) => {
                if (error.response?.data?.message) {
                    if (error.response.data.message.includes("email")) {
                        form.setError("email", {
                            type: "server",
                            message: error.response.data.message
                        })
                    } else if (error.response.data.message.includes("password")) {
                        form.setError("password", {
                            type: "server",
                            message: error.response.data.message
                        })
                    } else {
                        form.setError("root", {
                            type: "server",
                            message: error.response.data.message
                        })
                    }
                } else {
                    form.setError("root", {
                        type: "server",
                        message: "Une erreur est survenue lors de la connexion"
                    })
                }
                setLoading(false)
            })
    }

    const getMe = async () => {
        await profileService.getMe()
            .then((response) => {
                setUser(response.data)
                window.location.href = routes.privateRoutes.HOME
            })
            .catch(() => {
                form.setError("root", {
                    type: "server",
                    message: "Une erreur est survenue lors de la récupération de votre profil"
                })
                setLoading(false)
            })
    }

    return (
        <Form {...form}>
            <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Se connecter</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Connectez-vous à votre compte
                    </p>
                </div>
                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="m@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center">
                                    <FormLabel>Mot de passe</FormLabel>
                                    <Link
                                        to="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.root && (
                        <p className="text-sm text-red-500 text-center">
                            {form.formState.errors.root.message}
                        </p>
                    )}
                    <Button type="submit" className="w-full" loading={loading}>
                        Se connecter
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Vous n'avez pas de compte ?{" "}
                    <Link to={routes.publicRoutes.SIGNUP} className="underline underline-offset-4">
                        S'inscrire
                    </Link>
                </div>
            </form>
        </Form>
    )
}
