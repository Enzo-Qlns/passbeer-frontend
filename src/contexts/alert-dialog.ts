import { createContext } from "react";

type AlertDialogOptions = {
    title: string;
    description: string | React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
};

type AlertDialogContextType = (options: AlertDialogOptions) => void;

export type { AlertDialogOptions, AlertDialogContextType };

export const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);