import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Loader({ className }: { className?: string }) {
    return (
        <LoaderCircle
            className={cn(
                className,
                "animate-spin text-gray-600 dark:text-gray-400 w-8 h-8"
            )}
        />
    )
}