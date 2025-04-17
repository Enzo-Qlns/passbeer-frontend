import { useVaultContext } from '../contexts/vault'

export const useVault = () => {
    const context = useVaultContext()
    return context
}