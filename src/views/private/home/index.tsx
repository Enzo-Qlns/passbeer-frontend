import { JSX, useEffect, useState } from "react";
import { Copy, Edit, Share } from "lucide-react";

import { ContentLayout } from "@/components/private/content-layout";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import DropdownMenuCreate from "./dropdown-menu-create";
import { DataTablePassword } from "./data-table-password";
import passwordService from "@/api/password";
import { useVault } from "@/hooks/use-vault";
import useCrypto from "@/hooks/use-crypto";

const HomePage = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const { setPasswords, passwords } = useVault();
    const { decryptData } = useCrypto();

    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const data = await passwordService.getPasswords();
                console.log(data.map((password) => ({
                    ...password,
                    password: decryptData(password.password).data as string
                })) || [])
                setPasswords(data.map((password) => ({
                    ...password,
                    password: decryptData(password.password).data as string
                })) || []);
            } catch (error) {
                console.error("Error fetching passwords:", error);
                setPasswords([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPasswords();
    }, []);

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
            {loading ? (
                <div className="text-center py-4">Chargement...</div>
            ) : (
                <DataTablePassword data={passwords} />
            )}
        </ContentLayout>
    );
};

export default HomePage;