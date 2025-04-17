import { useState } from "react";

import { VaultContext } from "@/contexts/vault";
import DialogNewPassword from "@/components/private/dialog-new-password";
import DialogNewFolder from "@/components/private/dialog-new-folder";

export default function VaultProvider({ children }: { children: React.ReactNode }) {
    const [newPasswordDialogOpen, setNewPasswordDialogOpen] = useState(false);
    const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);

    return (
        <VaultContext.Provider
            value={{
                newPasswordDialogOpen,
                setNewPasswordDialogOpen,
                newFolderDialogOpen,
                setNewFolderDialogOpen
            }}
        >
            <DialogNewPassword />
            <DialogNewFolder />
            {children}
        </VaultContext.Provider>
    )
}