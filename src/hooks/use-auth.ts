import { useContext } from "react";

import { AuthContextType } from "@/providers/auth";

import { AuthContext } from "@/contexts/auth";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
