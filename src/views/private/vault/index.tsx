import { JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Copy, Edit, Share } from "lucide-react";

import { ContentLayout } from "@/components/private/content-layout";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import DropdownMenuCreate from "../home/dropdown-menu-create";
import { DataTablePassword } from "../home/data-table-password";
import passwordService from "@/api/password";
import vaultService from "@/api/vault";
import { useVault } from "@/hooks/use-vault";
import useCrypto from "@/hooks/use-crypto";

const VaultPage = (): JSX.Element => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {
        setSelectedVault,
        passwords,
        setPasswords,
    } = useVault();
    const { decryptData } = useCrypto();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Vérifier d'abord si le vault existe
                await vaultService.getVault(Number(id));
                // Si oui, charger les mots de passe
                const data = await passwordService.getVaultPasswords(Number(id));
                setPasswords(data.map((password) => ({
                    ...password,
                    password: decryptData(password.password).data as string
                })) || []);
                setError(null);
                setSelectedVault(Number(id));
            } catch (error) {
                console.error("Error fetching vault data:", error);
                setError("Coffre-fort introuvable");
                setPasswords([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return (
            <ContentLayout>
                <div className="text-center py-8">
                    <h2 className="text-xl font-semibold text-gray-200 mb-2">{error}</h2>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                        className="mt-4"
                    >
                        Retour à l'accueil
                    </Button>
                </div>
            </ContentLayout>
        );
    }

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

export default VaultPage; 