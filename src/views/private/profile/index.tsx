import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { ChangePasswordDialog } from '@/components/ui/ChangePasswordDialog';
import { Button } from '@/components/ui/button';
import authService from '@/api/auth';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    await authService.changePassword(oldPassword, newPassword);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Informations personnelles</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Email :</span> {user?.email}</p>
              <p><span className="font-medium">Nom :</span> {user?.full_name || 'Non renseigné'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Sécurité</h2>
            <Button onClick={() => setIsChangePasswordOpen(true)}>
              Modifier le mot de passe
            </Button>
          </div>
        </div>
      </div>

      <ChangePasswordDialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
        onSubmit={handleChangePassword}
      />
    </div>
  );
} 