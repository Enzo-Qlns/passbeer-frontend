type Vault = {
    id: number;
    name: string;
}

type VaultContextType = {
    newPasswordDialogOpen: boolean;
    setNewPasswordDialogOpen: (open: boolean) => void;
    newFolderDialogOpen: boolean;
    setNewFolderDialogOpen: (open: boolean) => void;
}

export type { Vault, VaultContextType };