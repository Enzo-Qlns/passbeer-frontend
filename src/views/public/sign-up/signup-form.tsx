import { JSX, useState } from "react"
import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import authService from "@/api/auth"

import { routes } from "@/data"

const SignUpSchema = z.object({
    email: z.string().email({ message: "Adresse email invalide." }),
    password: z.string().min(8, { message: "Le mot de passe doit faire au moins 8 caractères." }),
    confirmPassword: z.string().min(8, { message: "La confirmation doit faire au moins 8 caractères." }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas.",
})

const SignupForm = (): JSX.Element => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(data: z.infer<typeof SignUpSchema>) {
        setLoading(true)
        await authService.register(data.email, data.password)
            .then(() => {
                toast.success("Inscription réussie ! 🎉")
                navigate(routes.publicRoutes.SIGNIN)
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    form.setError("root", {
                        type: "server",
                        message: "Email ou mot de passe incorrect"
                    })
                } else {
                    form.setError("root", {
                        type: "server",
                        message: "Une erreur est survenue lors de l'inscription"
                    })
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="exemple@email.com" type="email" autoFocus {...field} />
                            </FormControl>
                            <FormDescription>On ne partagera jamais ton email.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" type="password" {...field} />
                            </FormControl>
                            <FormDescription>Minimum 8 caractères.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirme ton mot de passe</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="size-4 animate-spin" /> : "S'inscrire"}
                </Button>
            </form>
        </Form>
    )
}

export default SignupForm