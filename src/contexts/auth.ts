import { createContext } from "react";

import { AuthContextType } from "@/providers/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);