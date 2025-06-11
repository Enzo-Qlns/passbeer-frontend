import { JSX, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useVault } from "@/hooks/use-vault"
import passwordService from "@/api/password"
import useCrypto from "@/hooks/use-crypto"

const passwordSchema = z.object({
    name: z.string().min(1, "Le nom d'utilisateur est requis"),
    password: z.string().min(1, "Le mot de passe est requis"),
    url: z.string().url("L'URL n'est pas valide").optional().or(z.literal("")),
    comment: z.string().optional(),
    vault_id: z.number().min(1, "Le coffre-fort est requis"),
})

type PasswordFormData = z.infer<typeof passwordSchema>

const DialogNewPassword = (): JSX.Element => {
    const { encryptData } = useCrypto()

    const {
        newPasswordDialogOpen,
        setNewPasswordDialogOpen,
        vaults,
        loading,
        setPasswords,
        passwords,
        selectedVault,
    } = useVault()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    })

    useEffect(() => {
        if (selectedVault) {
            setValue("vault_id", selectedVault)
        }
    }, [selectedVault, setValue])

    const onSubmit = async (data: PasswordFormData) => {
        try {
            const response = await passwordService.createPassword({
                name: data.name,
                password: encryptData(data.password).data as string,
                url: data.url || "",
                comment: data.comment || "",
                vault_id: data.vault_id
            })
            setPasswords([...passwords, response])
            reset()
            setNewPasswordDialogOpen(false)
            toast.success("Mot de passe ajouté avec succès")
        } catch (error) {
            console.error("Error creating password:", error)
        }
    }

    return (
        <Dialog open={newPasswordDialogOpen} onOpenChange={setNewPasswordDialogOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Ajouter un mot de passe</DialogTitle>
                    <DialogDescription>
                        Ajoutez un nouveau mot de passe à votre coffre-fort.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="vault" className="text-right">
                                Coffre-fort
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    onValueChange={(value: string) => setValue("vault_id", parseInt(value))}
                                    disabled={loading}
                                    defaultValue={selectedVault?.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="Sélectionnez un coffre-fort"
                                            defaultValue={selectedVault?.toString()}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vaults.map((vault) => (
                                            <SelectItem key={vault.id} value={vault.id.toString()}>
                                                {vault.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.vault_id && (
                                    <p className="text-sm text-red-500 mt-1">{errors.vault_id.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nom d'utilisateur
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("name")}
                                    type="text"
                                    id="name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Mot de passe
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("password")}
                                    type="password"
                                    id="password"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="url" className="text-right">
                                Url du site
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("url")}
                                    type="url"
                                    id="url"
                                />
                                {errors.url && (
                                    <p className="text-sm text-red-500 mt-1">{errors.url.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="comment" className="text-right">
                                Commentaire
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    {...register("comment")}
                                    type="text"
                                    id="comment"
                                />
                                {errors.comment && (
                                    <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Enregistrer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogNewPassword