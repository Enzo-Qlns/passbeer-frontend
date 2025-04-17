import {
    useMemo,
    useReducer,
    ReactNode,
    useEffect,
} from "react";

import axios from "axios";

import { DOMAIN } from "@/api/constants";
import profileService from "@/api/profile";

import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";

import { AuthContext } from "@/contexts/auth";

import { User } from "@/types/user";

// Types
type AuthState = {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
};

type AuthAction =
    | { type: "setToken"; payload: { token: string; refreshToken: string } }
    | { type: "clearToken" }
    | { type: "setUser"; payload: User };

type AuthContextType = AuthState & {
    setToken: (newToken: string, newRefreshToken: string) => void;
    clearToken: () => void;
    setUser: (user: User) => void;
    refreshAccessToken: () => Promise<void>;
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
            const { token, refreshToken } = action.payload;

            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            setCookie("token", token.toString(), {
                domain: DOMAIN,
                secure: window.location.protocol === "https:",
                sameSite: "Lax"
            });
            setCookie("refreshToken", refreshToken.toString(), {
                domain: DOMAIN,
                secure: window.location.protocol === "https:",
                sameSite: "Lax"
            });

            return { ...state, token, refreshToken };
        }

        case ACTIONS.clearToken:
            delete axios.defaults.headers.common["Authorization"];
            deleteCookie("token", "/", DOMAIN);
            deleteCookie("refreshToken", "/", DOMAIN);
            localStorage.removeItem("user");

            return { ...state, token: null, refreshToken: null, user: null };

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
    refreshToken: getCookie('refreshToken') || null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialData);

    const setToken = (newToken: string, newRefreshToken: string) => {
        dispatch({ type: ACTIONS.setToken, payload: { token: newToken, refreshToken: newRefreshToken } });
    };

    const clearToken = () => {
        dispatch({ type: ACTIONS.clearToken });
    };

    const setUser = (user: User) => {
        dispatch({ type: ACTIONS.setUser, payload: user });
    };

    const refreshAccessToken = async () => {
        if (!state.refreshToken) {
            console.error("No refresh token available to refresh access token.");
            return;
        }

        try {
            const response = await axios.post("/auth/refresh", {
                refreshToken: state.refreshToken,
            });

            const { token, refreshToken } = response.data;
            setToken(token, refreshToken);
        } catch (error) {
            console.error("Failed to refresh access token:", error);
            clearToken();
        }
    };

    useEffect(() => {
        if (state.token) {
            profileService.getMe()
                .then((response) => {
                    const user = response.data as User;
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
            refreshAccessToken,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;