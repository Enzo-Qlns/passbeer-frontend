import { JSX } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

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

import { useVault } from "@/hooks/use-vault"

import vaultService from "@/api/vault"

const passwordSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
})

type PasswordFormData = z.infer<typeof passwordSchema>

const DialogNewVault = (): JSX.Element => {
    const {
        newVaultDialogOpen,
        setNewVaultDialogOpen,
        vaults,
        setVaults,
        loading,
    } = useVault()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    })

    const onSubmit = async (data: PasswordFormData) => {
        try {
            const response = await vaultService.createVault({
                name: data.name,
            })
            setVaults([...vaults, response])
            reset()
            setNewVaultDialogOpen(false)
            toast.success("Coffre-fort ajouté avec succès")
        } catch (error) {
            console.error("Error creating vault:", error)
        }
    }

    return (
        <Dialog open={newVaultDialogOpen} onOpenChange={setNewVaultDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un coffre-fort</DialogTitle>
                    <DialogDescription>
                        Ajoutez un nouveau coffre-fort.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="name" className="text-right">
                            Nom
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
                    <DialogFooter>
                        <Button type="submit">
                            Enregistrer
                            {loading && <Loader2 className="w-4 h-4 ml-2" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogNewVault