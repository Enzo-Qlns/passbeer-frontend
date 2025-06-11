import { Password } from "./password";

type Vault = {
    id: number;
    name: string;
}

type VaultContextType = {
    newPasswordDialogOpen: boolean;
    setNewPasswordDialogOpen: (open: boolean) => void;
    newVaultDialogOpen: boolean;
    setNewVaultDialogOpen: (open: boolean) => void;
    passwords: Password[];
    setPasswords: (passwords: Password[]) => void;
    vaults: Vault[];
    setVaults: (vaults: Vault[]) => void;
    selectedVault: Vault['id'] | null;
    setSelectedVault: (vault: Vault['id'] | null) => void;
    loading: boolean;
}

export type { Vault, VaultContextType };