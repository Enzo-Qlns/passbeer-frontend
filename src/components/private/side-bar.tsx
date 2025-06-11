import {
    Dispatch,
    SetStateAction,
    useState
} from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
    ChevronsRight,
    LogOut,
    LucideIcon,
    Folder,
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAuth } from "@/hooks/use-auth";
import { useVault } from "@/hooks/use-vault";

import { navList, routes } from "@/data";

import logo from "@/assets/img/logo.png";

const VaultList = ({ open }: { open: boolean }) => {
    const { vaults } = useVault();
    const location = useLocation();

    return (
        <div className="space-y-1 mt-4">
            <div className="px-2 text-xs font-semibold text-gray-400">
                {open ? "Coffres-forts" : ""}
            </div>
            {vaults.length === 0 ? (
                <div className="px-2 text-xs text-gray-400">
                    {open ? "Aucun coffre-fort" : ""}
                </div>
            ) : (
                vaults.map((vault) => {
                    const isSelected = location.pathname === `/vault/${vault.id}`;
                    return (
                        <Tooltip key={vault.id}>
                            <TooltipTrigger asChild>
                                <motion.button
                                    layout
                                    className={`relative flex h-10 w-full items-center rounded-md transition-colors cursor-pointer ${isSelected ? "bg-yellow-600 text-white" : "text-white hover:bg-stone-900"}`}
                                >
                                    <Link to={`/vault/${vault.id}`} className="w-full h-full flex items-center gap-2">
                                        <motion.div
                                            layout
                                            className="grid h-full w-10 place-content-center text-lg"
                                        >
                                            <Folder />
                                        </motion.div>
                                        {open && (
                                            <motion.span
                                                layout
                                                className="text-xs font-medium"
                                            >
                                                {vault.name}
                                            </motion.span>
                                        )}
                                    </Link>
                                </motion.button>
                            </TooltipTrigger>
                            {!open && (
                                <TooltipContent side="right">
                                    <p>{vault.name}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    );
                })
            )}
        </div>
    );
};

const Sidebar = () => {
    const [open, setOpen_] = useState(localStorage.getItem("sidebar") ? JSON.parse(localStorage.getItem("sidebar")!) : true);

    const setOpen = () => {
        setOpen_((pv: boolean) => !pv);
        localStorage.setItem("sidebar", JSON.stringify(!open));
    }

    return (
        <motion.nav
            layout
            className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-stone-950 p-2 hidden sm:block"
            style={{
                width: open ? "225px" : "fit-content",
            }}
        >
            <TitleSection open={open} />

            <div className="space-y-1">
                {navList.map((navItem) => (
                    <Option
                        key={navItem.label}
                        Icon={navItem.icon}
                        title={navItem.label}
                        open={open}
                        href={navItem.href}
                    />
                ))}
            </div>

            <VaultList open={open} />

            <div className="absolute bottom-16 left-0 right-0 p-2">
                <Option
                    Icon={LogOut}
                    title="Se déconnecter"
                    open={open}
                    href={routes.privateRoutes.LOGOUT}
                />
            </div>

            <ToggleClose open={open} setOpen={setOpen} />
        </motion.nav>
    );
};

const Option = ({
    Icon,
    title,
    open,
    notifs,
    href,
}: {
    Icon: LucideIcon;
    title: string;
    open: boolean;
    notifs?: number;
    href: string;
}) => {
    const location = useLocation();
    const isSelected = location.pathname === href;
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.button
                    layout
                    className={`relative flex h-10 w-full items-center rounded-md transition-colors cursor-pointer ${isSelected ? "bg-yellow-600 text-white" : "text-white hover:bg-stone-900"}`}
                >
                    <Link to={href} className="w-full h-full flex items-center gap-2">
                        <motion.div
                            layout
                            className="grid h-full w-10 place-content-center text-lg"
                        >
                            <Icon />
                        </motion.div>
                        {open && (
                            <motion.span
                                layout
                                className="text-xs font-medium"
                            >
                                {title}
                            </motion.span>
                        )}

                        {notifs && open && (
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                style={{ y: "-50%" }}
                                transition={{ delay: 0.5 }}
                                className="absolute right-2 top-1/2 size-4 rounded bg-yellow-600 text-xs text-white"
                            >
                                {notifs}
                            </motion.span>
                        )}
                    </Link>
                </motion.button>
            </TooltipTrigger>
            {!open && (
                <TooltipContent side="right">
                    <p>{title}</p>
                </TooltipContent>
            )}
        </Tooltip>
    );
};

const TitleSection = ({ open }: { open: boolean }) => {
    const { user } = useAuth();
    return (
        <div className="mb-3 border-b border-slate-300 pb-3">
            <div className="flex items-center justify-between rounded-md transition-colors hover:bg-stone-950">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                        >
                            <span className="block text-lg font-semibold">
                                PassBeer
                            </span>
                            <span className="block text-xs font-medium">
                                {user?.email}
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Logo = () => {
    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md bg-white"
        >
            <img src={logo} alt="logo" className="w-8 h-8" />
        </motion.div>
    );
};

const ToggleClose = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <motion.button
            layout
            onClick={() => setOpen((pv) => !pv)}
            className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-stone-900 cursor-pointer"
        >
            <div className="flex items-center p-2">
                <motion.div
                    layout
                    className="grid size-10 place-content-center text-lg"
                >
                    <ChevronsRight
                        className={`transition-transform ${open && "rotate-180"}`}
                    />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="sr-only"
                    >
                        Cacher
                    </motion.span>
                )}
            </div>
        </motion.button>
    );
};

export default Sidebar;