import { createContext, useContext } from 'react'
import { VaultContextType } from '@/types/vault'

export const VaultContext = createContext<VaultContextType | undefined>(
  undefined
)

export function useVaultContext() {
  const context = useContext(VaultContext)
  if (!context) {
    throw new Error('useVaultContext must be used within a VaultProvider')
  }
  return context
}