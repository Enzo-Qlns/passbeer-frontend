import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/hooks/use-auth";

import { routes } from "@/data";

export const ProtectedRoute = () => {
    const { token, user } = useAuth();

    // Check if the user is authenticated
    if (!token || !user) {
        // If not authenticated, redirect to the login page
        return <Navigate to={routes.publicRoutes.SIGNIN} />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};