import { JSX } from "react";
import { Copy, Edit, Share } from "lucide-react";

import { ContentLayout } from "@/components/private/content-layout";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import DropdownMenuCreate from "./dropdown-menu-create";
import { DataTablePassword } from "./data-table-password";

const data: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@example.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@example.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@example.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@example.com",
    },
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@example.com",
    },
]

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const HomePage = (): JSX.Element => {
    return (
        <ContentLayout>
            <div className="flex space-x-4 mb-4">
                <DropdownMenuCreate />
                <ButtonGroup>
                    <Button variant="outline" disabled>
                        <Copy className="w-4 h-4" />
                        Copier
                    </Button>
                    <Button variant="outline" disabled>
                        <Edit className="w-4 h-4" />
                        Modifier
                    </Button>
                    <Button variant="outline" disabled>
                        <Share className="w-4 h-4" />
                        Partager
                    </Button>
                </ButtonGroup>
            </div>
            <DataTablePassword data={data} />
        </ContentLayout>
    )
}

export default HomePage;