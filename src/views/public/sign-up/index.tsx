import { JSX } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import LoginPlaceholder from "../sign-in/login-placeholder";
import SignUpForm from "./signup-form";

import { routes } from "@/data";

const SignIUpPage = (): JSX.Element => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                ease: "easeInOut",
            }}
        >
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <Link to={routes.publicRoutes.SIGNIN} className="flex items-center gap-2 font-medium">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <ChevronLeft className="size-4" />
                            </div>
                            Se connecter
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <div className="flex flex-col items-center gap-2 text-center mb-8">
                                <h1 className="text-2xl font-bold">S'inscrire</h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Créez un compte pour accéder à la plateforme.
                                </p>
                            </div>
                            <SignUpForm />
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-accent lg:block">
                    <LoginPlaceholder />
                </div>
            </div>
        </motion.div>
    );
}

export default SignIUpPage;