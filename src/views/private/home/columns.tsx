import { ArrowUpDown } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import { Password } from "@/types/password"
import PasswordCell from "@/components/private/password-cell"

export const columns: ColumnDef<Password>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "password",
        header: "Mot de passe",
        cell: ({ row }) => <PasswordCell password={row.getValue("password") as string} />,
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }) => <div>{row.getValue("url")}</div>,
    },
    {
        accessorKey: "comment",
        header: "Commentaire",
        cell: ({ row }) => <div>{row.getValue("comment")}</div>,
    },
    {
        id: "actions",
        header: "Actions",
    },
]