import { motion } from "framer-motion";

import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Loader from "../ui/loader";
import Sidebar from "./side-bar";
import StaggeredDropDown from "./staggered-drop-down";

interface ContentLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  divProps?: React.HTMLAttributes<HTMLDivElement>;
  children?: React.ReactNode;
}

export function ContentLayout({ loading, children, ...divProps }: ContentLayoutProps) {
  return (
    <div {...divProps}>
      <ScrollProgress />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          {loading ? (
            <Loader
              className="absolute top-1/2 left-1/2 w-full h-full z-50 flex items-center justify-center"
            />
          ) : (
            <main className="pt-8 pb-8 px-4 sm:px-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
              >
                {children}
              </motion.div>
            </main>
          )}
        </div>
      </div>
      <StaggeredDropDown />
    </div >
  );
}