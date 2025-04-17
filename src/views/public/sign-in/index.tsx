import { JSX } from "react";
import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

import { LoginForm } from "./login-form";
import LoginPlaceholder from "./login-placeholder";

import { routes } from "@/data";

const SignInPage = (): JSX.Element => {
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
                        <Link to={routes.publicRoutes.HOME} className="flex items-center gap-2 font-medium">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <ChevronLeft className="size-4" />
                            </div>
                            Accueil
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-accent lg:block">
                    <LoginPlaceholder />
                </div>
            </div>
        </motion.div>
    )
}

export default SignInPage;