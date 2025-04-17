import { Home, History, Share2 } from "lucide-react";

const routes = {
  publicRoutes: {
    HOME: "/",
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    LOGOUT: "/logout",
  },
  privateRoutes: {
    HOME: "/",
    HISTORY: "/history",
    SHARED: "/shared",
    LOGOUT: "/logout",
    MON_COMPTE: "/mon-compte",
  },
};

const navList = [
  {
    label: "Accueil",
    href: routes.privateRoutes.HOME,
    icon: Home,
  },
  {
    label: "Historique",
    href: routes.privateRoutes.HISTORY,
    icon: History,
  },
  {
    label: "Partagés avec moi",
    href: routes.privateRoutes.SHARED,
    icon: Share2,
  },
];

export { routes, navList };
