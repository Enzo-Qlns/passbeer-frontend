import React from "react"
import { EyeOff, Eye } from "lucide-react"

import { Button } from "../ui/button"

const PasswordCell = ({ password }: { password: string }) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="flex items-center space-x-2">
            <span>{showPassword ? password : "••••••••"}</span>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="h-8 w-8 p-0"
            >
                <span className="sr-only">
                    {showPassword ? "Masquer" : "Afficher"} le mot de passe
                </span>
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}

export default PasswordCell