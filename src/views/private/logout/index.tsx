import { useEffect } from "react";
import { useNavigate } from "react-router";

// Components
import Loader from "@/components/ui/loader";

// Hooks
import { useAuth } from "@/hooks/use-auth";

import { routes } from "@/data";

const LogoutPage = () => {
    const { clearToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        clearToken();
        setTimeout(() => {
            navigate(routes.publicRoutes.HOME, { replace: true });
            window.location.reload();
        }, 100);
        // eslint-disable-next-line
    }, []);

    return <div className="flex items-center justify-center h-screen"><Loader /></div>

};

export default LogoutPage;