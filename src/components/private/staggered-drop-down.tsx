import {
    Dispatch,
    SetStateAction,
    useState
} from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
    EllipsisVertical,
    LogOut,
    LucideIcon,
    User
} from "lucide-react";

import { routes } from "@/data";

const StaggeredDropDown = () => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div animate={open ? "open" : "closed"} className="fixed bottom-4 right-4">
            <button
                onClick={() => setOpen((pv) => !pv)}
                className="flex sm:hidden items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
            >
                <motion.span variants={iconVariants}>
                    <EllipsisVertical />
                </motion.span>
            </button>

            <motion.ul
                initial={wrapperVariants.closed}
                variants={wrapperVariants}
                style={{ originY: "bottom", translateX: "-50%" }}
                className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute bottom-[120%] left-[-40%] w-fit overflow-hidden"
            >
                <Option setOpen={setOpen} Icon={User} text="Mon compte" href={routes.privateRoutes.MON_COMPTE} />
                <Option setOpen={setOpen} Icon={LogOut} text="Se déconnecter" href={routes.privateRoutes.LOGOUT} />
            </motion.ul>
        </motion.div>
    );
};

const Option = ({
    text,
    Icon,
    setOpen,
    href,
}: {
    text: string;
    Icon: LucideIcon;
    setOpen: Dispatch<SetStateAction<boolean>>;
    href: string;
}) => {
    return (
        <Link to={href} className="w-full h-full flex items-center gap-2">
            <motion.li
                variants={itemVariants}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
            >
                <motion.span variants={actionIconVariants}>
                    <Icon />
                </motion.span>
                <span>{text}</span>
            </motion.li>
        </Link>
    );
};

export default StaggeredDropDown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};