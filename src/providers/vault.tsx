import { useState, useEffect } from "react";

import { VaultContext } from "@/contexts/vault";
import DialogNewPassword from "@/components/private/dialog-new-password";
import DialogNewVault from "@/components/private/dialog-new-vault";
import vaultService from "@/api/vault";
import { Vault } from "@/types/vault";
import { Password } from "@/types/password";

export default function VaultProvider({ children }: { children: React.ReactNode }) {
    const [newPasswordDialogOpen, setNewPasswordDialogOpen] = useState(false);
    const [newVaultDialogOpen, setNewVaultDialogOpen] = useState(false);
    const [vaults, setVaults] = useState<Vault[]>([]);
    const [selectedVault, setSelectedVault] = useState<Vault['id'] | null>(null);
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVaults = async () => {
            try {
                const vaultsList = await vaultService.getVaults();
                setVaults(vaultsList);
            } catch (error) {
                console.error("Error fetching vaults:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVaults();
    }, []);

    return (
        <VaultContext.Provider
            value={{
                newPasswordDialogOpen,
                setNewPasswordDialogOpen,
                newVaultDialogOpen,
                setNewVaultDialogOpen,
                setVaults,
                vaults,
                passwords,
                setPasswords,
                selectedVault,
                setSelectedVault,
                loading
            }}
        >
            <DialogNewPassword />
            <DialogNewVault />
            {children}
        </VaultContext.Provider>
    )
}