import { JSX } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useVault } from "@/hooks/use-vault"

const DropdownMenuCreate = (): JSX.Element => {
    const {
        setNewPasswordDialogOpen,
        setNewVaultDialogOpen
    } = useVault()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>Créer</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setNewPasswordDialogOpen(true)}>
                        Mot de passe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNewVaultDialogOpen(true)}>
                        Coffre-fort
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownMenuCreate