import { AnimatePresence } from "framer-motion";

import Routes from "@/routes";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AlertDialogProvider } from "./alert-dialog";
import AuthProvider from "./auth";
import { ThemeProvider } from "./theme"
import VaultProvider from "./vault";

export default function Providers() {
    return (
        <AnimatePresence mode={"wait"}>
            <ThemeProvider defaultTheme="dark">
                <TooltipProvider delayDuration={0}>
                    <AlertDialogProvider>
                        <AuthProvider>
                            <VaultProvider>
                                <Routes />
                                <Toaster />
                            </VaultProvider>
                        </AuthProvider>
                    </AlertDialogProvider>
                </TooltipProvider>
            </ThemeProvider>
        </AnimatePresence>
    )
}