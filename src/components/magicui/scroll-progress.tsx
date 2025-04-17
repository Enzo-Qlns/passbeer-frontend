import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";

type ScrollProgressProps = Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      setIsScrollable(document.documentElement.scrollHeight > window.innerHeight);
    };

    checkScrollable(); // Vérifie au premier rendu
    window.addEventListener("resize", checkScrollable);

    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-600",
        !isScrollable && "hidden",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";