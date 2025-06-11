import {
    useState,
    ReactNode
} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    AlertDialogOptions,
    AlertDialogContextType,
    AlertDialogContext
} from "@/contexts/alert-dialog";

export function AlertDialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogOptions, setDialogOptions] = useState<AlertDialogOptions | null>(null);

    const alertDialog: AlertDialogContextType = (options) => {
        setDialogOptions(options);
        setIsOpen(true);
    };

    return (
        <AlertDialogContext.Provider value={alertDialog}>
            {children}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-playfair font-medium text-campus-dark">{dialogOptions?.title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-campus-dark">{dialogOptions?.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>
                            {dialogOptions?.cancelText || "Annuler"}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (dialogOptions?.onConfirm) dialogOptions.onConfirm();
                                setIsOpen(false);
                            }}
                        >
                            {dialogOptions?.confirmText || "Continuer"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AlertDialogContext.Provider>
    );
}