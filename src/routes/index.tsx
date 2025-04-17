import React, {
    Suspense,
} from "react";

import {
    RouterProvider,
    createBrowserRouter,
} from "react-router";

import { useAuth } from "@/hooks/use-auth";

import Loader from "@/components/ui/loader";

// Helpers
import { routes } from "@/data";
import { ProtectedRoute } from "./protected";


// Public Page
const NotFound = React.lazy(() => import('@/views/errors/not-found'));
const PublicHomePage = React.lazy(() => import('@/views/public/home'));
const PublicSignInPage = React.lazy(() => import('@/views/public/sign-in'));
const PublicSignIUpPage = React.lazy(() => import('@/views/public/sign-up'));

// Private Pages
const LogoutPage = React.lazy(() => import('@/views/private/logout'));
const PrivateHomePage = React.lazy(() => import('@/views/private/home'));
const PrivateMonComptePage = React.lazy(() => import('@/views/private/mon-compte'));

const Routes = () => {
    const { token } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "*",
            element: <NotFound />,
        },
        {
            path: routes.publicRoutes.LOGOUT,
            element: <LogoutPage />,
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: routes.publicRoutes.HOME,
            children: [
                {
                    path: routes.publicRoutes.SIGNIN,
                    element: <PublicSignInPage />,
                },
                {
                    path: routes.publicRoutes.HOME,
                    element: <PublicHomePage />,
                },
                {
                    path: routes.publicRoutes.SIGNUP,
                    element: <PublicSignIUpPage />,
                },
            ]
        }
    ];

    // Define routes accessible only to education leader
    const routerForAuthenticatedOnly = [
        {
            path: routes.publicRoutes.HOME,
            element: <ProtectedRoute />,
            children: [
                {
                    path: routes.privateRoutes.HOME,
                    element: <Suspense
                        fallback={
                            <Loader className="absolute top-1/3 left-1/2" />
                        }
                    >
                        <PrivateHomePage />
                    </Suspense>
                },
                {
                    path: routes.privateRoutes.MON_COMPTE,
                    element: <Suspense
                        fallback={
                            <Loader className="absolute top-1/3 left-1/2" />
                        }
                    >
                        <PrivateMonComptePage />
                    </Suspense>
                },
            ],
        }
    ]

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routerForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;