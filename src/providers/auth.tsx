import {
    useMemo,
    useReducer,
    ReactNode,
    useEffect,
} from "react";

import { DOMAIN } from "@/api/constants";
import authService from "@/api/auth";

import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";

import { AuthContext } from "@/contexts/auth";

import { User } from "@/types/api";

// Types
type AuthState = {
    token: string | null;
    user: User | null;
};

type AuthAction =
    | { type: "setToken"; payload: { token: string } }
    | { type: "clearToken" }
    | { type: "setUser"; payload: User };

type AuthContextType = AuthState & {
    setToken: (newToken: string) => void;
    clearToken: () => void;
    setUser: (user: User) => void;
};

export type { AuthContextType };

const ACTIONS = {
    setToken: "setToken",
    clearToken: "clearToken",
    setUser: "setUser",
} as const;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case ACTIONS.setToken: {
            const { token } = action.payload;

            setCookie("token", token.toString(), {
                domain: DOMAIN,
                secure: window.location.protocol === "https:",
                sameSite: "Lax"
            });

            return { ...state, token };
        }

        case ACTIONS.clearToken:
            deleteCookie("token", "/", DOMAIN);
            localStorage.removeItem("user");

            return { ...state, token: null, user: null };

        case ACTIONS.setUser:
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload };

        default:
            console.error(`Unknown action type: ${JSON.stringify(action)}`);
            return state;
    }
};

const initialData: AuthState = {
    token: getCookie('token') || null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialData);

    const setToken = (newToken: string) => {
        dispatch({ type: ACTIONS.setToken, payload: { token: newToken } });
    };

    const clearToken = () => {
        dispatch({ type: ACTIONS.clearToken });
    };

    const setUser = (user: User) => {
        dispatch({ type: ACTIONS.setUser, payload: user });
    };

    useEffect(() => {
        if (state.token) {
            authService.getCurrentUser()
                .then((user) => {
                    setUser(user);
                })
                .catch(() => {
                    clearToken();
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const contextValue = useMemo(
        () => ({
            ...state,
            setToken,
            clearToken,
            setUser,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;